// 8.10+
import foo, { add, sleep } from './esm-module';

console.log(foo); // 'foo'
console.log(add(1, 2)); // 3

(async () => {
    console.log('sleeping for 1sec...');
    await sleep(1);
    console.log('wake!');
})();
