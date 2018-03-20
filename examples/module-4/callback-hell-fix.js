const fs = require('fs');

// recursive and not a pure function
// this will change the filesToProcess array
function concatAllFiles (filesToProcess, currentData, callback) {
    fs.readFile(filesToProcess.shift(), (err, data) => {
        if (err) return callback(err);

        currentData += data.toString();

        // no more files to process, just return
        if (filesToProcess.length === 0) {
            return callback(null, currentData);
        }

        concatAllFiles(filesToProcess, currentData, callback);
    });
}

function readAndProcessFiles (callback) {
    const filesToProcess = [ 'file1.txt', 'file2.txt', 'file3.txt' ];
    const startContent = '';

    concatAllFiles(filesToProcess, startContent, (err, allContent) => {
        if (err) return callback(err);

        fs.writeFile('all-files-together.txt', allContent, (err) => {
            callback(err, allContent);
        });
    });
}

readAndProcessFiles(function (err, allContent) {
    if (err) throw new Error(err);

    console.log(allContent);
});
