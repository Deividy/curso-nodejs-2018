# 3) JavaScript moderno

O JavaScript não é nada moderno e tem um longa história, porém, está em constante mudança e por aqui veremos algumas das mais novas *features* que temos disponíveis na versão atual do Node.js.

Você irá aprender conceitos sobre escopo no JavaScript, `const` e `let`, `arrow functions`, `iterables` e no final terá algumas dicas de como continuar o aprendizando.

> “Talk is cheap. Show me the code.” - Linus Torvalds

<a id='newjs-lexicalscope'></a>
## Escopo de variáveis em JavaScript

Existem diversas maneiras de definir um escopo em JavaScript. <br/>
Caso queira mais detalhes e a respeito, tem uma pergunta no stackoverflow[[01]](https://stackoverflow.com/questions/500431/what-is-the-scope-of-variables-in-javascript) repleta de comentários.

Irei resumir os escopos **Global**, **Local** e **Block**, no final iremos falar sobre **Closure**.

### Global scope

O escopo global, em Node.js, significa uma váriavel setada no objeto `global`, você pode iniciar uma váriavel global da seguinte forma:

[global-scope-app.js](../examples/module-3/1-global-scope-app.js)
```javascript
global.foo = 'speedyforce'
require('./bar');
```

[global-scope-module.js](../examples/module-3/1-global-scope-module.js)
```javascript
console.log(foo);
```

```shell
node 1-global-scope-app.js # will print: 'speedyforce'
```

### Local scope

No JavaScript, toda função (com excessão de arrow functions), cria um novo lexical scope[[32]](#ref-32), e isso é o que conhecemos como *local scope*. <br />
Algo peculiar é que váriaveis (`var`) e funções de um local scope são *hoisted*[[33]](#ref-33) no topo de seu escopo.

Entendo que a primeira vista essas palavras parecem bem complicadas, mas com alguns exemplos fica mais simples. <br />
Considere o seguinte codigo:


[local-scope.js](../examples/module-3/3-local-scope.js)
```javascript
foo(); // prints 'foo'
function foo() { console.log('foo');

console.log(bar); // prints undefined
var bar = 'foo';
```

O compilador JavaScript quando vê uma definicão de variavel usando `var` ou uma definicao de funcao com `function` move suas declaracões para o inicio de seu contexto, esse código na verdade é executado da seguinte forma:

```javascript
var bar;
function foo() { console.log('foo');

foo(); // prints 'foo'
console.log(bar); // prints undefined

bar = 'foo';
```

### Block scope

Block scope são escopos criados por qualquer `{}`, com a obvia excessao de funçoes que vimos em local scope. <br />
Por exemplo, podemos definir um block scope da seguinte forma:

[block-scope.js](../examples/module-3/4-block-scope.js#L1-L3)
```javascript
{
    console.log("I'm in a block scope!");
}
```

Isso é um block scope, agora qualquer `if (true) { }` ou `for () { }` tem um block scope, uma regra simples de lembrar é: *Se temos um `{}` definicao nao e uma `function` ou `class` isso e um block scope*.

`let` e `const` sao variaveis de block scope, enquanto `var` e variavel de local scope. <br />
Na pratica, isso significa que uma var definida em um block scope eh visivel fora do block scope, enquanto let e const nao.

Considere o seguinte codigo:

[block-scope.js](../examples/module-3/4-block-scope.js#L18-L22)
```javascript
for (var i = 0; i < 5; ++i) {}
console.log(i) // 5

for (let n = 0; n < 5; ++n) {}
console.log(n) // ReferenceError
```

### Closure

Closure pode ser um nome meio estranho a primeira vista, mas significa algo muito simples. <br />
Uma closure e uma funcao que tem acesso a uma variavel que nao e exposta, por exemplo:

```javascript
function initBar (initialValue) {
  const bar = initialValue;
  return function foo () {
    return bar;
  }
}

const bar = initBar('foo');
console.log(bar()) // foo
```

No exemplo, definimos a variavel `bar` dentro do initBar e retornamos uma outra funcao para o caller interagir, nao importa o que o caller faca, ele nao ira conseguir mudar a variavel bar diretamente, ele tem que chamar o `initBar()` para alterar o seu valor. <br />
Essa e uma forma de emularmos variaveis privadas em JavaScript, classes usam esse conceito extensamente.

#### 1) Exercício

blabla

```javascript

console.log('foo');

```

<a id='newjs-constletvar'></a>
## var, const e let
No início, não existia nada além de var, a partir do ECMAScript6 foram introduzidos let e const na especificação, `const` e `let` são variável de **block scope**, diferente de `var`.

[descricao mais detalhada e aprofundamento]

> **Exercício** <br />
> Observe o código abaixo, note o uso de `var` e reescreva o mesmo código usando `const` e `let`, preferindo o uso de `const`.

```javascript
var secret = 'This is a secret';

function passwordPlusSecret (password) {
    var newPassword = password + secret;
    return newPassword;
}

function genTwoVisits () {
    var visits = 0;
    var newPassword = passwordPlusSecret(visits);
    console.log(newPassword); // > 0This is a secret

    visits++;
    var newPassword2 = passwordPlusSecret(visits);
    console.log(newPassword2); // > 1This is a secret
}
genTwoVisits();

// ---

for (var i = 0; i < 5; ++i) {
    (function (id) {
        setTimeout(() => console.log(id), 1);
    })(i);
}

// this is broken, it should print the same of last example
// while you're changing vars to const/let, fix this! :)
for (var i = 0; i < 5; ++i) {
    setTimeout(() => console.log(i), 1);
}
```


<a id='newjs-arrowfunctions'></a>
## Arrow functions
Arrow functions são funções definidas usando o operador `=>` ao invés do tradicional modo `function(){}`.<br />
Além de encurtar as definições, arrow functions são uteís pois não iniciam um lexical scoping, isso significa que o escopo da função sera herdado de seu criador, ao contrario de normal functions. Um detalhe dessa implementacao é que arrow functions nao podem ser usadas como constructor, usando *new* keyword.

Alguns exemplos abaixo mostram a diferença:


> Exercicio: <br />
> Observe o codigo abaixo, e o refatore para usar arrow functions ao inves de functions ();
```javascript
function MyAwesomeClass () {
     this.karma = 1;
}

MyAwesomeClass.prototype.addKarma = function () {
    const self = this;

    setTimeout(function () {
        self.karma++;
    }, 420);
};

const myAwesomeClassFactory = function () {
    return new MyAwesomeClass();
};

```

<a id='newjs-arrayiterables'></a>
## Array iterables

No spec do ECMA5[[ref]](#ref) foram introduzidos novos array iterables como `forEach`, `reduce` e `map`. São funcoes bem simples que iteram um array, todas elas recebem uma funcao de iterable que eh passada por todos os itens do array, veremos alguns exemplos:

```javascript

const myArray = [ 1, 2, 3, 4, 5 ];

myArray.forEach((item) => console.log(item)); // 1, 2, 3, 4, 5

const newArray = myArray.map((item) => item + 1); // [ 2, 3, 4, 5, 6 ]

const total = myArray.reduce((accumulator, item) => accumulator + item) // 10
```

### Iterables e iterators

http://2ality.com/2015/02/es6-iteration.html

#### Métodos que usam iterables

#### Criando um iterable

### Destructuring

http://exploringjs.com/es6/ch_destructuring.html


### Generators

http://exploringjs.com/es6/ch_generators.html


### Stay foolish, stay hungry

Continue faminto! A especificacao ECMA vem evoluindo rapido, em menos de 5 anos mudou MUITA coisa, entao nao pare de estudar e aprender, para esse capitulo deixarei um desafio 'simples' (he he he :D). <br />

Refatore o codigo abaixo escrito em javascript legacy para usar os novos conceitos que voce aprendeu:


```javascript

code legacy

```

# Referência

- [01] https://stackoverflow.com/questions/500431/what-is-the-scope-of-variables-in-javascript
