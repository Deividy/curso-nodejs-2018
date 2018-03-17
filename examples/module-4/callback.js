function callback() { console.log('hit!'); }
setTimeout(callback, 1000);

console.log("I'm here!");

function callbackError () { throw new Error('OH NO'); }
try {
    setTimeout(callbackError, 2000);
} catch (ex) {
    console.log("i will never be hit :/");
}

function callbackWithNodeErrorPattern (err, result) {
    if (err) return console.error(err);
    console.log(result);
}

setTimeout(() => {
    callbackWithNodeErrorPattern('OH NO');
}, 1000);

setTimeout(() => {
    callbackWithNodeErrorPattern(null, 'Oh good!');
}, 1000);

console.log("EOF :P");
