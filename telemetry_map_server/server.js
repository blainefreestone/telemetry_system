const http = require('http');
const socketIo = require('socket.io');

// Create a new HTTP server
const server = http.createServer();
// Create a new socket.io server
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// set up event listener for new connections
io.on('connection', (socket) => {
    // log new connection
    console.log('New connection');
    // set up event listener for disconnections
    socket.on('disconnect', () => {
        // log disconnection
        console.log('User disconnected');
    });
});

// listen on port 5000 at local host ip
server.listen(5000, '127.0.0.1', () => {
    // indicate server is listening
    console.log('Server is running');
});