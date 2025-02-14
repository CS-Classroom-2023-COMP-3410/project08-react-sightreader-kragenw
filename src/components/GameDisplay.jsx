function GameDisplay() {
    return (
      <div className="row-fluid main-display">
        <div className="row-fluid top-info">
          <div id="current-playlist-position" title="Playlist position." className="span4 left">
            -
          </div>
          <div id="qpm-display" title="QPM" className="span4 center">
            -
          </div>
          <div className="span4 right">
            <span id="current-score" title="Your current score.">-</span>
            <span id="score-stats" title="Score statistics."></span>
          </div>
        </div>
        <div className="span12" id="notation"></div>
        <span id="current-note" title="Expected and actual note detected on the microphone.">-</span>
        <span id="current-volume" title="Microphone volume.">-</span>
        <div id="midi" style={{ display: "none" }}></div>
        <span id="count-down"></span>
        <span id="loaded-filename">-</span>
      </div>
    );
  }
  
  export default GameDisplay;
  