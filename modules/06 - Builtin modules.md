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

const objNested = {
    firstLevel: {
        levelTwo: {
            levelThree: {
                levelFour: {
                    heroes: [ 'Captain America' ]
                },

                heroes: [ 'Spider Man' ]
            }
        }
    }
};

console.log(objNested); // { firstLevel: { levelTwo: { levelThree: [Object] } } }

console.log(util.inspect(objNested, { depth: null }));
console.log(util.inspect(objNested, { colors: true, depth: null }));

console.log(util.format('%i', '1234foo'));
console.log(util.format('%s:%i', 'ae', '1234foo'));

const newFn = util.deprecate(function () { }, 'this is a deprecate warning!');
newFn(); // (node:1987) DeprecationWarning: this is a deprecate warning!

function callbackStyleFunction (someVar, callback) {
    if (!callback && someVar) {
        callback = someVar;
        someVar = null;
    }

    setTimeout(() => {
        if (someVar) return callback(null, someVar);
        callback('No var!');
    }, 1);
}

const promiseFunction = util.promisify(callbackStyleFunction);

(async () => {
    console.log(await promiseFunction('Foo'));

    try {
        await promiseFunction();
    } catch (ex) {
        console.log(ex);
    }
}
```

## events

O módulo de events[[05]](https://nodejs.org/api/events.html) basicamente provém uma interface para *Observer pattern*[[06]](https://www.tutorialspoint.com/design_pattern/observer_pattern.htm).

É uma classe que podemos extender, ou usar ela direto, ela tem métodos como `on`[[07]](https://nodejs.org/api/events.html#events_emitter_on_eventname_listener) e `once`[[08]](https://nodejs.org/api/events.html#events_emitter_once_eventname_listener) para ouvir eventos e um método chamado `emit`[[09]](https://nodejs.org/api/events.html#events_emitter_emit_eventname_args) para chamarmos esses eventos, além de varios outros *helpers*[[05]](https://nodejs.org/api/events.html).

Observe o seguinte exemplo:

```javascript

```

# Referência
