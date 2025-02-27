import React from "react";

function FileSelector() {
  return (
    <>
      <label htmlFor="file">File:</label>
      <select id="file">
        {/* <option value="">---Custom ABC---</option> */}
        {[
          // "beginner.pls",
          "cecilio-lesson1-open-strings.abc",
          "cecilio-lesson2-first-position.abc",
          "cecilio-lesson2-twinkle-twinkle-little-star.abc",
          "cecilio-lesson3-exercise-1.abc",
          "cecilio-lesson3-exercise-2.abc",
          "cecilio-lesson3-exercise-3.abc",
          "cecilio-lesson3-exercise-4.abc",
          "cecilio-lesson3-jingle-bells.abc",
          "cecilio-lesson3-mary-had-a-little-lamb.abc",
          "cecilio-lesson4-camptown-races.abc",
          "cecilio-lesson4-lightly-row.abc",
          "cecilio-lesson4-russian-dance-tune.abc",
          "cecilio-lesson5-eighth-notes.abc",
          "cecilio-lesson5-hungarian-folk-song-1.abc",
          "cecilio-lesson5-the-old-gray-goose.abc",
          "cecilio-lesson6-first-position-d-string.abc",
          "cecilio-lesson6-ode-to-joy.abc",
          "cecilio-lesson6-scherzando.abc",
          "cecilio-lesson7-can-can.abc",
          "cecilio-lesson7-country-gardens.abc",
          "cecilio-lesson7-gavotte.abc",
          "cecilio-lesson8-dixie.abc",
          "cecilio-lesson8-largo.abc",
          "hot-cross-buns.abc",
          "lesson1-open-string-exercise-1.abc",
          "lesson1-open-string-exercise-2.abc",
          "lesson1-open-string-exercise-3.abc",
          "lesson1-open-string-exercise-4.abc",
          "lesson1-open-string-exercise-5.abc",
          "lesson1-open-string-exercise-6.abc",
          "lesson2-1st-finger-exercise-1.abc",
          "lesson2-1st-finger-exercise-2.abc",
          "lesson2-1st-finger-exercise-3.abc",
          "lesson2-1st-finger-exercise-4.abc",
          "lesson2-1st-finger-exercise-5.abc",
          "lesson2-1st-finger-exercise-6.abc"
        ].map((file) => (
          <option key={file} value={file}>
            {file}
          </option>
        ))}
      </select>
    </>
  );
}

export default FileSelector;
