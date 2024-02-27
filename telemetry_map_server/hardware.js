const startHardwareListener = (sendDataToClientCallback) => {
    // temporary test data function to simulate hardware data
    points = createArc(
        { x: -118.821527826096, y: 34.0139576938577 },  // start of arc
        { x: -118.508878330345, y: 31.9816642996246 },  // end of arc
        20000,                                          // max height of arc
        1000                                            // number of points in arc
    )
    points.forEach((point, index) => {
        setTimeout(() => {
            sendDataToClientCallback(point);
        }, index * 100); // Wait half a second (500 milliseconds) for each point
    });
    
    // TODO: serial connection with hardware here
} 

const processHardwareData = (data) => {
    // TODO: functions and code to process hardware data here
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