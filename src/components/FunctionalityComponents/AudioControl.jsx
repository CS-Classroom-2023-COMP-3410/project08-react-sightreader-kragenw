import React, { useState, useEffect } from 'react';
import Pitchfinder from 'pitchfinder';

function PitchDetector() {
    const [audioContext] = useState(() => new (window.AudioContext || window.webkitAudioContext)());
    const [sourceStream, setSourceStream] = useState(null);
    const [volumeMeter, setVolumeMeter] = useState(null);
    const [detectPitch, setDetectPitch] = useState(null);
    const [pitchGetterId, setPitchGetterId] = useState(null);
    const [currentMidiNumber, setCurrentMidiNumber] = useState(0);
    const MIN_VOLUME = 0.01; // Set an appropriate minimum volume threshold

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                setSourceStream(audioContext.createMediaStreamSource(stream));
            })
            .catch(err => console.error('Error accessing microphone', err));
        
        return () => {
            sourceStream && sourceStream.disconnect();
        };
    }, [audioContext]);

    useEffect(() => {
        if (sourceStream) {
            startVolumeMeter();
            startPitchDetector();
        }

        return () => {
            stopMic();
        };
    }, [sourceStream]); // Re-run when sourceStream changes

    const startPitchDetector = () => {
        audioContext.resume();
        const pitchFinder = Pitchfinder.YIN({ sampleRate: audioContext.sampleRate });
        setDetectPitch(pitchFinder);
        const analyser = audioContext.createAnalyser();
        sourceStream.connect(analyser);
        const arrayUInt = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteTimeDomainData(arrayUInt);

        const getPitch = () => {
            let volume = volumeMeter ? volumeMeter.volume : 0;
            if (volume > MIN_VOLUME) {
                const array32 = new Float32Array(analyser.fftSize);
                analyser.getFloatTimeDomainData(array32);
                const freq = detectPitch(array32);
                const midiNumber = isNaN(parseInt(noteFromPitch(freq))) ? 0 : parseInt(noteFromPitch(freq));
                setCurrentMidiNumber(midiNumber);
            }
        };
        const intervalId = setInterval(getPitch, 10);
        setPitchGetterId(intervalId);
    };

    const startVolumeMeter = () => {
        const meter = createAudioMeter(audioContext);
        setVolumeMeter(meter);
        sourceStream.connect(meter);
    };

    const stopMic = () => {
        setCurrentMidiNumber(0);
        clearInterval(pitchGetterId);
        audioContext.close();
    };

    const noteFromPitch = (frequency) => {
        var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
        return Math.round(noteNum) + 69;
    };

    return (
        <div>
            <h1>Current MIDI Note: {currentMidiNumber}</h1>
            <button onClick={stopMic}>Stop Microphone</button>
        </div>
    );
}

export default PitchDetector;


// function start_pitch_detector() {
//     audioContext.resume();
//     detectPitch = new Pitchfinder.YIN({sampleRate : audioContext.sampleRate});
//     var sourceNode = audioContext.createMediaStreamSource(source_stream);
//     var analyser = audioContext.createAnalyser();
//     sourceNode.connect(analyser);
//     const arrayUInt = new Uint8Array(analyser.frequencyBinCount);
//     analyser.getByteTimeDomainData(arrayUInt);

//     function get_pitch() {
//         var volume = volume_meter.volume;
//         current_midi_number = 0;
//         if (volume > MIN_VOLUME) {
//             const array32 = new Float32Array(analyser.fftSize);
//             analyser.getFloatTimeDomainData(array32);
//             var freq = detectPitch(array32);
//             // console.log('freq:'+freq)
//             current_midi_number = parseInt(noteFromPitch(freq));
//             if (isNaN(current_midi_number)) {
//                 current_midi_number = 0;
//             }
//         }
//         update_current_note_display();
//         update_current_volume_display();
//     }
//     pitch_getter_id = setInterval(get_pitch, 10);
// }

// function start_volume_meter() {
//     if (!volume_meter) {
//         volume_meter = createAudioMeter(audioContext);
//         var mediaStreamSource = audioContext.createMediaStreamSource(source_stream);
//         mediaStreamSource.connect(volume_meter);
//     }
// }


// function start_mic() {
//     console.log('Starting mic...');
//     recording = true;
//     audioContext.resume().then(() => {
//         console.log('Playback resumed successfully');
//     });
//     start_volume_meter();
//     start_pitch_detector();
// }

// function stop_mic() {
//     current_midi_number = 0;
//     recording = false;
//     stop_pitch_detector();
// }

// function noteFromPitch(frequency) {
//     var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
//     return Math.round(noteNum) + 69;
// }

