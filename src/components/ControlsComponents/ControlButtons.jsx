import React from "react";

function ControlButtons() {
  return (
    <>
      <button id="start" disabled title="Enable mic and begin playing along to sheet music.">
        Start
      </button>
      <button id="reset">Reset</button>
      <button id="tune" title="Enable mic and show pitch but don't play a game.">
        Tune
      </button>
    </>
  );
}

export default ControlButtons;
