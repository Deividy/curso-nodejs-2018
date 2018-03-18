function myFirstClosure (initialValue) {
    let myValue = initialValue;

    return {
        get () { return myValue; },
        set (val) { myValue = val; }
    };
}

const firstClosure = myFirstClosure('Learning closures is fun!');

console.log(firstClosure.get()); // Learning closures is fun!
console.log(firstClosure.myValue); // undefined

firstClosure.set('May the speedy force be with you');
console.log(firstClosure.get()); // May the speedy force be with you
console.log(firstClosure.myValue); // undefined
