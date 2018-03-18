function* myFirstGenerator () {
    console.log('Hi, please press next() :)');
    yield;
    console.log("Now, you are getting!")
}

const myFirstGenLoaded = myFirstGenerator();
myFirstGenLoaded.next() // 'Hi, please press next() :)'
myFirstGenLoaded.next() // 'Now, you are getting!'

