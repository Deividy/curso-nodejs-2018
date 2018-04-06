const { Writable } = require('stream');

let myUnderlyingResource = '';
class MyFirstWritable extends Writable {
    // http://bit.ly/2JoEZe9
    _write (chunk, encoding, callback) {
        // console.log(chunk); // <Buffer .. .. ..>
        // console.log(encoding); // buffer

        // we don't really care about enconding now, we will just implement
        // a write string, and will use a setTimeout to simulate async
        setTimeout(() => {
            myUnderlyingResource += chunk;
            callback();
        }, 1);
    }
}

const myFirstStream = new MyFirstWritable();

myFirstStream.write('foo');
myFirstStream.end('bar');

myFirstStream.on('finish', () => {
    console.log(myUnderlyingResource); // foobar
});

console.log(myUnderlyingResource); // empty string
