const util = require('util');

const objNested = {
    firstLevel: {
        levelTwo: {
            levelThree: {
                levelFour: {
                    heroes: [ 'Captain America' ]
                },

                heroes: [ 'Spider Man' ]
            }
        }
    }
};

console.log(objNested); // { firstLevel: { levelTwo: { levelThree: [Object] } } }

console.log(util.inspect(objNested, { depth: null }));
console.log(util.inspect(objNested, { colors: true, depth: null }));

console.log(util.format('%i', '1234foo'));
console.log(util.format('%s:%i', 'ae', '1234foo'));

const newFn = util.deprecate(function () { }, 'this is a deprecate warning!');
newFn(); // (node:1987) DeprecationWarning: this is a deprecate warning!

function callbackStyleFunction (someVar, callback) {
    if (!callback && someVar) {
        callback = someVar;
        someVar = null;
    }

    setTimeout(() => {
        if (someVar) return callback(null, someVar);
        callback('No var!');
    }, 1);
}

const promiseFunction = util.promisify(callbackStyleFunction);

(async () => {
    console.log(await promiseFunction('Foo'));

    try {
        await promiseFunction();
    } catch (ex) {
        console.log(ex);
    }
})();
