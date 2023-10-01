// popup.tsx

import React, { useState, useRef } from "react";
import './popup.css';
import RecordRTC from 'recordrtc';

const Popup = () => {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const mediaStream = useRef(null);
  const recorder = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      mediaStream.current = stream;
      recorder.current = new RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/webm',
      });

      recorder.current.startRecording();
      setRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    recorder.current.stopRecording(() => {
      mediaStream.current.getTracks().forEach((track) => track.stop());
      const blob = recorder.current.getBlob();
      setVideoURL(URL.createObjectURL(blob));
      setRecording(false);
    });
  };

  const downloadVideo = () => {
    const a = document.createElement('a');
    a.href = videoURL;
    a.download = 'screen-recording.webm';
    a.click();
  };

  return (
    <div>
      <h1 className="text-4xl text-green-500">Screen Recorder</h1>
      
      {recording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}

      {videoURL && (
        <button onClick={downloadVideo}>Download Video</button>
      )}

      <div>
        {videoURL && (
          <video
            controls
            src={videoURL}
            style={{ width: '100%', maxHeight: '400px' }}
          />
        )}
      </div>
    </div>
  );
};

export default Popup;
