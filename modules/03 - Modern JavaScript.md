<a id='modern-javascript'></a>
# 3) JavaScript moderno
> “Talk is cheap. Show me the code.” - Linus Torvalds

O JavaScript não é nada moderno e tem um longa história, porém, está em constante mudança e por aqui veremos algumas das mais novas *features* que temos disponíveis na versão atual do Node.js.

Você irá aprender conceitos sobre escopo no JavaScript, `const` e `let`, `arrow functions`, `iterations` e `generators`.
*Sei que existe bem mais para se aprender sobre ES6, quero apenas passar um overview de algumas técnicas mais usadas por mim.*

Caso queira um estudo mais aprofundado, na [referência](#reference) tem vários links repletos de conteúdo gratuito.

<a id='variable-scope'></a>
## Escopo de variáveis em JavaScript

Existem diversas maneiras de definir um escopo em JavaScript. <br/>
Caso queira mais detalhes e a respeito, tem uma pergunta no stackoverflow[[01]](https://stackoverflow.com/questions/500431/what-is-the-scope-of-variables-in-javascript) repleta de comentários.

Irei resumir os escopos **Global**, **Local** e **Block**, no final iremos falar sobre **Closure**.

### Global scope

O escopo global, em Node.js, significa uma váriavel setada no objeto `global`, você pode iniciar uma váriavel global da seguinte forma:

[global-scope-app.js](../examples/module-3/global-scope-app.js)
```javascript
global.foo = 'speedyforce'
require('./bar');
```

[global-scope-module.js](../examples/module-3/global-scope-module.js)
```javascript
console.log(foo);
```

Execute o arquivo `global-scope-app.js`:
```shell
node 1-global-scope-app.js # will print: 'speedyforce'
```

### Local scope

No JavaScript, toda função (com excessão de arrow functions), cria um novo lexical scope[[02]](https://stackoverflow.com/questions/1047454/what-is-lexical-scope), e isso é o que conhecemos como *local scope*. <br />
Algo peculiar é que váriaveis (`var`) e funções de um local scope são *hoisted*[[03]](https://www.w3schools.com/js/js_hoisting.asp) no topo de seu escopo.

Entendo que a primeira vista essas palavras parecem bem complicadas, mas com alguns exemplos fica mais simples.

Considere o seguinte código:

[local-scope.js](../examples/module-3/local-scope.js)
```javascript
foo(); // prints 'foo'
function foo() { console.log('foo'); }

console.log(bar); // prints undefined
var bar = 'foo';
```

O compilador JavaScript quando vê uma definicão de variável usando `var` ou um *statement* de função move suas declaracões para o ínicio de seu contexto, esse código é executado da seguinte forma:

```javascript
var bar;
function foo() { console.log('foo'); }

foo(); // prints 'foo'
console.log(bar); // prints undefined

bar = 'foo';
```

### Block scope

Block scope são escopos criados por qualquer `{}`, com a óbvia excessao de funções que vimos em local scope.

Por exemplo, podemos definir um block scope da seguinte forma:

[block-scope.js](../examples/module-3/block-scope.js)
```javascript
{
    console.log("I'm in a block scope!");
}
```

Isso é um block scope, agora qualquer `if (true) { }` ou `for () { }` cria um block scope, uma regra simples de lembrar é: *Se temos um `{}` e não é uma `function` ou `class` isso e um block scope*.

`let` e `const` são variáveis de block scope, enquanto `var` representa o local scope. <br />
Na prática, isso significa que uma `var` definida em um block scope eh visível fora do block scope, enquanto let e const não.

Considere o seguinte código:
```javascript
for (var i = 0; i < 5; ++i) {}
console.log(i) // 5

for (let n = 0; n < 5; ++n) {}
console.log(n) // ReferenceError
```

### Closure

Uma closure é uma função(ou objeto) que tem acesso a uma variável definida em um escopo acima, de forma que somente esse objeto consegue modificar e acessar a variável.

Por exemplo:

[closure.js](../examples/module-3/closure.js)
```javascript
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
```

Acima definimos a variável `myValue` dentro do escopo da função `myFirstClosure`, ela não é exposta para o *caller*. <br />
A função retorna apenas um objeto com dois metódos, `set` e `get`, o único jeito de acessarmos a variável `myValue` é usando algum desses métodos. 

O fato da variável `myValue` não ser exposta e a função `myFirstClosure` retornar um objeto (poderia ser uma função) que pode manipular essa variável define uma closure.

<a id='var-const-let'></a>
## var, const e let
No início, não existia nada além de *var*, a partir do *ES6* foram introduzidos *let* e *const* na especificação, `const` e `let` são variável de **block scope**, diferente de `var`.

`const` define uma variável que não pode ser alterada, porém isso não nos da o conceito de *imutabilidade* por completo, pois podemos definir um objeto como `const` e alterar suas propriedades, considere o seguinte código:

[variables.js](../examples/module-3/variables.js)
```javascript
const myFirstConst = 'foo';
myFirstConst = 'bar'; // TypeError: Assignment to constant variable.
```

Porém, o código abaixo é válido:

```javascript
const mySecondConst = { foo: 'bar' };
mySecondConst.foo = 'zaz';
console.log(mySecondConst); // { foo: 'zaz' }
```

`let` se comporta mais parecido com `var`, com a diferença de ser *block scope*.<br />
Considere o seguinte exemplo:

```javascript
let myFirstLet = 'foo';
myFirstLet = 'bar';

console.log(myFirstLet);

{
    let mySecondLet = 'foo';
}
console.log(mySecondLet); // ReferenceError: mySecondLet is not defined
```

Hoje em dia **não é aconselhável o uso de `var`** já que `const` e `let` tem o mesmo efeito com **maior clareza**.

Veremos como `var` funciona na prática:

```javascript
var myFirstVar = 'foo';
myFirstVar = 'bar';
console.log(myFirstVar);

{
    var mySecondVar = 'foo';
}
console.log(mySecondVar); // foo
```

<a id='arrow-functions'></a>
## Arrow functions

Arrow functions são funções definidas usando o operador `=>` ao invés do tradicional modo `function(){}`.

Além de encurtar as definições, arrow functions não iniciam um lexical scoping, isso significa que o escopo da função será herdado de seu criador, são *anônimas* por definição e arrow functions não podem ser usadas como constructor (usando *new* keyword).

Alguns exemplos abaixo mostram a diferença:

[arrow-functions.js](../examples/module-3/arrow-functions.js)
```javascript
const definingArrowFunction = () => "Thats one way!";
console.log(definingArrowFunction()); // "Thats one way!"
```

Quando definimos uma arrow function e não colocamos nenhum body para ela (`{}`) ela automaticamente irá retornar o seu valor.

```javascript
const arrowWithOneArg = name => `hello ${name}`;
console.log(arrowWithOneArg('speedy'));

const arrowWithTwoArgs = (name, email) => `hello ${name} <${email}>`;
console.log(arrowWithTwoArgs('speedy', 'deividyz@gmail.com'));
```

Note no exemplo acimar que para uma arrow function com apenas um parâmetro não precisamos usar `()`, porém se a função usar mais de um somos obrigados a user o `()`. 

*Aconselho como boa-prática sempre o uso de `()`, pois fica padronizado e não temos que nos preocupar se tem um argumento, ou multiplos, e IMHO facilita no entendimento.*

```javascript
const arrowWithBody = (name) => {
    console.log(`Hey-yo, ${name}`);
    console.log('Do you want a beer?');
};

arrowWithBody('speedy');
console.log((() => "hiiii, self calling")());

(() => {
    console.log("I'm self calling with a body! :D");
    console.log("am I pretty? ;)");
})();

const HowAboutAClass = () => {
    console.log("That work?");
};

try {
    new HowAboutAClass();
} catch (ex) {
    console.error(ex);
}

// a function('class') to get a little context so we can test :)
new (function JustAContext () {
    this.canAnArrowFunctionSeeThis = 'YES';

    const arrowFn = () => {
        console.log("Arrow can see?");
        console.log(this.canAnArrowFunctionSeeThis);
    }

    function normalFn () {
        console.log("Normal can see?");
        console.log(this.canAnArrowFunctionSeeThis);
    }

    arrowFn();
    normalFn();
}
```

Acima os exemplos são *auto-explicativos*, execute eles em sua maquina, edite e tire suas próprias conclusões. ;)

<a id='array-functions'></a>
## Manipulação de arrays

Novas funções para manipulação de arrays também foram introduzidas no ES6, iremos mostrar aqui `forEach`, `reduce` e `map`. 

São simples funções que tinhamos a oportunidade de usar antes apenas com bibliotecas, veja alguns exemplos:

[arrow-functions.js](../examples/module-3/array-functions.js)
```javascript

const myArray = [ 1, 2, 3, 4, 5 ];

myArray.forEach((item) => console.log(item)); // 1, 2, 3, 4, 5
const newArray = myArray.map((item) => item + 1); // [ 2, 3, 4, 5, 6 ]
const total = myArray.reduce((accumulator, item) => accumulator + item) // 10
```
<a id='iteration'></a>
### Iterables e iterators

Com o ES6 foi introduzido um novo mecanismo para iterar dados: *iteration*[[04]](http://exploringjs.com/es6/ch_iteration.html), que consistem em dois conceitos:

 - Um *iterable* é uma estrutura de dados, pode ser qualquer tipo de objeto. Implementamos o metodo `Symbol.iterator` para dizer que esse objeto pode ser usado para iteração
 - Um *iterator* é um ponteiro usado para percorrer os elemento da estrutura de dados.

O metódo `for of` usa esses conceitos para iterar os dados, qualquer estrutura de dados que implemente o `Symbol.iterator` pode ser iterado com `for of...`.

O método `Symbol.iterator` definido em seu objeto, é obrigado a retornar um objeto com o método `next(){}`.
O `next(){}`, por sua tem que retornar um objeto com `{ done: true|false, value: value-of-your-obj }`.

Conside os seguintes exemplos:

[iteration.js](../examples/module-3/iteration.js)
```javascript
const myFirstIterator = {
    dataSource: [
        'This is a simple data source',
        'May the speedy force be with you'
    ],

    step: 0,
    [Symbol.iterator] () {
        return {
            next () {
                const value = myFirstIterator.dataSource[myFirstIterator.step++];
                return { done: !value, value };
            }
        };
    }
}

for (let value of myFirstIterator) {
    console.log(value);
}

class MyFirstClassIteraction {
    constructor () {
        this.values = [];
    }

    push (value) {
        this.values.push(value);
        return this;
    }

    [Symbol.iterator] () {
        let step = 0;

        return {
            next: () => {
                return {
                    done: this.values.length === step,
                    value: this.values[step++]
                };
            }
        };
    }
}

const iteractingClasses = new MyFirstClassIteraction();
iteractingClasses.push('Hey you')
                 .push(null)
                 .push('Ta curtindo?');

for (let value of iteractingClasses) {
    console.log(value);
}
```

Para maiores informações, acesse a referência[[04]](http://exploringjs.com/es6/ch_iteration.html).

<a id='destructuring'></a>
### Destructuring

*Destructuring* é uma maneira fácil e conveniente de extrair valores de um array ou objeto.

[destructuring.js](../examples/module-3/destructuring.js)
```javascript
// extracting from object
const user = { name: 'Deividy Metheler Zachetti', email: 'deividyz@gmail.com' };

const { name, email } = user; // destructuring! :P
console.log(name, email);

const userNames = [ 'deividy', 'speedy', 'foo', 'bar', 'ana' ];

// extracting from array
const [ firstUserName, secondUserName, ...others ] = userNames;

console.log(firstUserName); // deividy
console.log(secondUserName); // speedy
console.log(others); // [ 'foo', 'bar', 'ana' ]
```
*Note o uso de `...` para pegar o restante dos elementos de um array.*

Para um estudo mais aprofundado, acesse a referência[[05]](http://exploringjs.com/es6/ch_destructuring.html).

<a id='generators'></a>
### Generators

Podemos pensar em generators como pedaços de código que conseguimos pausar e resumir[[06]](http://exploringjs.com/es6/ch_generators.html).

Para definir uma função como generator, usamos o `*` no final da palavra (e.g: `function* (){}`) e em classes antes do nome do método (e.g: `* myMethod () {}`, não podemos usar generators como arrow functions.

Usamos a *keyword* `yield` para pausar a execução da função e o método `.next()` para continuar, veja alguns exemplos:

[generators.js](../examples/module-3/generators.js)
```javascript
function* myFirstGenerator () {
    console.log('Hi, please press next() :)');
    yield;
    console.log("Now, you are getting!")
}

const myFirstGenLoaded = myFirstGenerator();
myFirstGenLoaded.next() // 'Hi, please press next() :)'
myFirstGenLoaded.next() // 'Now, you are getting!'
```

---

<a id='exercises'></a>
## Exercícios

### 1) Observe o código abaixo, veja que ele está escrito usando `var`, refatore o código de modo a usar apenas `const` e `let`, prefira usar `const`.

```javascript
var assert = require('assert');

function genPage (pageName) {
    var page = pageName;
    var visits = 0;

    return {
        addVisit: function () {
            return visits++;
        },

        getPage: function () {
            return page;
        },

        getVisits: function () {
            return visits;
        }
    }
}

var homePage = genPage('home');
var aboutPage = genPage('about');

aboutPage.addVisit();
aboutPage.addVisit();
homePage.addVisit();

assert.equal(homePage.getPage(), 'home');
assert.equal(aboutPage.getPage(), 'about');

assert.equal(homePage.getVisits(), 1);
assert.equal(aboutPage.getVisits(), 2);

console.log(homePage.getPage());
console.log(`visits: ${homePage.getVisits()}`);

console.log(aboutPage.getPage());
console.log(`visits: ${aboutPage.getVisits()}`);

for (var countVists = 1; countVists <= aboutPage.getVisits(); ++countVists) {
    (function (i) {
        setTimeout(function () {
            console.log(i);
        }, 100);
    })(countVists);
}
```

### 2) Refatore as funcões abaixo para usar arrow functions.

```javascript
const logins = [
    { name: 'speedy', karma: 1001 },
    { name: 'deividy', karma: 900 },
    { name: 'ana', karma: 1200 },
    { name: 'foo', karma: 1 },
    { name: 'bar', karma: 2 }
];

function loginWithGreatKarma (login) {
    return login.karma > 1000;
}

function loginWithPoorKarma (login) {
    return login.karma < 10;
}

function loginNameMap (login) {
    return login.name;
}

function printPoorKarmaLoginNames () {
    const poorKarmaLogins = logins.filter(loginWithPoorKarma);

    console.log("poor karma: :(");
    console.log(poorKarmaLogins.map(loginNameMap));
}

function printGreatKarmaLoginNames () {
    const greatKarmaLogins = logins.filter(loginWithGreatKarma);

    console.log("great karma: :)");
    console.log(greatKarmaLogins.map(loginNameMap));
}

function printAllLoginNames () {
    console.log('all logins:');
    console.log(logins.map(loginNameMap));
}

printTotalKarma();
function printTotalKarma () {
    const totalKarma = logins.reduce(function (accumulator, login) {
        return accumulator + login.karma;
    }, 0);

    console.log('total karma:');
    console.log(totalKarma);
}

printAllLoginNames();
printPoorKarmaLoginNames();
printGreatKarmaLoginNames();
```

---

<a id='reference'></a>
# Referência

- [00] http://exploringjs.com/es6
- [01] https://stackoverflow.com/questions/500431/what-is-the-scope-of-variables-in-javascript
- [02] https://stackoverflow.com/questions/1047454/what-is-lexical-scope
- [03] https://www.w3schools.com/js/js_hoisting.asp
- [04] http://exploringjs.com/es6/ch_iteration.html
- [05] http://exploringjs.com/es6/ch_destructuring.html
