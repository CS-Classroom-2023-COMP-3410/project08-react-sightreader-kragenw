import React, { useState } from 'react';

function UIComponent() {
    const [currentQpm, setCurrentQpm] = useState(null);
    const [currentMidiNumber, setCurrentMidiNumber] = useState(0);
    const [expectedMidiNumber, setExpectedMidiNumber] = useState(0);
    const [startButtonLabel, setStartButtonLabel] = useState('Start');
    const [statusMessage, setStatusMessage] = useState('');
    const [scrollOffset, setScrollOffset] = useState(0);

    const isStartable = () => {
        // Define the logic that determines if the start button should be enabled
        return true; // Example logic
    };

    const updateQpmDisplay = () => {
        return currentQpm ? currentQpm : '-';
    };

    const updateStartButton = () => {
        return isStartable() ? false : true;
    };

    const colorNote = (event, color) => {
        if (event == null || !event.elements) {
            return;
        }
        // This function would ideally update a state that re-renders parts of your component where notes are displayed
    };

    const midiNumberToString = (number) => {
        // Convert MIDI number to a string representation, implement as needed
        return number.toString();
    };

    const updateCurrentNoteDisplay = () => {
        let className = '';
        if (expectedMidiNumber) {
            if (expectedMidiNumber === currentMidiNumber) {
                className = 'good';
            } else {
                className = 'bad';
            }
        }
        return {
            text: `${midiNumberToString(expectedMidiNumber)}/${midiNumberToString(currentMidiNumber)}`,
            className
        };
    };

    const handleScrollLeft = () => {
        setScrollOffset(prevOffset => Math.max(prevOffset - 100, 0));
    };

    const handleScrollRight = () => {
        setScrollOffset(prevOffset => prevOffset + 100);
    };

    // Assuming notation_display is a ref to a container where SVG is rendered
    const notationStyle = {
        transform: `translateX(-${scrollOffset}px)`
    };

    return (
        <div>
            <div id="status">{statusMessage}</div>
            <div id="qpm-display">{updateQpmDisplay()}</div>
            <button disabled={updateStartButton()} onClick={() => setStartButtonLabel(startButtonLabel === 'Start' ? 'Stop' : 'Start')}>
                {startButtonLabel}
            </button>
            <div id="current-note-display" className={updateCurrentNoteDisplay().className}>
                {updateCurrentNoteDisplay().text}
            </div>
            <div id="notation-display" style={notationStyle}>
                {/* Render SVG or notation content here */}
            </div>
            <button onClick={handleScrollLeft}>Scroll Left</button>
            <button onClick={handleScrollRight}>Scroll Right</button>
        </div>
    );
}

export default UIComponent;




// import React, { useState, useEffect } from 'react';


// function UI {

// function update_qpm_display() {
//     qpm_display.textContent = '-';
//     if (current_qpm) {
//         qpm_display.textContent = current_qpm;
//     }
// }


// function update_start_button() {
//     if (is_startable()) {
//         start_button.disabled = false;
//         return;
//     }
//     start_button.disabled = true;
// }


// function color_note(event, color) {
//     if (event == null || !event.elements) {
//         return;
//     }
//     for (let e of event.elements) {
//         for (let s of e) {
//             s.setAttribute('fill', color);
//         }
//     }
// }


// function mark_start_button_as_started() {
//     start_button.textContent = 'Stop';
// }

// function mark_start_button_as_stopped() {
//     start_button.textContent = 'Start';
// }

// function update_current_note_display() {
//     console.log('Expected: ' + expected_midi_number + ', Current: ' + current_midi_number);
//     var el = $('#' + current_note_display.id);
//     reset_current_note_display_style();
//     if (expected_midi_number) {
//         if (expected_midi_number == current_midi_number) {
//             el.addClass('good');
//         } else {
//             el.addClass('bad');
//         }
//     }
//     current_note_display.textContent = midi_number_to_string(expected_midi_number) + '/' + midi_number_to_string(current_midi_number);
// }
// window.update_current_note_display = update_current_note_display;


// function report_status(message) {
//     $('#status').html(message);
// }



// function scroll_left() {
//     scroll_offset -= 100;
//     scroll_offset = Math.max(scroll_offset, 0);
//     update_scroll();
// }

// function scroll_right() {
//     scroll_offset += 100;
//     update_scroll();
// }

// function update_scroll() {
//     $('#' + notation_display.id + ' svg').css('transform-origin-x', scroll_offset);
// }