import React from "react";

function TempoSelector() {
  return (
    <>
      <label htmlFor="tempo">Tempo:</label>
      <select id="tempo">
        <option value="">inherit</option>
        {[30, 60, 90, 120, 180, 240, 5000].map((tempo) => (
          <option key={tempo} value={tempo}>
            {tempo}
          </option>
        ))}
      </select>
    </>
  );
}

export default TempoSelector;
