import React, { JSX } from 'react';
import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  StreamTheme,
  SpeakerLayout,
  useCallStateHooks,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
} from '@stream-io/video-react-sdk';
import { userContext as UserContext } from '../context/context';
import { Service } from '../services/service';
import { useParams } from 'react-router-dom';
import { interviewsService } from '../services/interviews.service';
import { useAutoRecording } from '../hooks/useAutoRecording';
import { float32ToWavBlob } from '../helpers/helper';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FiPhoneOff } from "react-icons/fi";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import '../index.css'
import { MyUILayoutProps } from '../constants/interface';

const apiKey = process.env.REACT_APP_STREAM_API_KEY || 'w555v4zjyayc';
const serverUrl = process.env.REACT_APP_API_URL;
const callId = uuidv4();

export default function App() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const useContext = React.useContext(UserContext);
  const [client, setClient] = React.useState<any>(null);
  const [emilyClient, setEmilyClient] = React.useState<any>(null);
  const [emilyCall, setEmilyCall] = React.useState<any>(null);
  const [call, setCall] = React.useState<any>(null);
  const { userData } = useContext ?? {};
  const callRef = React.useRef<any>(null);
  const emilyCallRef = React.useRef<any>(null);
  const initialized = React.useRef(false);

  async function askNextQuestion(emilyCall: any) {
    let userId = localStorage.getItem('userId') || userData?._id;
    let isFinished = false;
    let state;
    if (isFinished) {
      return;
    }

    if (!emilyCall) {
      console.warn("Emily call not ready");
      return;
    }

    if(type === 'english'){
     state = await interviewsService.GetEnglishInterviewQuestion(userId, 'english');
    }

    else if(type === 'coding'){
     state = await interviewsService.GetCodingInterviewQuestion(userId, 'coding');
    }

    else if(type === 'prompt') {
      state = await interviewsService.GetPromptInterviewQuestion(userId, 'prompt');
    }
    

    if (state?.is_finished === true) {
      const lastQuestionUrl = `${serverUrl}/${state?.last_question}`;
      console.log("🎙 Emily asking final question:", lastQuestionUrl);
      await playAudioInCall(emilyCall, lastQuestionUrl);

      await emilyCall.current?.leave();
      emilyCall.current = null;
      isFinished = true;

      console.log("✅ Interview finished. Waiting for user to end call.");
      return;
    }

    const lastQuestion = state.conversation[state.conversation.length - 1].question;
    const lastQuestionUrl = `${serverUrl}/${lastQuestion}`;
    console.log("🎙 Emily asking:", lastQuestionUrl);
    await playAudioInCall(emilyCall, lastQuestionUrl);

    console.log("🎤 Now listening for user answer...");
    startRecording();
  }

  const { startRecording } = useAutoRecording((audio) => {
    console.log("🔊 Final audio from user:", audio);
    const wavBlob = float32ToWavBlob(audio);
    // const audioUrl = URL.createObjectURL(wavBlob);
    // const audioPlayer = new Audio(audioUrl);
    // audioPlayer.play();

    (async () => {
      let exammineAnswer;
      if (type === 'english') {
       exammineAnswer = await interviewsService.SaveEnglishInterviewAnswer(wavBlob);
      }
      
      else if (type === 'coding') {
       exammineAnswer = await interviewsService.SaveCodingInterviewAnswer(wavBlob);
      }

      else if (type === 'prompt') {
        exammineAnswer = await interviewsService.SavePromptInterviewAnswer(wavBlob);
      }

      if (exammineAnswer.status === 200) {
        await askNextQuestion(emilyCallRef)
      }
    })();
  });

  async function playAudioInCall(call: any, audioUrl: string) {
    const audio = new Audio(audioUrl);
    audio.crossOrigin = 'anonymous';
    await audio.play();

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audio);
    const destination = audioContext.createMediaStreamDestination();
    source.connect(destination);
    source.connect(audioContext.destination);

    await call.microphone?.enable();
    // await call.microphone.setInputStream(destination.stream);
  }

  React.useEffect(() => {
    if (!userData || initialized.current) return;

    let isMounted = true;
    initialized.current = true;

    const init = async () => {
      try {
        const userId = userData._id;

        const user = {
          id: userId,
          name: `${userData.firstName} ${userData.lastName}`,
          image: userData.image || `https://getstream.io/random_svg/?id=${userId}&name=${userData.firstName}`,
        };

        const userToken = (await Service.CreateToken(userId)).stream_token;
        const userClient = new StreamVideoClient({ apiKey, user, token: userToken });
        await userClient.connectUser(user, userToken);

        const userCall = userClient.call("default", callId);
        await userCall.join({ create: true });

        callRef.current = userCall;
        setClient(userClient);
        setCall(userCall);

        const emilyUser = {
          id: "Emily_AI",
          name: "Emily - AI Interviewer",
          image: "https://getstream.io/random_svg/?id=emily&name=Emily",
        };

        const emilyToken = (await Service.CreateToken("Emily_AI")).stream_token;
        const emilyClient = new StreamVideoClient({ apiKey, user: emilyUser, token: emilyToken });
        await emilyClient.connectUser(emilyUser, emilyToken);

        const emilyCall = emilyClient.call("default", callId);
        await emilyCall.camera.disable();
        await emilyCall.join({ create: false });

        setEmilyClient(emilyClient);
        setEmilyCall(emilyCall);
        emilyCallRef.current = emilyCall;

        askNextQuestion(emilyCall);
      } catch (err) {
        console.error("Error initializing call:", err);
      }
    };

    init();

    return () => {
      isMounted = false;
      (async () => {
        try {
          await emilyCallRef.current?.leave();
          await callRef.current?.leave();
          await callRef.current?.end();
          await client?.disconnectUser();
          await emilyClient?.disconnectUser();
          await emilyCall.leave();
          await call.leave();
        } catch (err) {
          console.warn("Cleanup error:", err);
        }
      })();
    };
  }, [userData]);

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout emilyCall={emilyCallRef.current} callRef={callRef.current} />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout: React.FC<MyUILayoutProps> = ({ emilyCall, callRef }) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  const handleLeave = async () => {
    try {
      if (callRef) {
        await callRef.leave();
        await callRef.disconnectUser();
      }

      navigate("/assessments");
    } catch (err) {
      console.error("Error leaving call:", err);
      navigate("/assessments");
    }
  };
  if (callingState !== CallingState.JOINED) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="flex flex-col items-center space-y-4 animate-pulse">
          <svg
            className="w-16 h-16 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <h2 className="text-2xl font-semibold">Preparing your interview room...</h2>
          <p className="text-sm text-white/80">Please wait while we connect you.</p>
        </div>
      </div>
    );
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition='bottom' />
      <div className='flex flex-row items-center justify-center py-4 gap-2'>
        <ToggleAudioPublishingButton />
        <ToggleVideoPublishingButton />
        <button
          onClick={handleLeave}
          className="bg-red-600 text-white px-4 py-1 rounded-full"
        >
          <span>{FiPhoneOff({ size: 15 }) as JSX.Element}</span>
        </button>
      </div>
    </StreamTheme>
  );
};