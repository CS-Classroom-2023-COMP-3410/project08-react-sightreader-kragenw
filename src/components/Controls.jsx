import React from "react";
import MicrophoneSelector from "./ControlsComponents/MicrophoneSelector";
import FileSelector from "./ControlsComponents/FileSelector";
import TempoSelector from "./ControlsComponents/TempoSelector";
import ControlButtons from "./ControlsComponents/ControlButtons";

function Controls() {
  return (
    <div className="row-fluid controls">
      <div className="span12">
        <MicrophoneSelector />
        <FileSelector />
        <TempoSelector />
        <ControlButtons />
      </div>
    </div>
  );
}

export default Controls;
