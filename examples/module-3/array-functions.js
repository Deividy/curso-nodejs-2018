const myArray = [ 1, 2, 3, 4, 5 ];

myArray.forEach((item) => console.log(item)); // 1, 2, 3, 4, 5

const newArray = myArray.map((item) => item + 1);
console.log(newArray); // [ 2, 3, 4, 5, 6 ]

const total = myArray.reduce((accumulator, item) => accumulator + item);
console.log(total);
