import { useRef } from 'react';
import * as vad from '@ricky0123/vad-web';

export function useAutoRecording(onRecordingComplete: (audio: Float32Array) => void) {
  const vadRef = useRef<vad.MicVAD | null>(null);

  const init = async () => {
    if (!vadRef.current) {
      vadRef.current = await vad.MicVAD.new({
        onSpeechStart: () => {
          console.log("🎤 User started speaking...");
        },
        onSpeechEnd: (audio: Float32Array) => {
          console.log("🛑 User stopped speaking.");
          onRecordingComplete(audio);
        },
      });
    }
  };

  const startRecording = async () => {
    if (!vadRef.current) {
      console.warn("Initializing VAD...");
      await init();
    }
    try {
      await vadRef.current?.start();
      console.log("🎙️ VAD is active. Waiting for user to speak...");
    } catch (err) {
      console.error("Failed to start VAD:", err);
    }
  };

  const stopRecording = async () => {
    try {
      await vadRef.current?.pause();
      console.log("⏸️ Recording paused.");
    } catch (err) {
      console.error("Failed to pause VAD:", err);
    }
  };

  return { startRecording, stopRecording };
}
