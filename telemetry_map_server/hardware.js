const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const startHardwareListener = (comPort, sendDataToClientCallback) => {
    // create serial port connection
    const serialPort = new SerialPort({
        path: comPort,
        baudRate: 115200
    });

    // create parser for serial port data to read by line
    const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

    // reset current line of serial data
    let currentLine = '';

    setInterval(() => {
        if (currentLine !== '') {
            console.log(currentLine);
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
    let splitData = data.split(',');
    const processedData = {
        time: splitData[0],
        y: Number(splitData[1]),
        x: Number(splitData[2]),
        z: Number(splitData[3]),
        pitch: Number(splitData[4]),
        roll: Number(splitData[5]),
        yaw: Number(splitData[6]),
    };
    return processedData;
};

module.exports = { startHardwareListener };