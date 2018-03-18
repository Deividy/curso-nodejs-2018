const user = { name: 'Deividy Metheler Zachetti', email: 'deividyz@gmail.com' };

const { name, email } = user; // destructuring! :P
console.log(name);
console.log(email);

const userNames = [ 'deividy', 'speedy', 'foo', 'bar', 'ana' ];

const [ firstUserName, secondUserName, ...others ] = userNames;

console.log(firstUserName); // deividy
console.log(secondUserName); // speedy
console.log(others); // [ 'foo', 'bar', 'ana' ]
