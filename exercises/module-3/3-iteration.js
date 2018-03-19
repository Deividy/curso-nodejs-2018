const players = {
    speedy: 'Speedy',
    deividy: 'Deividy',
    ana: 'Ana',

    [Symbol.iterator]: () => {
        const keys = Object.keys(players);
    }
};

for (let playerName of players) {
    console.log(playerName);
}
