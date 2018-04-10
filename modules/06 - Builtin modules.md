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

O módulo de events[[05]](https://nodejs.org/api/events.html) provém uma interface para o *Observer pattern*[[06]](https://www.tutorialspoint.com/design_pattern/observer_pattern.htm).

É uma classe que podemos extender, ou usar ela direto, ela tem métodos como `on`[[07]](https://nodejs.org/api/events.html#events_emitter_on_eventname_listener) e `once`[[08]](https://nodejs.org/api/events.html#events_emitter_once_eventname_listener) para ouvir eventos e um método chamado `emit`[[09]](https://nodejs.org/api/events.html#events_emitter_emit_eventname_args) para chamarmos esses eventos, além de varios outros *helpers*[[05]](https://nodejs.org/api/events.html).

Observe o seguinte exemplo:

```javascript
const EventEmitter = require('events');

const myEventEmitter = new EventEmitter();
myEventEmitter.on('my-first-event', console.log);
myEventEmitter.on('my-first-event', (v) => console.log(`Number #2: ${v}`));

myEventEmitter.emit('my-first-event', 'TEST');

class MyClassEvent extends EventEmitter {
    constructor () {
        super();
        this.currentNumber = 0;
    }

    addAndEmit () {
        this.emit('add', this.currentNumber++);
    }
}

// ---

const myEventEmitterInstance = new MyClassEvent();

myEventEmitterInstance.on('add', (number) => {
    console.log(`Current number is now: ${number}`);
});

myEventEmitterInstance.once('add', (number) => {
    console.log(`Testing once, number is: ${number}`);
});

myEventEmitterInstance.addAndEmit();
myEventEmitterInstance.addAndEmit();
myEventEmitterInstance.addAndEmit();
myEventEmitterInstance.addAndEmit();

myEventEmitterInstance.once('add', (number) => {
    console.log(`Testing once AGAIN, number is: ${number}`);
});

myEventEmitterInstance.addAndEmit();

// ---

myEventEmitter.on('newListener', (eventName, listenerFunction) => {
    console.log('new listener:');
    console.log(eventName);
    console.log(listenerFunction.toString());
    console.log('---');
});


myEventEmitter.on('foo', console.log);
myEventEmitter.removeListener('foo', console.log);

myEventEmitter.on('bar', () => 'bar');
console.log(myEventEmitter.eventNames()); // [ 'my-first-event', 'newListener', 'bar' ]

myEventEmitter.on('removeListener', (eventName, listenerFunction) => {
    console.log('remove listener:');
    console.log(eventName);
    console.log(listenerFunction.toString());
    console.log('---');
});

myEventEmitter.once('speedy', console.log);
myEventEmitter.emit('speedy', '--- force HIT');
myEventEmitter.emit('speedy', '--- force HIT');

myEventEmitter.removeAllListeners();
```

Notou que o `EventEmitter` chama os eventos na ordem que foram registrados? Notou também que o `removeListener` é chamado quando removemos o `newListener` em `myEventEmitter.removeAllListeners()` ? E o inverso também ocorre, vemos o evento `removeListener` ser adicionando.


## stream

O módulo `stream` provém uma API para criarmos e usarmos de modo fácil streams. Vários objetos internamente usam (e abusam) de stream, como por exemplo o http incoming(request) [[10](https://github.com/nodejs/node/blob/29be1e5/lib/_http_incoming.js#L25-L302].

Streams podem ser *readable*, *writable* ou ambos, o que significa que podemos ter uma stream para escrever dados, para ler dados ou ambos. Todas as streams são instâncias de *EventEmitter*.

Streams são mais consumidas do que implementadas, o que *IMHO* deixa mais difícil para o dev entender o que está acontecendo, quando primeiro aprendemos a implementar uma stream e depois a consumi-la fica muito mais claro todo o caminho, por esse motivo iremos começar *implementando streams* (além de que, é bem mais divertido você consumir uma stream que você implementou =D).

[ ... talk about end/finish ... ]

### Implementando streams

Para implementar uma stream, precisamos primeiro criar uma classe extendendo um dos 4 tipos de streams: `stream.Writable`[[11](https://nodejs.org/api/stream.html#stream_implementing_a_writable_stream)], `stream.Readable`[[12](https://nodejs.org/api/stream.html#stream_implementing_a_readable_stream)], `stream.Duplex`[[13](https://nodejs.org/api/stream.html#stream_implementing_a_duplex_stream)] ou `stream.Transform`[[14](https://nodejs.org/api/stream.html#stream_implementing_a_transform_stream)] e implementarmos alguns métodos necessários dependo da instância desejada.
Também podemos implementar streams iniciando alguma dessas classes diretamente, passando como `options{}` os métodos necessários para implementação.

Veremos em detalhes cada uma dessas classes a seguir.

#### stream.Writable

Precisamos implementar os seguintes métodos para uma writable stream:

- `_write` (`options.write`) [[15](https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback_1)]
- `_writev`  (`options.writev`)[[16](https://nodejs.org/api/stream.html#stream_writable_writev_chunks_callback)] *optional*
- `_final`  (`options.final`)[[17](https://nodejs.org/api/stream.html#stream_writable_final_callback)] *optional*

Todas as opções aceitadas podem ser encontradas na referência[[18](https://nodejs.org/api/stream.html#stream_constructor_new_stream_writable_options)].

Veremos um exemplo simples:

```javascript
const { Writable } = require('stream');

let myUnderlyingResource = '';
class MyFirstWritable extends Writable {
    // https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback_1
    _write (chunk, encoding, callback) {
        // console.log(chunk); // <Buffer .. .. ..>
        // console.log(encoding); // buffer

        // we don't really care about enconding now, we will just implement
        // a write string, and will use a setTimeout to simulate async
        setTimeout(() => {
            myUnderlyingResource += chunk;
            callback();
        }, 1);
    }
}

const myFirstStream = new MyFirstWritable();

myFirstStream.write('foo');
myFirstStream.end('bar');

myFirstStream.on('finish', () => {
    console.log(myUnderlyingResource); // 'foobar'
});

console.log(myUnderlyingResource); // ''
```

Note que no exemplo acima passamos uma string e simplesmente concatenamos nossa string em nosso *resource* (internamente é chamado o método `.toString()` para nosso buffer). <br />
Esse resource poderia ser um *file description*, uma outra *stream* ou até mesmo um outro processo.

Para simplificar não estamos usando o módulo interno `string_decoder`, porém se estivéssemos trabalhando com *multi-byte encoding*, precisaríamos fazer algo mais parecido com o exemplo da própria documentação [[19](https://nodejs.org/api/stream.html#stream_decoding_buffers_in_a_writable_stream)]

[ ... talk a little about how that is working and why not necessary need to call finish/writev ...]

#### stream.Readable

Para usarmos uma *readable stream* precisamos implementar pelo menos o método de `read(size)`, podemos passar ele como `options`, igual fazemos para writable streams, ou extender a propriedade `_read(size)`[[20]](https://nodejs.org/api/stream.html#stream_readable_read_size_1).

Importante notarmos que o *size* é o tamanho em bytes pedidos pela stream, nossa implementação não necessáriamente precisa usar esse paramêtro, podemos simplesmente cuidar de mandar nossos dados de uma vez ou paginarmos de outra forma. <br />
O método `read` é chamado quando iniciamos uma stream e sempre que chamamos o método `this.push(chunk)`[[21]](https://nodejs.org/api/stream.html#stream_readable_push_chunk_encoding).
Para enviarmos os dados para o *caller* de nossa API usamos esse método `push`, para indicarmos que nossa stream terminou, enviamos o valor `null` *(`this.push(null)`)*.

Execute o seguinte exemplo:

```javascript
const stream = require('stream');

const myResource = "fear is how I fall, confusing what is real";
class MyReadableStream extends stream.Readable {
    constructor (options) {
        super(options);
        this.readPosition = 0;
    }

    // we will ignore the size here
    _read (size) {
        // setTimeout to simulate something async
        setTimeout(() => {
            // here we have to ensure a null return, since node will check by null:
            // https://github.com/nodejs/node/blob/cf5f986/lib/_stream_readable.js#L228
            this.push(myResource.split(' ')[this.readPosition++] || null);
        }, 5 * Math.random()); // since its async, why not use some random time? :)
    }
}


const myFirstReadableStream = new MyReadableStream();

// parsing this readable stream! :)
const allWords = [ ];
myFirstReadableStream.on('data', (data) => {
    console.log(`Receiving data: ${data}`);
    allWords.push(data);
});

myFirstReadableStream.on('end', () => {
    console.log(' ');
    console.log(allWords.join(' '));
});
```

Nos docs do próprio Node.js tem um exemplo de contador usando *readable stream*[[22]](https://nodejs.org/api/stream.html#stream_an_example_counting_stream).

[talk about read internally and push]

#### stream.Duplex


### Consumindo streams

## http e https

## querystring

## url

## net

## fs

## path

## crypto

## zlib

## cluster

## child_process


---


# Referência
