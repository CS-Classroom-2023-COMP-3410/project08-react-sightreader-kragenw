import React, { useState, useEffect } from 'react';
import ABCJS from 'abcjs';

function FileLoader() {
    const [abcString, setAbcString] = useState('');
    const [qpm, setQpm] = useState(null);
    const [notation, setNotation] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const DEFAULT_TEMPO = 120;
    const DEFAULT_SCALE = 1;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let synth = new ABCJS.synth.CreateSynth();

    useEffect(() => {
        if (notation) {
            setIsPlaying(false);
            const tunebook = ABCJS.renderAbc('notation-display', abcString, {
                responsive: "resize",
                scale: DEFAULT_SCALE,
                add_classes: true
            });

            synth.init({
                audioContext: audioContext,
                visualObj: tunebook[0],
                millisecondsPerMeasure: millisecondsPerMeasure(qpm, tunebook[0]),
            }).then(() => {
                synth.prime().then(() => {
                    setIsPlaying(true);
                });
            });

            setStatusMessage('File loaded. Press start to play.');
        }
    }, [notation, abcString, qpm]);

    function preprocessAbcData(data) {
        let lines = data.split('\n');
        let headers = [];
        let notes = [];
        const ignoredHeaders = new Set(['T', 'C', 'Z', 'S', 'N', 'G', 'O', 'H', 'I', 'P', 'W', 'F', 'B']);
        
        for (let line of lines) {
            line = line.trim();
            if (!line || line.startsWith('%')) continue;
            if (line.length >= 2 && line[1] === ':' && /[A-Za-z]/.test(line[0])) {
                if (ignoredHeaders.has(line[0].toUpperCase())) continue;
                headers.push(line);
            } else {
                notes.push(line);
            }
        }
        
        return headers.join('\n') + '\n' + notes.join('\n');
    }

    function loadAbc(inputAbcString) {
        const qpmMatch = inputAbcString.match(/Q:\s*(\d+)/i);
        const newQpm = qpmMatch ? parseInt(qpmMatch[1]) : DEFAULT_TEMPO;
        setQpm(newQpm);
        const cleanedAbcString = inputAbcString.replace(/Q:\s*\d+\s*\n/i, '');
        setNotation(cleanedAbcString);
        setAbcString(inputAbcString);
    }

    function handleChange(event) {
        const { value } = event.target;
        setAbcString(value);
    }

    function handleLoadClick() {
        loadAbc(abcString);
    }

    function millisecondsPerMeasure(qpm, visualObj) {
        // Assuming 4/4 time signature for simplicity
        return (60000 / qpm) * 4;
    }

    return (
        <div>
            <textarea value={abcString} onChange={handleChange} id="abc-textarea" />
            <button onClick={handleLoadClick} disabled={isPlaying}>Load ABC</button>
            <div id="notation-display"></div>
            <p>{statusMessage}</p>
        </div>
    );
}

export default FileLoader;



// import React, { useState, useEffect } from 'react';


// function preprocess_abc_data(data) {
//     let lines = data.split('\n');
//     let headers = [];
//     let notes = [];
    
//     const ignoredHeaders = new Set(['T', 'C', 'Z', 'S', 'N', 'G', 'O', 'H', 'I', 'P', 'W', 'F', 'B']);
    
//     for (let line of lines) {
//         line = line.trim();
//         if (!line || line.startsWith('%')) {
//             // Ignore comments and empty lines
//             continue;
//         }
//         if (line.length >= 2 && line[1] === ':' && /[A-Za-z]/.test(line[0])) {
//             if (ignoredHeaders.has(line[0].toUpperCase())) {
//                 // Ignore metadata fields
//                 continue;
//             }
//             headers.push(line);
//         } else {
//             notes.push(line);
//         }
//     }
    
//     return headers.join('\n') + '\n' + notes.join('\n');
// }


// function load_abc(abc_string) {
//     var qpm = null;
//     var qpm_override = false;
//     var abc_string_raw = abc_string;
//     stop();
//     // Find final QPM.
//     if (tempo_select.value) {
//         // Use tempo override control.
//         qpm = parseInt(tempo_select.value);
//         qpm_override = true;
//     } else {
//         // Otherwise extract from ABC.
//         var qpm_matches = abc_string.match(/Q:\s*(\d+)/i);
//         if (qpm_matches) {
//             qpm = parseInt(qpm_matches[1]);
//             // Remove from ABC so it's not rendered with the sheet music.
//             abc_string = abc_string.replace(/Q:\s*(\d+\n)/i, '');
//         }
//     }
//     qpm = parseInt(qpm || DEFAULT_TEMPO);

//     loaded_abc_raw = abc_string_raw;
//     loaded_abc = abc_string;
//     current_qpm = qpm;
//     update_qpm_display();

//     tunebook = ABCJS.renderAbc(notation_display.id, abc_string, {
//         responsive: "resize",
//         scale: DEFAULT_SCALE,
//         add_classes: true
//     });

//     $('#notation').css('opacity', 0.5);

//     if (!synth) {
//         synth = new ABCJS.synth.CreateSynth();
//     }

//     start_button.disabled = true;
//     synth
//         .init({
//             audioContext: audioContext,
//             visualObj: tunebook[0],
//             millisecondsPerMeasure: milliseconds_per_measure(current_qpm, tunebook[0]),
//         })
//         .then(() => {
//             synth.prime().then(() => {
//                 start_button.disabled = false;
//             });
//         });
// }


// function load_abc_textarea() {
//     loaded_filename_display.textContent = '';
//     data = $('#abc-textarea').val();
//     original_loaded_abc = data;
//     load_abc(data);
//     $(file_select.id).removeAttr('disabled');

//     if(tunebook && tunebook[0].lines.length > 0) {
//         loaded_abc_filename = tunebook[0].metaText.title;
//         report_status('File loaded. Press start to play.');
//     } else {
//         report_status('Invalid ABC text. Please try again.');
//     }

//     update_start_button();
// }




