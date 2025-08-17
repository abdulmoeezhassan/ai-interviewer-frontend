import axios from "axios";

const apiURl = process.env.REACT_APP_API_URL;

const StartEnglishInterview = async () => {
  try {
    const startInterview = await axios.post(
      `${apiURl}/interview/start-english-interview`,
    );
    return startInterview.data;

  } catch (error) {
    console.error("Error during starting english interview:", error);
  }
}

const StartCodingInterview = async () => {
  try {
    const startInterview = await axios.post(
      `${apiURl}/interview/start-coding-interview`,
    );
    return startInterview.data;

  } catch (error) {
    console.error("Error during starting coding interview:", error);
  }
}

const StartPromptInterview = async () => {
  try {
    const startInterview = await axios.post(
      `${apiURl}/interview/start-prompt-engineering-interview`,
    );
    return startInterview.data;

  } catch (error) {
    console.error("Error during starting prompt interview:", error);
  }
}

const GetEnglishInterviewQuestion = async (userId: any, type: string) => {
  try {
    const getEnglishInterviewQuestion = await axios.get(
      `${apiURl}/interview/get-english-question`,
      { params: { userId, type } }
    );
    return getEnglishInterviewQuestion.data;

  } catch (error) {
    console.error("Error during fetching english interview question:", error);
  }
}

const SaveEnglishInterviewAnswer = async (audio: any) => {
  try {
    const formData = new FormData();
    formData.append('audio', audio, 'audio.wav')
    const saveEnglishInterviewAnswer = await axios.put(
      `${apiURl}/interview/evaluate-english-answer`,
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return saveEnglishInterviewAnswer.data;

  } catch (error) {
    console.error("Error during sending answer:", error);
  }
}

const GetCodingInterviewQuestion = async (userId: any, type: string) => {
  try {
    const getEnglishInterviewQuestion = await axios.get(
      `${apiURl}/interview/get-coding-question`,
       { params: { userId, type } }
    );
    return getEnglishInterviewQuestion.data;

  } catch (error) {
    console.error("Error during fetching english interview question:", error);
  }
}

const SaveCodingInterviewAnswer = async (audio: any) => {
  try {
    const formData = new FormData();
    formData.append('audio', audio, 'audio.wav')
    const saveCodingInterviewAnswer = await axios.put(
      `${apiURl}/interview/evaluate-coding-answer`,
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return saveCodingInterviewAnswer.data;

  } catch (error) {
    console.error("Error during sending answer:", error);
  }
}

const GetPromptInterviewQuestion = async (userId: any, type: string) => {
  try {
    const getEnglishInterviewQuestion = await axios.get(
      `${apiURl}/interview/get-prompt-question`,
       { params: { userId, type } }
    );
    return getEnglishInterviewQuestion.data;

  } catch (error) {
    console.error("Error during fetching english interview question:", error);
  }
}

const SavePromptInterviewAnswer = async (audio: any) => {
  try {
    const formData = new FormData();
    formData.append('audio', audio, 'audio.wav')
    const saveEnglishInterviewAnswer = await axios.put(
      `${apiURl}/interview/evaluate-prompt-answer`,
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return saveEnglishInterviewAnswer.data;

  } catch (error) {
    console.error("Error during sending answer:", error);
  }
}

export const interviewsService = {
  StartEnglishInterview,
  StartCodingInterview,
  StartPromptInterview,
  GetEnglishInterviewQuestion,
  SaveEnglishInterviewAnswer,
  GetCodingInterviewQuestion,
  SaveCodingInterviewAnswer,
  GetPromptInterviewQuestion,
  SavePromptInterviewAnswer
}