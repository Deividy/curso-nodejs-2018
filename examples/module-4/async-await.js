const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise  = util.promisify(fs.writeFile);

async function readAndProcessFiles () {
    let allContent = '';

    allContent += await readFilePromise('file1.txt');
    allContent += await readFilePromise('file2.txt');
    allContent += await readFilePromise('file3.txt');

    await writeFilePromise('all-files-together.txt', allContent);
    return allContent;
}

(async () => {
    try {
        console.log(await readAndProcessFiles());
    } catch (ex) {
        console.error(ex);
    }
})();

// await readAndProcessFiles();

