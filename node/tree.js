const tree = require('./listOfFiles');

let directoryPath;
let consoleParams = process.argv.slice(2);

if (typeof consoleParams[0] === 'undefined') {
    directoryPath = '';
}else if (consoleParams[0] === '--') {
    directoryPath = consoleParams[1];
}else {
    directoryPath = consoleParams[0];
}

tree(directoryPath)
    .then(result => {
        result.files.sort((a, b) => a.split('/').length > b.split('/').length);
        let output = JSON.stringify(result, null, '\r');
        console.log(output);
    })
    .catch(console.error);