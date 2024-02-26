const http = require('http');
const socketIo = require('socket.io');
const readline = require('readline');

// Create a new HTTP server
const server = http.createServer();
// Create a new socket.io server
const io = socketIo(server, {
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

    socket.on('trigger', () => {
        console.log('Trigger received');
        processHardwareData({ x: -118.821527826096, y: 34.0139576938577 },  { x: -118.508878330345, y: 33.9816642996246 },  10000, 100);
    });

    // set up event listener for disconnections
    socket.on('disconnect', () => {
        // log disconnection
        console.log('User disconnected');
        // reset connection socket to null
        connectionSocket = null;
    });
});

// listen on port 5000 at local host ip
server.listen(5000, '127.0.0.1', () => {
    // indicate server is listening
    console.log('Server is running');
});



// sends data to client
function sendDataToClient(data) {
    if (connectionSocket) {
        connectionSocket.emit('data', data);
    }
};

const processHardwareData = (data) => {
    const points = createArc(
        { x: -118.821527826096, y: 34.0139576938577 },  // start of arc
        { x: -118.508878330345, y: 33.9816642996246 },  // end of arc
        10000,                                          // max height of arc
        100                                             // number of points in arc
    )
    points.forEach((point, index) => {
        setTimeout(() => {
            sendDataToClient(point);
        }, index * 100); // Wait half a second (500 milliseconds) for each point
    });
};

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
}