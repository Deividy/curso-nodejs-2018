const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise  = util.promisify(fs.writeFile);

function readAndProcessFiles () {
    let allContent = '';

    return new Promise((resolve, reject) => {
        return readFilePromise('file1.txt')
                    .then((data) => allContent += data)
                    .then(() => readFilePromise('file2.txt'))
                    .then((data) => allContent += data)
                    .then(() => readFilePromise('file3.txt'))
                    .then((data) => allContent += data)
                    .then(() => writeFilePromise(
                        'all-files-together.txt',
                        allContent
                    ))
                    .then(() => resolve(allContent))
                    .catch(reject);
    });
}


readAndProcessFiles().then((allContent) => {
    console.log(allContent);
}).catch((err) => {
    throw new Error(err);
});
