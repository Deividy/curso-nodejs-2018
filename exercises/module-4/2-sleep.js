async function sleep (secs) {
    // ...
}

async function main () {
    console.log("Hello, I will sleep for 5 secs now...");
    await sleep(5);
    console.log("DONE :)");
}

main();
