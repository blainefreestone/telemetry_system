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

    fileData.forEach((dataPoint, index) => {
        // calculate delay based on time of data point
        const delayMiliseconds = dataPoint.time * 1000;

        setTimeout(() => {
            // send data point to client
            sendDataToClientCallback(dataPoint);
        }, delayMiliseconds);
    });
}

module.exports = { saveDataToFile, loadDataFromFile, sendFileDataToClient };