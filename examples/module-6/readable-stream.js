const stream = require('stream');

const myResource = "fear is how I fall, confusing what is real";
class MyReadableStream extends stream.Readable {
    constructor (options) {
        super(options);

        this.myResourceArray = myResource.split(' ');
        this.readPosition = 0;
    }

    // we will ignore the size here
    _read (size) {
        // setTimeout to simulate something async
        setTimeout(() => {
            // here we have to ensure a null return, since node will check by null:
            // https://github.com/nodejs/node/blob/cf5f986/lib/_stream_readable.js#L228
            this.push(this.myResourceArray[this.readPosition++] || null);
        }, 420 * Math.random()); // since its async, why not use some random time? :)
    }
}


const myFirstReadableStream = new MyReadableStream();

// parsing this readable stream! :)
const allWords = [ ];
myFirstReadableStream.on('data', (data) => {
    console.log(`Receiving data: ${data}`);
    allWords.push(data);
});

myFirstReadableStream.on('end', () => {
    console.log(' ');
    console.log(allWords.join(' '));
});
