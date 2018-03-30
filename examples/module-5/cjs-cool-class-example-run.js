const myCoolClass = require('./cjs-cool-class-example1');
const justExporting = require('./cjs-cool-class-example2');

console.log(justExporting); // 'just exporting'
console.log(myCoolClass.foo); // 'zaz'
