const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const startHardwareListener = (comPort, sendDataToClientCallback) => {
    // create serial port connection
    const serialPort = new SerialPort({
        path: comPort,
        baudRate: 9600
    });

    // create parser for serial port data to read by line
    const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

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
    let splitData = data.split(',').map(Number);
    if (splitData[5] === 0) splitData[5] = 1520;
    const processedData = {
        time: splitData[0] / 1000,
        y: splitData[1],
        x: splitData[2],
        z: splitData[3]
    };
    return processedData;
};

module.exports = { startHardwareListener };