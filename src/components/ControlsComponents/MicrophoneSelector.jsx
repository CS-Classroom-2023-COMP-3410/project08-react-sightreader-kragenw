import React, { useState, useEffect } from "react";

function MicrophoneSelector() {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState("");

    // Fetch audio input devices
    useEffect(() => {
        const fetchDevices = async () => {
            try {
                // Ask for permission to access the microphone
                await navigator.mediaDevices.getUserMedia({ audio: true });
                // Get the list of devices after permission has been granted
                const devices = await navigator.mediaDevices.enumerateDevices();
                const audioInputs = devices.filter(device => device.kind === 'audioinput');
                setDevices(audioInputs);
                if (audioInputs.length > 0) {
                    setSelectedDevice(audioInputs[0].deviceId);
                }
            } catch (error) {
                console.error("Error accessing the microphone:", error);
            }
        };

        fetchDevices();
    }, []);

    // Handle selecting a new device
    const handleDeviceChange = (event) => {
        setSelectedDevice(event.target.value);
    };

    return (
        <>
            <label htmlFor="devices">Microphone:</label>
            <select id="devices" value={selectedDevice} onChange={handleDeviceChange}>
                {devices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `Microphone ${device.deviceId}`}
                    </option>
                ))}
            </select>
        </>
    );
}

export default MicrophoneSelector;
