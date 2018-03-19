const fs = require('fs');

const wait = (secs) => {
    return new Promise((resolve, reject) => {
        if (secs > 4) return reject("Can't wait 4 secs!");
        setTimeout(resolve, secs * 1000);
    });
};

// const wait = (secs) => {
//     function myPromiseFn (resolvedor, rejeitor) {
//         if (secs > 4) return rejeitor("Can't wait 4 secs!");
//         setTimeout(resolvedor, secs * 1000);
//     }
//     return new Promise(myPromiseFn);
// };

console.log('waiting 2 secs...');
wait(2).then(() => console.log('waited 2 secs'));

console.log("Trying to wait 5 secs...");
wait(5)
    .then(() => console.log("I will never work :("))
    .catch((err) => {
        console.error("Error in promise:");
        console.error(err);
    });


const readFilePromise = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, function (err, data) {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

readFilePromise(process.argv[1]).then((data) => {
    console.log("read: I'm done.");
});

console.log("read: I'm just starting ;)");
