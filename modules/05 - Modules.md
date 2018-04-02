# 5) Módulos em Node.js
> "We build our computer (systems) the way we build our cities: over time, without a plan, on top of ruins." - Ellen Ullman

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

Porém, como ESM e CJS são dois module loaders completamente diferentes, temos algumas peculiaridades em usar os dois juntos, no momento, com Node.js, modulos usando *ESM* tem que ter a extensão `.mjs`[[03]](https://nodejs.org/api/esm.html) e temos que rodar o arquivo com a flag `--experimental-modules`, outra opção é usar o *@std/esm*[[12]](https://github.com/standard-things/esm).

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

O código acima pode ser rodado no Node.js v8.10+ com a flag `--experimental-modules` *(`node --experimental-modules esm-run.mjs`)* ou usando o module *@std/esm*[[12]](https://github.com/standard-things/esm).

Por ser uma feature experimental na versão mais recente do Node.js e adicionar uma complexidade extra, iremos ser breves aqui e nos manteremos usando *CJS requires*, na referência tem alguns links([[13]](http://2ality.com/2017/05/es-module-specifiers.html), [[14]](https://medium.com/webpack/the-state-of-javascript-modules-4636d1774358)) para continuar seu estudo em relação ao *ECMAScript modules*.

## npm

npm é o registro de módulos padrão do Node.js e atualmente é o maior registro de softwares do mundo, contando com aproximadamente **6 bilhões** de downloads por semana [[15]](https://docs.npmjs.com/getting-started/what-is-npm) e contendo mais de **600.000** *packages*.

Consiste em 3 diferentes componentes:
- O website https://npmjs.com
- Interface de linha de comando (CLI)
- O registro

Você pode usar o site para procurar pacotes, a linha de comando para interagir com o npm e o registro para publicar e baixar novos pacotes.

Qualquer pessoa no mundo pode criar um pacote publico no npm e publicar, por isso, **muito cuidado com qualquer módulo que você queira instalar em seu aplicativo**, sempre procure ver se é realmente necessário[[16]](https://news.ycombinator.com/item?id=11348798) e se será útil para sua app, seja bem criterioso ao instalar novos pacotes.

Outro detalhe importante, o *npm* é uma empresa, com poucos desenvolvedores e alta demanda, no momento é um pouco turbulento [[17]](https://news.ycombinator.com/item?id=16435305) e não aconselho a depender do registro em produção[[18]](https://news.ycombinator.com/item?id=16087024).

**npm, Inc.** foi fundada em 2014 por:
- Isaac Z. Schlueter, CEO
- Laurie Voss, COO
- CJ Silverio, CTO
A missão do *npm* é levar o Open Source para todos os lugares do mundo [[19]](https://www.npmjs.com/about).


Para puublicar um pacote, você primeiro precisa criar uma conta no site do npm[[20]](https://www.npmjs.com/signup) e em seguida usar os comandos de `npm init`[[21]](https://docs.npmjs.com/cli/init) e `npm publish`[[22]](https://docs.npmjs.com/cli/publish). <br />
Criaremos nosso primeiro pacote e publicaremos ele no final desse módulo. 

### Usando módulos

Para usar um módulo....

## npx

A partir da versão `5.2` do npm, foi introduzido um novo binário chamado `npx`.
O *npx* é uma ferramenta destinada a ajudar e complementar a experiência de usar pacotes npm, *npx* facilita o uso das ferramentas *CLI* e outros executáveis hospedados no registro, simplificando a vida de uma série de pacotes que até então exigiam um pouco mais de *hard work*[[23]](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

![cow say npx thanks to @maybekatz](https://cdn-images-1.medium.com/max/800/1*A4HJT1FHQA_1_z3aMBc5mg.gif)

## Publicando meu primeiro pacote


Como vimos anteriormente, a primeira coisa que precisa ser feita para publicar um módulo é criar uma conta no site do *npm*[[20]](https://www.npmjs.com/signup).

Após criada, precisamos configurar a *CLI*:

```shell
$ npm login
Username: (deividy)
Password: (or leave unchanged)
Email: (this IS public) (deividyz@gmail.com)
Logged in as deividy on https://registry.npmjs.org/.
```

Após logado na *CLI*, podemos acessar a pasta do nosso pacote, rodar o comando `npm init` e seguir as instruções

```shell
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (my-first-npm-module-speedyforce)
version: (1.0.0)
description: Testing module system for Node.js 2018 :)
entry point: (index.js)
test command:
git repository:
keywords:
author: Deividy Metheler Zachetti
license: (ISC) UNLICENSED
About to write to /Users/deividy/dev/speedyforce/curso-nodejs-2018/examples/module-5/my-first-npm-module-speedyforce/package.json:

{
  "name": "my-first-npm-module-speedyforce",
  "version": "1.0.0",
  "description": "Testing module system for Node.js 2018 :)",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Deividy Metheler Zachetti",
  "license": "UNLICENSED"
}


Is this ok? (yes) yes
```

*Não é obrigatório, mas o padrão é o pacote estar em um repositório git.*

**Usando o npx** <br />
Para usar o *npx* podemos adicionar no nosso `package.json` uma entrada `"bin":{}` com os comandos a serem executados, por exempo:

```json
 "bin": {
      "my-first-npm-module-speedyforce": "./index.js"
  }
```

Após iniciado o projeto, podemos mandar um `npm publish` e se o nome do módulo for único, e não existir nenhum pacote com o mesmo nome, ele automaticamente publicará no registro:

```shell
$ npm publish
+ my-first-npm-module-speedyforce@1.0.0
```

Pronto! Nosso modulo está publicado! :) <br />
Podemos agora instalar ele com apenas:

```shell
$ npm install my-first-npm-module-speedyforce --save
```

Ou executar ele direto com *npx*:

```shell
$ npx my-first-npm-module-speedyforce Speedy
npx: installed 1 in 3.001s
Hello, Speedy!
```

Aqui está o código completo:

[package.json](../examples/module-5/my-first-npm-module-speedyforce/package.json)
```json
{
  "name": "my-first-npm-module-speedyforce",
  "version": "1.0.3",
  "description": "Testing module system for Node.js 2018 :)",
  "main": "index.js",
  "bin": {
      "my-first-npm-module-speedyforce": "./index.js"
  },
  "author": "Deividy Metheler Zachetti",
  "license": "UNLICENSED"
}
```

[index.js](../examples/module-5/my-first-npm-module-speedyforce/index.js)
```javascript
#!/usr/bin/env node
console.log(`Hello, ${process.argv[2] || 'someone'}!`);
```

---

## Exercícios

### 1) Crie seu primeiro pacote público e publique no *npm*.

### 2) Adicione um comando *bin* e execute com *npx*.

### 3) Adicione um comando extra em `scripts`.

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
- [12] https://github.com/standard-things/esm
- [13] http://2ality.com/2017/05/es-module-specifiers.html
- [14] https://medium.com/webpack/the-state-of-javascript-modules-4636d1774358
- [15] https://docs.npmjs.com/getting-started/what-is-npm
- [16] https://news.ycombinator.com/item?id=11348798
- [17] https://news.ycombinator.com/item?id=16435305
- [18] https://news.ycombinator.com/item?id=16087024
- [19] https://www.npmjs.com/about
- [20] https://www.npmjs.com/signup
- [21] https://docs.npmjs.com/cli/init
- [22] https://docs.npmjs.com/cli/publish
- [23] https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b
