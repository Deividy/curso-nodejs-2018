const stream = require('stream');

const myFirstTransformStream = new stream.Transform({
    transform (chunk, encoding, callback) {
        this.push(`Transforming: ${chunk}`);
        callback();
    }
});

const transformedArray = [ ];
myFirstTransformStream.on('data', (d) => {
    console.log(`Received data: ${d}`);
    transformedArray.push(d.toString());
});

myFirstTransformStream.write('fire');
myFirstTransformStream.end('in the hole');

myFirstTransformStream.on('end', () => {
    console.log('End');
    console.log(transformedArray);
});
