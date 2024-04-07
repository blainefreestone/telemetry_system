const http = require('http');
const socketIo = require('socket.io');
const { startHardwareListener } =  require('./hardware.js');
const { start } = require('repl');
const { saveDataToFile, sendFileDataToClient } = require('./dataHandler.js');
const { clear } = require('console');

// Create a new HTTP server
const server = http.createServer();
// Create a new socket.io server
const io = socketIo(server, {
    // provide proper CORS settings to avoid cross origin request errors
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// no connection socket yet
let connectionSocket = null;

// get serial port from command line arguments
let comPort;
if (process.argv.length > 2) {
    console.log('COM port used: ' + process.argv[2]);
    comPort = process.argv[2];
} else {
    console.log('Default COM port used: COM10');
    comPort = 'COM10';
}

// set up event listener for new connections
io.on('connection', (socket) => {
    // log new connection
    console.log('New connection');
    connectionSocket = socket;

    // set up event listener for trigger
    socket.on('trigger', () => {
        // log trigger received
        console.log('Trigger received');
        // start hardware listener
        startHardwareListener(comPort, sendPointDataToClient);
    });

    socket.on('fileData', (fileData) => {
        // log file data received
        console.log('File data received');
        // save the file data to a file in JSON format
        saveDataToFile(fileData, 'currentData.json');
        // send file received message to client
        sendFileReceivedToClient();
    });

    socket.on('requestFileData', () => {
        console.log('File data requested');
        // send the file data to the client
        sendFileDataToClient('currentData.json', sendPointDataToClient);
    });

    // set up event listener for disconnections
    socket.on('disconnect', () => {
        // log disconnection
        console.log('User disconnected');
        // reset connection socket to null
        connectionSocket = null;

        // end server operations
        endServerOperations();
    });

    // handle disconnections without disconnect event
    socket.on('close', () => {
        console.log('Client disconnected');

        // reset connection socket to null
        connectionSocket = null;

        // end server operations
        endServerOperations();
    });

    // set up heartbeat messages every second
    heartbeatInterval = setInterval(() => {
        sendHeartbeatToClient();
    }, 1000);
});

// listen on port 5000 at local host ip
server.listen(5000, '127.0.0.1', () => {
    // indicate server is listening
    console.log('Server is running');
});

// sends data to client
function sendPointDataToClient(data) {
    if (connectionSocket) {
        connectionSocket.emit('pointData', data);
    }
};

function sendHeartbeatToClient() {
    if (connectionSocket) {
        connectionSocket.emit('heartbeat', {timestamp: Date.now(), hardware: true, hardwareHeartbeat: false});
    }
};

function sendFileReceivedToClient() {
    if (connectionSocket) {
        connectionSocket.emit('fileReceived', {timestamp: Date.now()});
    }
}

function endServerOperations() {
    // stop sending heartbeat messages
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
}