# 6) Módulos internos

Podemos fazer **muita** coisa somente usando os módulos que vem no Node.js, na maioria dos casos não precisamos de um *framework boladão* para resolver um simples problema.

Temos *out-of-the-box* modulos para eventos, streams, http, https, net, file system, entre muitos outros!

Veremos os mais úteis e construiremos pequenas aplicações com base neles.

## util

O módulo *util*[[01]](https://nodejs.org/api/util.html) nos da funcionalidades muito úteis (ah va!), como por exemplo `promisify`[[02]](https://nodejs.org/api/util.html#util_util_promisify_original) que vimos anteriormente.

Além do `promisify` temos o `callbackify`[[03]](https://nodejs.org/api/util.html#util_util_callbackify_original) que é o oposto do `promisify`. <br />
Temos também a função `inspect`[[04]](https://nodejs.org/api/util.html#util_util_inspect_object_options) que é bem útil para inspecionarmos objetos ou logarmos ele no console.

Veremos um exemplo com algumas das funções que você vai mais utilizar:

```javascript
const util = require('util');

function callbackStyleFunction (someVar, callback) {
    setTimeout(() => {
        if (someVar) return callback();
        callback('No var!');
    }, 1);
}

const promiseFunction = util.promisify(callbackStyleFunction);

(async () => {

})();

```

# Referência
