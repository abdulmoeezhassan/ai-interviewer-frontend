export const getYears = (start = 1980, end = new Date().getFullYear()) => {
  const years = [];
  for (let i = end; i >= start; i--) {
    years.push(i);
  }
  return years;
};

export const float32ToWavBlob = (
  audioBuffer: Float32Array,
  sampleRate: number = 16000
): Blob => {
  const bufferLength = audioBuffer.length;
  const wavBuffer = new ArrayBuffer(44 + bufferLength * 2);
  const view = new DataView(wavBuffer);

  const writeString = (view: DataView, offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + bufferLength * 2, true); // file length - 8
  writeString(view, 8, 'WAVE');

  // FMT sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size
  view.setUint16(20, 1, true);  // AudioFormat = PCM
  view.setUint16(22, 1, true);  // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * 2, true); // ByteRate = SampleRate * NumChannels * BitsPerSample/8
  view.setUint16(32, 2, true);  // BlockAlign = NumChannels * BitsPerSample/8
  view.setUint16(34, 16, true); // BitsPerSample

  writeString(view, 36, 'data');
  view.setUint32(40, bufferLength * 2, true); 

  for (let i = 0; i < bufferLength; i++) {
    const sample = Math.max(-1, Math.min(1, audioBuffer[i]));
    view.setInt16(44 + i * 2, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
  }

  return new Blob([wavBuffer], { type: 'audio/wav' });
};
