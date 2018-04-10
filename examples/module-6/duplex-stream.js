const stream = require('stream');

class MyDuplexStream extends stream.Duplex {
    constructor (options) {
        super(options);

        this.myResourceArray = [ ];
        this.readPosition = 0;
    }

    _write(chunk, encoding, callback) {
        setTimeout(() => {
            console.log(`Writing: ${chunk}`);
            this.myResourceArray.push(chunk);

            callback();
        }, 600 * Math.random()); // well, usually write takes more time
                                 // than read :P
    }

    _read (size) {
        setTimeout(() => {
            this.push(this.myResourceArray[this.readPosition++] || null);
        }, 420 * Math.random());
    }
}

const myFirstDuplexStream = new MyDuplexStream();

console.log(myFirstDuplexStream instanceof stream.Writable);
console.log(myFirstDuplexStream instanceof stream.Readable);

myFirstDuplexStream.write('Enquanto');
myFirstDuplexStream.write('uns');
myFirstDuplexStream.write('choram');
myFirstDuplexStream.write('outros');
myFirstDuplexStream.write('vem e os');
myFirstDuplexStream.end('devoram.');

myFirstDuplexStream.on('finish', (a) => {
    console.log('Finish write.');
    console.log('');

    const allReadData = [ ];
    myFirstDuplexStream.on('data', (data) => {
        allReadData.push(data);
        console.log(`Reading data: ${data}`);
    });

    myFirstDuplexStream.on('end', () => {
        console.log('Finish read.');
        console.log('');

        console.log(allReadData.join(' '));
    });
});
