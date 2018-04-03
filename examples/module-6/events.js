const EventEmitter = require('events');

const myEventEmitter = new EventEmitter();
myEventEmitter.on('my-first-event', console.log);
myEventEmitter.on('my-first-event', (v) => console.log(`Number #2: ${v}`));

myEventEmitter.emit('my-first-event', 'TEST');

class MyClassEvent extends EventEmitter {
    constructor () {
        super();
        this.currentNumber = 0;
    }

    addAndEmit () {
        this.emit('add', this.currentNumber++);
    }
}

const myEventEmitterInstance = new MyClassEvent();

myEventEmitterInstance.on('add', (number) => {
    console.log(`Current number is now: ${number}`);
});

myEventEmitterInstance.once('add', (number) => {
    console.log(`Testing once, number is: ${number}`);
});

myEventEmitterInstance.addAndEmit();
myEventEmitterInstance.addAndEmit();
myEventEmitterInstance.addAndEmit();
myEventEmitterInstance.addAndEmit();

myEventEmitterInstance.once('add', (number) => {
    console.log(`Testing once AGAIN, number is: ${number}`);
});

myEventEmitterInstance.addAndEmit();

// getting listeners:

myEventEmitter.on('newListener', (eventName, listenerFunction) => {
    console.log('new listener:');
    console.log(eventName);
    console.log(listenerFunction.toString());
    console.log('---');
});


myEventEmitter.on('foo', console.log);
myEventEmitter.removeListener('foo', console.log);

myEventEmitter.on('bar', () => 'bar');
console.log(myEventEmitter.eventNames()); // [ 'my-first-event', 'newListener', 'bar' ]

myEventEmitter.on('removeListener', (eventName, listenerFunction) => {
    console.log('remove listener:');
    console.log(eventName);
    console.log(listenerFunction.toString());
    console.log('---');
});

myEventEmitter.once('speedy', console.log);
myEventEmitter.emit('speedy', '--- force HIT');
myEventEmitter.emit('speedy', '--- force HIT');

myEventEmitter.removeAllListeners();
