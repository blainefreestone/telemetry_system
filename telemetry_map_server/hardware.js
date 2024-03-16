const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

// create serial port connection
const serialPort = new SerialPort({
    path: 'COM5',
    baudRate: 9600
});

// create parser for serial port data to read by line
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

const startHardwareListener = (sendDataToClientCallback) => {
    // listen for lines of data from serial port
    parser.on('data', (line) => {
        // process line of serial data
        const processedData = processHardwareData(line);
        // send data to client
        sendDataToClientCallback(processedData);
    });
} 

const processHardwareData = (data) => {
    // process data from hardware
    return [roll, pitch, yaw] = data.split(',').map(Number);
};

// create dummy arc data for testing
const createArc = (start, end, maxHeight, numPoints) => {
    const points = [];
    for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const x = (start.x + t * (end.x - start.x)).toFixed(5).padStart(9, '0');
        const y = (start.y + t * (end.y - start.y)).toFixed(5).padStart(9, '0');
        const z = Math.round(maxHeight * (1 - (2*t - 1)**2));
        points.push({ x, y, z });
    }
    return points;
};

module.exports = { startHardwareListener };