function Settings() {
    return (
      <div className="row-fluid controls">
        <div className="span12 keyboard-legend">
          <span className="cb-field">
            <input id="auto-continue" type="checkbox" />
            <label htmlFor="auto-continue" title="Once score is above average, immediately move on to next playlist item.">
              Auto-Continue
            </label>
          </span>
          <span className="cb-field">
            <input id="ignore-duration" type="checkbox" />
            <label htmlFor="ignore-duration" title="If checked, will score a note if it's met and will not check duration.">
              Ignore Duration
            </label>
          </span>
        </div>
      </div>
    );
  }
  
  export default Settings;
  