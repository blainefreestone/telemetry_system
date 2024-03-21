const fs = require('fs');
const path = require('path');

// directory to save data files
const saveDirectory = './data';

// save data into file as JSON
const saveDataToFile = (data, fileName) => {
    // create filepath from saveDirectory and fileName
    const filePath = path.join(saveDirectory, fileName);
    // write data to file in JSON format
    fs.writeFileSync(filePath, JSON.stringify(data));
}

// load data in JSON format from file
const loadDataFromFile = (filename) => {
    // create filepath from saveDirectory and filename
    const filePath = path.join(saveDirectory, filename);
    // return data from file
    return JSON.parse(fs.readFileSync(filePath));
}

const sendFileDataToClient = (filename, sendDataToClientCallback) => {
    // get current file data
    const fileData = loadDataFromFile(filename);

    // get time of first data point
    const firstDataPointTime = fileData.length > 0 ? fileData[0].time : 0;

    fileData.forEach((dataPoint, index) => {
        // calculate delay based on time of data point
        const delayMilliseconds = (dataPoint.time - firstDataPointTime) * 1000;

        setTimeout(() => {
            // send data point to client
            sendDataToClientCallback(dataPoint);
        }, delayMilliseconds);
    });
}

module.exports = { saveDataToFile, loadDataFromFile, sendFileDataToClient };