const SerialPort = require('serialport').SerialPort;

SerialPort.list().then(ports => {
    ports.forEach(port => {
        console.log(port.path);
    });
});