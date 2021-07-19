'use strict'

const fs = require('fs');
const highWaterMark = process.memoryUsage().heapUsed;

const opt = {
    encoding: "utf-8",
    highWaterMark: highWaterMark
};
let indexFile = 0;
const readBigFile = fs.createReadStream("bigFile.txt", opt);
const writeTransformFile = fs.createWriteStream("transform.txt", opt);

readBigFile.on('data', (chunk) => {
    if(chunk.length) writeSmallFile(indexFile++, chunk);
});

function writeSmallFile(index, chunk){
    const writeSmallFile = fs.createWriteStream("./smallFiles/smallFile_"+indexFile+".txt", opt);
    if(writeSmallFile.write(chunk)) writeSmallFile.close();
}

readBigFile.on('end', () => {
    const dirPath = 'smallFiles/';
    readFolder(dirPath)
        .then((filesArray) => {
            let FilePaths = [];
            filesArray.forEach(file => {
                let path = dirPath+file
                FilePaths.push(path)
            })
            console.log(FilePaths)
            return readFiles(FilePaths)
        })
});

function readFolder(FolderPath){
    return new Promise(function(resolve, reject){
        fs.readdir(FolderPath, (err, files) => {
            if (err) {
                reject("Reading Folder failed")
            } else {
                console.log('resolved')
                resolve(files)
            }
        })
    })
};

function readFiles(FilePaths) {
    return new Promise(function (resolve, reject) {
        let filesArray = []
        const promises = FilePaths.map(FilePath => {
            console.log("File Path :" + FilePath)
            return readFile(FilePath)
                .then((data) => {
                    console.log('Concat')
                    filesArray.push(data)
                })
                .catch((error) => {
                    console.log(error)
                })
        });
        Promise.all(promises)
            .then(() => {
                writeTransformFile.write(filesArray.toString());
                resolve(filesArray)
            })
    })
}

function readFile(FilePath){
    return new Promise(function(resolve,reject){
        fs.readFile(FilePath, (err, data) => {
            if (err) {
                reject("Reading file failed")
            } else {
                console.log('Read File started :'+FilePath)
                let chunk = data.toString();
                let value = chunk.split('\n').map(numb => +numb).sort().pop();
                resolve(value);
            }
        })
    })
};
