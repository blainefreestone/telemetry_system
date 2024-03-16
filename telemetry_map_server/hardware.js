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
    // reset current line of serial data
    let currentLine = '';

    setInterval(() => {
        if (currentLine !== '') {
            // process current line of serial data
            const processedData = processHardwareData(currentLine);
            // send data to client
            sendDataToClientCallback(processedData);
            // reset current line
            currentLine = '';
        }
    }, 100)

    // listen for lines of data from serial port
    parser.on('data', (line) => {
        currentLine = line;
    });
} 

const processHardwareData = (data) => {
    // process data from hardware
    splitData = data.split(',').map(Number);
    const processedData = {
        roll: splitData[0],
        pitch: splitData[1],
        yaw: splitData[2],
        x: splitData[3],
        y: splitData[4],
        z: splitData[5]
    };
    return processedData;
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