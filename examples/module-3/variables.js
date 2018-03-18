// const example

const myFirstConst = 'foo';
myFirstConst = 'bar'; // TypeError: Assignment to constant variable.

const mySecondConst = { foo: 'bar' };
mySecondConst.foo = 'zaz';
console.log(mySecondConst); // { foo: 'zaz' }

// var example
var myFirstVar = 'foo';
myFirstVar = 'bar';

console.log(myFirstVar);

{
    var mySecondVar = 'foo';
}
console.log(mySecondVar); // foo

// let example
let myFirstLet = 'foo';
myFirstLet = 'bar';

console.log(myFirstLet);

{
    let mySecondLet = 'foo';
}
console.log(mySecondLet); // ReferenceError: mySecondLet is not defined
