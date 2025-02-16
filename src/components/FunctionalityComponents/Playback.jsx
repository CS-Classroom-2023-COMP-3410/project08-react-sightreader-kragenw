import React, { useState, useEffect } from 'react';
import ABCJS from 'abcjs';

function PlayBack() {
    const [recording, setRecording] = useState(false);
    const [countdown, setCountdown] = useState(-1);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [currentMidiNumber, setCurrentMidiNumber] = useState(0);
    const [expectedMidiNumber, setExpectedMidiNumber] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');
    const [tunebook, setTunebook] = useState(null);
    const [currentQpm, setCurrentQpm] = useState(120); // Example default
    const synth = new ABCJS.synth.CreateSynth();
    const DEFAULT_SCALE = 1;

    const stop = (verbose = true) => {
        if (countdown >= 0) {
            setCountdown(-1);
            setRecording(true);
        }
        if (!recording) return;
        setRecording(false);
        synth.stop();
        ABCJS.midi.stopPlaying();
        if (verbose) setStatusMessage('Stopped.');
        if (currentEvent) {
            // Reset color or any other styling for notes
        }
    };

    const reset = () => {
        stop();
        setCountdown(-1); // Reset countdown
        setStatusMessage(''); // Clear status message
        setCurrentMidiNumber(0); // Reset MIDI number
        setExpectedMidiNumber(0); // Reset expected MIDI number
        ABCJS.midi.restartPlaying();
        // Reset other UI elements if needed
    };

    const beginCountdown = () => {
        setRecording(true);
        setCountdown(tunebook[0].getBeatsPerMeasure() + 1);
    };

    const eventCallback = (event) => {
        if (currentEvent) {
            // Reset color or styling for the previous note
        }
        if (event) {
            setCurrentEvent(event);
            if (event.midiPitches && event.midiPitches.length) {
                const midiPitch = event.midiPitches[0];
                setExpectedMidiNumber(midiPitch.pitch);
            } else {
                setExpectedMidiNumber(0);
            }
            // Add color or styling for the current note
        } else {
            // Reached the end
            reset();
        }
    };

    // Example of how you might handle SVG animation or other effects
    const millisecondsPerMeasure = (qpm, visualObj) => {
        // Calculate duration based on QPM and visual object's properties
        return (60000 / qpm) * 4; // Assuming 4/4 time signature
    };

    return (
        <div>
            <h1>Playback Controls</h1>
            <button onClick={() => stop()}>Stop</button>
            <button onClick={reset}>Reset</button>
            <button onClick={beginCountdown}>Start Countdown</button>
            <div id="notation-display"></div>
            <p>{statusMessage}</p>
        </div>
    );
}

export default PlayBack;




// import React, { useState, useEffect } from 'react';

// function PlayBack() {

// function stop(verbose) {
//     if (verbose == null) {
//         verbose = true;
//     }
//     if (countdown >= 0) {
//         countdown = -1;
//         recording = true;
//     }
//     if (!recording) {
//         return;
//     }
//     $('#notation').css('opacity', 0.5);
//     stop_mic();
//     expected_midi_number = 0;
//     current_midi_number = 0;
//     stop_note_checker();
//     mark_start_button_as_stopped();
//     ABCJS.midi.stopPlaying();
//     if (timer) {
//         timer.stop();
//     }
//     if (synth) {
//         synth.stop();
//     }
//     if (verbose) {
//         report_status('Stopped.');
//     }
//     if (current_event) {
//         color_note(current_event, NOTE_COLOR_DEFAULT);
//     }
// }
// window.stop = stop;

// function reset() {
//     notes_checked_count = 0;
//     scroll_offset = 0;
//     update_scroll();
//     stop();
//     ABCJS.midi.restartPlaying();
//     if (timer) {
//         timer.reset();
//     }
//     $('#notation svg').css('marginLeft', '0px');
//     update_playlist();
// }
// window.reset = reset;


// function begin_countdown() {
//     mark_start_button_as_started();
//     recording = true;
//     countdown = tunebook[0].getBeatsPerMeasure() + 1;
//     refresh_countdown();
// }


// function event_callback(event) {
//     if (current_event) {
//         color_note(current_event, NOTE_COLOR_DEFAULT);
//     }
//     if (event) {
//         new_note_checked = false;
//         new_note_checked_and_found = false;
//         color_note(event, NOTE_COLOR_PLAYING);
//         current_event = event;

//         // Sometimes the pitch array is empty if there's a rest.
//         var midiPitch = event.midiPitches && event.midiPitches[0];
//         if (!midiPitch) {
//             expected_midi_number = 0;
//             update_current_note_display();
//             return;
//         }

//         expected_midi_number = midiPitch.pitch;
//         update_current_note_display();

//         var duration_ms = event.midiPitches[0].durationInMeasures * milliseconds_per_measure(current_qpm, tunebook[0]);
//         // var offset = -current_event.left * DEFAULT_SCALE + 50;
//         // $('#notation svg').animate({marginLeft: offset + 'px'}, 0); //duration_ms/2);
//     } else {
//         // Reached the end.
//         stop_note_checker();
//         var score = get_score_percent();
//         report_status('Scored ' + score + '.');
//         record_score(score);
//         stop(false);
//         setTimeout(reset, 100);
//         // If auto-continue is enabled and our last score was greater or equall to the average, then immediately start playing next.
//         if (is_auto_continue()) {
//             if (current_score_stats.mean_score && get_score_percent() >= current_score_stats.mean_score) {
//                 console.log('Auto-incrementing playlist.');
//                 increment_playlist();
//             }
//             if (!at_playlist_end() || (current_score_stats.mean_score && get_score_percent() < current_score_stats.mean_score)) {
//                 setTimeout(auto_start, 3000);
//             }
//         }
//     }
// }

