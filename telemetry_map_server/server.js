const http = require('http');
const socketIo = require('socket.io');
const { startHardwareListener } =  require('./hardware.js');
const { start } = require('repl');

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
        startHardwareListener(sendPointDataToClient);
    });

    // set up event listener for disconnections
    socket.on('disconnect', () => {
        // log disconnection
        console.log('User disconnected');
        // reset connection socket to null
        connectionSocket = null;
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
        connectionSocket.emit('heartbeat', {timestamp: Date.now(), hardware: false});
    }
}