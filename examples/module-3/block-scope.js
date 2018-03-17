{
    console.log("I'm in a block scope!");
}

{
    var fooWithVar = 'VAR :X See the diference!';
    console.log(fooWithVar);
}
console.log(fooWithVar);

{
    let foo = 'LET :X See the diference!';
    console.log(foo);
}

// console.log(foo);

for (var i = 0; i < 5; ++i) {}
console.log(i) // 5

for (let n = 0; n < 5; ++n) {}
console.log(n) // ReferenceError
