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
class RpgGame {
    constructor () {
        this.players = [ ];
    }

    async loadPlayers () {
        const players = await readFilePromise('players.txt');
        this.players = JSON.parse(players.toString());
    }

    async savePlayers () {
        const playersString = JSON.stringify(this.players);
        await writeFilePromise('players.txt', playersString);
    }

    async addPlayer (playerName) {
        this.players.push(playerName);
        await this.savePlayers();
    }
}

(async function () {
    const rpg = new RpgGame();

    try {
        await rpg.loadPlayers();
    } catch (ex) {
        // maybe file is corrupt, we want to keep the flow even if we can't
        // load the players, so we'll just log here
        console.error(ex);
    }

    await rpg.addPlayer(`speedy force member ${new Date().getTime()}`);
    console.log(rpg.players);
})();

async function testAsyncWithPromise () {
    return 'COOL';
}

testAsyncWithPromise().then((val) => console.log(val));
