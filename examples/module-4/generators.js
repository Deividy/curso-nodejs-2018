function asyncify (generatorFn) {
    const myIterator = generatorFn();

    // recursive function that continue to feed itself
    // yielded Promises until there are none left
    const runNext = ({ value, done }) => {
        if (done) return;
        value.then(() => runNext(myIterator.next()))
    };

    runNext(myIterator.next());
}

const wait = (secs) => {
    return new Promise((resolve, reject) => {
        if (secs > 4) return reject("Can't wait 4 secs!");
        setTimeout(resolve, secs * 1000);
    });
};

asyncify(function* () {
    console.log("WAIT 1 sec...");
    yield wait(1);

    console.log("WAIT 2 secs...");
    yield wait(2);

    console.log("WAIT 1 sec...");
    yield wait(1);
});


// what about return?
const returnValuePromise = () => {
    return new Promise((resolve, reject) => resolve('value'));
};
asyncify(function* () {
    // return values dont work in our cool model :x
    console.log(yield returnValuePromise());
});

// what about an error?
const errorPromise = () => {
    return new Promise((resolve, reject) => reject(new Error('bum!')));
}
asyncify(function* () {
    // Well, with our functions errors are gone, unhandled promise rejections :x
    console.log(yield errorPromise());
});
