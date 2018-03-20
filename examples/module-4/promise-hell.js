// welcome to PROMISE HELL :D
const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise  = util.promisify(fs.writeFile);

function readAndProcessFiles () {
    return new Promise((resolve, reject) => {
        readFilePromise('file1.txt').then((data) => {
            const contentFile1 = data.toString();

            readFilePromise('file2.txt').then((data) => {
                const contentFile2 = data.toString();

                readFilePromise('file3.txt').then((data) => {
                    const contentFile3 = data.toString();
                    const allContent = contentFile1 + contentFile2 + contentFile3;

                    writeFilePromise('all-files-together', allContent)
                        .then(() => resolve(allContent))
                        .catch(reject);
                }).catch(reject);
            }).catch(reject);
        }).catch(reject);
    });
}

readAndProcessFiles().then((allContent) => {
    console.log(allContent);
}).catch((err) => {
    throw new Error(err);
});

