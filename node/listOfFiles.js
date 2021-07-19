const fs = require('fs');
const path = require('path');

async function getList(directoryPath, listOfFiles = {files: [], dirs: []}) {
    try {
        let normalDirectoryPath = path.normalize(directoryPath);
        if (listOfFiles.dirs.length === 0 && normalDirectoryPath !== '.') {
            listOfFiles.dirs.push(separateDirectory(normalDirectoryPath));
        }
        let files = await readDirectory(normalDirectoryPath);
        for (let file of files) {
            let filePath = path.join(normalDirectoryPath, file);
            if (await isDirectory(filePath)) {
                listOfFiles.dirs.push(separateDirectory(filePath));
                await getList(filePath, listOfFiles);
            } else {
                listOfFiles.files.push(separateDirectory(filePath))
            }
        }
    } catch (err) {
        throw err;
    }
    return listOfFiles;
}

function separateDirectory(normalDirectoryPath) {
    return normalDirectoryPath.split(path.sep).join('/')
}

function readDirectory(normalDirectoryPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(normalDirectoryPath, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function isDirectory(filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.isDirectory());
            }
        });
    });
}

module.exports = getList;