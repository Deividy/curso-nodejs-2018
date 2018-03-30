const myCoolClass = require('./cjs-cool-class-example1');
console.log(myCoolClass.foo); // 'bar'

myCoolClass.foo = 'zaz';

module.exports = 'just exporting';
