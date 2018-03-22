# 5) Módulos em Node.js

Node.js usa para controle de módulo internamente o *CommonJs*[[01]](http://wiki.commonjs.org/wiki/Modules/1.1.1), com o ES6 surgiu o ECMAScript Modules[[02]](https://gist.github.com/jkrems/769a8cd8806f7f57903b641c74b5f08a), existem varias discussões a respeito da implementação no Node.js e atualmente a feature está disponível como experimental[[03]](https://nodejs.org/api/esm.html).

Na referência tem o link do proposal bem detalhado[[04]](https://gist.github.com/ceejbot/b49f8789b2ab6b09548ccb72813a1054) além de um post de *James M Snell*[[09]](https://hackernoon.com/node-js-tc-39-and-modules-a1118aecf95e) sobre as diferenças de *CJS* e *ECM*.

Veremos aqui como funciona o CommonJS Module, além de conhecermos a história e entendermos a respeito do `npm` e `npx`. <br />
No final você ira aprender a criar o seu próprio módulo e publicar no *npm registry*.

## CommonJS module

*CommonJS Module* é o padrão no Node.js e consiste em 3 objetos que são *injetados* em seu script, são os objetos de: `exports`, `require` e `module`[[05]](https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/). 

Um módulo em CJS consiste em:

[cjs-example-multiply]()
```javascript
function multiply (a, b) {
    return a * b;
}

module.exports = multiply;
```

[cjs-example]()
```javascript
const multiply = require('./cjs-example-multiply');

console.log(multiply(10, 42)); // 420
```

Por baixo dos panos, o módulo `cjs-example-multiply` se torna:

```javascript
(function (exports, require, module, __filename, __dirname) {
    function multiply (a, b) {
        return a * b;
     }

     module.exports = multiply;
});

```

É por isso que temos acesso as variáveis `exports`, `require`, `module`, `__filename` e `__dirname`. Elas são injetadas em seu script.

`exports` é basicamente uma referência para o mesmo objeto que `module.exports`[[06]](https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js), essa é a resposta curta, na prática eles são um pouco diferentes, `exports` serve como um *alias* para um objeto, podemos definir propriedades alí que irá para dentro de `module.exports`, porém, apenas o `module.exports` é exportado, isso significa que:

[cjs-exports-example-module]()
```javascript
exports.foo = 'foo';
console.log(module.exports.foo); // 'foo'

exports = 'bar';
```

[cjs-exports-example]()
```javascript
const foo = require('./cjs-exports-example-module');
console.log(foo); // { foo: 'foo' }
```

[cjs-module-exports-example-module]()
```javascript
exports.foo = 'foo';
console.log(module.exports.foo); // 'foo'

module.exports = 'bar';
```

[cjs-module-exports-example]()
```javascript
const foo = require('./cjs-module-exports-example-module');
console.log(foo); // 'bar'
```

O link para o arquivo que cuida do carregamento de módulos no Node.js está na referência[[07]](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js).

## npm

npm é o maior registro de softwares do mundo [[09]](https://docs.npmjs.com/getting-started/what-is-npm)

## npx

## Criando um módulo

---

## Exercícios

---

# Referência

- [01] http://wiki.commonjs.org/wiki/Modules/1.1.1
- [02] https://gist.github.com/jkrems/769a8cd8806f7f57903b641c74b5f08a
- [03] https://nodejs.org/api/esm.html
- [04] https://gist.github.com/ceejbot/b49f8789b2ab6b09548ccb72813a1054
- [05] https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/
- [06] https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js
- [07] https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js
- [08] https://jakearchibald.com/2017/es-modules-in-browsers/

- https://nodejs.org/docs/latest/api/modules.html#modules_module_exports
- https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/
- https://gist.github.com/ceejbot/b49f8789b2ab6b09548ccb72813a1054
- https://nodejs.org/api/esm.html
- https://github.com/nodejs/node-eps/pull/60/files
- https://github.com/nodejs/node-eps/blob/master/002-es-modules.md
- http://requirejs.org/docs/commonjs.html
- https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/
