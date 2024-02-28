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

module.exports = { saveDataToFile, loadDataFromFile };