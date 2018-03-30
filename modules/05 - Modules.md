# 5) Módulos em Node.js

Node.js usa para controle de módulo internamente o *CommonJS*[[01]](http://wiki.commonjs.org/wiki/Modules/1.1.1), com o ES6 surgiu o ECMAScript Modules[[02]](https://gist.github.com/jkrems/769a8cd8806f7f57903b641c74b5f08a), existem várias discussões a respeito da implementação no Node.js e atualmente a feature está disponível como experimental[[03]](https://nodejs.org/api/esm.html).

Na referência tem o link do proposal bem detalhado[[04]](https://gist.github.com/ceejbot/b49f8789b2ab6b09548ccb72813a1054) além de um post de *James M Snell*[[05]](https://hackernoon.com/node-js-tc-39-and-modules-a1118aecf95e) sobre as diferenças de *CJS* e *ESM*.

Veremos aqui como funciona o CommonJS Module, o ECMAScript Module, iremos conhecer a história e entendermos a respeito do `npm`, além de conhecer o novo `npx`.

No final você aprenderá a criar o seu próprio módulo e publicar no *npm registry*.

## CommonJS module

*CommonJS Module* é o padrão no Node.js e consiste em 3 objetos que são *injetados* em seu script, são os objetos de: `exports`, `require` e `module`[[06]](https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/). 

Um módulo em CJS consiste em:

[cjs-example-multiply.js](../examples/module-5/cjs-example-multiply.js)
```javascript
function multiply (a, b) {
    return a * b;
}

module.exports = multiply;
```

No módulo acima, podemos notar o uso de `module.exports = multiply;`, quando escrevemos isso, estamos expondo a nossa função de `multiply` para qualquer usuário de nossa função.

A variável `module` é uma váriavel injetada em nosso script, todo script em Node.js é *wrapped* em volta de uma função que passa algumas variáveis das quais podemos usar, por exemplo, o módulo `cjs-example-multiply` se torna:

```javascript
(function (exports, require, module, __filename, __dirname) {
    function multiply (a, b) {
        return a * b;
     }

     module.exports = multiply;
});
```


É por isso que temos acesso as variáveis `exports`, `require`, `module`, `__filename` e `__dirname`. Elas são injetadas em nosso script.

Agora, para usarmos esse module, usamos a função `require`:

[cjs-example.js](../examples/module-5/cjs-example.js)
```javascript
const multiply = require('./cjs-example-multiply');

console.log(multiply(10, 42)); // 420
```

O Gerencimaneto de módulos no Node.js *cacheia* o módulo no primeiro *require* dele, isso significa que toda vez que vermos um `require('module-speedy')` sempre receberemos a mesma instância, isso garante que modules do tipo *singleton* funcionem corretamente, veja um exemplo:

[cjs-cool-class-example1.js](../examples/module-5/cjs-cool-class-example1.js)
```javascript
class MyCoolClass {
    constructor (foo) {
        this.foo = foo;
    }
}
module.exports = new MyCoolClass('bar');
```

[cjs-cool-class-example2.js](../examples/module-5/cjs-cool-class-example2.js)
```javascript
const myCoolClass = require('./cjs-cool-class-example1');
console.log(myCoolClass.foo); // 'bar'

myCoolClass.foo = 'zaz';

module.exports = 'just exporting';
```

[cjs-cool-class-example-run.js](../examples/module-5/cjs-cool-class-example-run.js)
```javascript
const myCoolClass = require('./cjs-cool-class-example1');
const justExporting = require('./cjs-cool-class-example2');

console.log(justExporting); // 'just exporting'
console.log(myCoolClass.foo); // 'zaz'
```


### `exports` vs `module.exports`

`exports` é basicamente uma referência para o mesmo objeto que `module.exports`[[07]](https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js), essa é a resposta curta, mas na prática eles são um pouco diferentes, `exports` serve como um *alias* para um objeto, podemos definir propriedades alí que iram para dentro de `module.exports`, porém, apenas o `module.exports` é exportado.

[cjs-exports-example-module.js](../examples/module-5/cjs-exports-example-module.js)
```javascript
exports.foo = 'Cool, dude!';
console.log(module.exports.foo); // 'Cool, dude!'

exports = 'This will work?';
```

[cjs-exports-example.js](../examples/module-5/cjs-exports-example.js)
```javascript
const cjsExportsExample = require('./cjs-exports-example-module');
console.log(cjsExportsExample); // { foo: 'Cool, dude!' }
```

Podemos notar no exemplo acima que, mesmo setando o `exports = 'This will work?'`, a string *'This will work?'* não foi exportada, veremos agora o mesmo exemplo usando `module.exports`:

[cjs-module-exports-example-module.js](../examples/module-5/cjs-module-exports-example-module.js)
```javascript
exports.foo = 'Cool, dude!';
console.log(module.exports.foo); // 'Cool, dude!'

module.exports = 'This will work?';
```

[cjs-module-exports-example.js](../examples/module-5/cjs-module-exports-example.js)
```javascript
const cjsModuleExportsExample = require('./cjs-module-exports-example-module');
console.log(cjsModuleExportsExample); // This will work?
```

Notou a diferença? Quando usamos o `module.exports = 'This will work?'` o único *objeto*[[08]](https://www.quora.com/Is-everything-an-object-in-Javascript) a ser exportado foi a string *'This will work'*.

Caso tenha interesse em ver como o Node.js cuida do load de modules para CJS internamente, veja o link na referência[[09]](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js).

## ECMAScript Module

ESM *(como é conhecido pelos chegados)* se tornou o padrão em browsers[[10]](https://jakearchibald.com/2017/es-modules-in-browsers/), desenvolvedores vindos do *front end* para o Node.js tem maior familiaridade com o *ESM* do que com *CJS*, além de ter algumas vantagens como[[11]](http://voidcanvas.com/import-vs-require/):

- Erros na hora de *parsing*
- *Static evaluation*
- *Lexical*
- file URI scheme
- Dynamic export / import

Porém, como ESM e CJS são dois module loaders completamente diferentes, temos algumas peculiaridades em usar os dois juntos, no momento, com Node.js, modulos usando *ESM* tem que ter a extensão `.mjs`[[12]](https://nodejs.org/api/esm.html), outra opção é usar o *@std/esm*[[13]](https://github.com/standard-things/esm).

Um módulo em *ESM* consiste em:

[esm-module.mjs](../examples/module-5/esm-module.mjs)
```javascript
export default 'foo';

export function add (a, b) { return a + b; };

export const sleep = async (secs = 1) => {
    return new Promise((resolve) => {
        setTimeout(resolve, secs * 1000);
    });
};
```

[esm-run.mjs](../examples/module-5/esm-run.mjs)
```javascript
import foo, { add, sleep } from './esm-module';

console.log(foo); // 'foo'
console.log(add(1, 2)); // 3

(async () => {
    console.log('sleeping for 1sec...');
    await sleep(1);
    console.log('wake!');
})();
```

O código acima pode ser rodado no Node.js v8.10+ com a flag `--experimental-modules` *(`node --experimental-modules esm-run.mjs`)* ou usando o module *@std/esm*[[13]](https://github.com/standard-things/esm).

Por ser uma feature experimental na versão mais recente do Node.js e adicionar uma complexidade extra, iremos ser breves aqui e nos manteremos usando *CJS requires*, na referência tem alguns links([[14]](), [[15]]()) para continuar seu estudo em relação ao *ECMAScript modules*.

## npm

npm é o gerenciamento de módulos padrão do Node.jse atualmente é o maior registro de softwares do mundo [[16]](https://docs.npmjs.com/getting-started/what-is-npm).

**npm, Inc.** é uma empresa fundada em 2014 por:
- Isaac Z. Schlueter, CEO
- Laurie Voss, COO
- CJ Silverio, CTO

A missão do *npm* é levar o Open Source para todos os lugares do mundo [[17]](https://www.npmjs.com/about).

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
- [05] https://hackernoon.com/node-js-tc-39-and-modules-a1118aecf95e
- [06] https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/
- [07] https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js
- [08] https://www.quora.com/Is-everything-an-object-in-Javascript
- [09] https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js
- [10] https://jakearchibald.com/2017/es-modules-in-browsers/
- [11] http://voidcanvas.com/import-vs-require/
- [12] https://nodejs.org/api/esm.html
- [13] https://github.com/standard-things/esm
- [14] https://medium.com/@WebReflection/javascript-dynamic-import-export-b0e8775a59d4

---

- https://docs.npmjs.com/getting-started/what-is-npm
- https://nodejs.org/docs/latest/api/modules.html#modules_module_exports
- https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/
- https://gist.github.com/ceejbot/b49f8789b2ab6b09548ccb72813a1054
- https://nodejs.org/api/esm.html
- https://github.com/nodejs/node-eps/pull/60/files
- https://github.com/nodejs/node-eps/blob/master/002-es-modules.md
- http://requirejs.org/docs/commonjs.html
- https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/

- [05] https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/
- [06] https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js
- [08] https://jakearchibald.com/2017/es-modules-in-browsers/
