import React, { useState, useEffect, useRef } from "react";

function ControlButtons() {
  const [isRecording, setIsRecording] = useState(false);
  const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());

  // Function to start the microphone and associated processes
  const startMic = () => {
    console.log('Starting mic...');
    setIsRecording(true);
    audioContextRef.current.resume().then(() => {
        console.log('Playback resumed successfully');
    });
    startVolumeMeter();
    startPitchDetector();
  };

  // Function to stop the microphone and associated processes
  const stopMic = () => {
    console.log('Stopping mic...');
    setIsRecording(false);
    stopPitchDetector();
  };

  // Placeholder functions for starting volume meter and pitch detector
  const startVolumeMeter = () => {
    console.log('Starting volume meter...');
    // Implement volume meter functionality here
  };

  const startPitchDetector = () => {
    console.log('Starting pitch detector...');
    // Implement pitch detection functionality here
  };

  const stopPitchDetector = () => {
    console.log('Stopping pitch detector...');
    // Clean up pitch detection functionality here
  };

  return (
    <>
      <button id="start" disabled={!isRecording} onClick={startMic} title="Enable mic and begin playing along to sheet music.">
        Start
      </button>
      <button id="reset" onClick={stopMic}>Reset</button>
      <button id="tune" onClick={startMic} title="Enable mic and show pitch but don't play a game.">
        Tune
      </button>
    </>
  );
}

export default ControlButtons;
