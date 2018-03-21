# 4) Programação assíncrona
> "Programs must be written for people to read, and only incidentally for machines to execute." - Abelson / Sussman


Programação assíncrona é quando mandamos o código executar alguma ação e podemos mandar ele fazer alguma outra coisa enquanto executa essa ação.

Vamos pensar em um exemplo simples do mundo real, imagina que você tem que fazer compras, enquanto você esta indo no mercado está executando uma ação, porém, você não está limitado a isso, você pode ir fazendo outras coisas, como preparando a lista de compras no caminho ou lendo esse ebook, por outro lado, tem certas ações que dependem da volta do mercado, um exemplo seria preparar a comida.

Se parar para pensar um pouco, nossa mente funciona de forma assíncrona, quando pensamos em algo, pensamos na 'thread' principal nossa, mas muitas vezes deixamos esse pensamento de lado e vamos fazer outras coisas, mais tarde no dia voltamos com outras ideias para esse mesmo pensamento, isso é um modelo assíncrono de pensar.

Agora, no mundo dos computadores a programação assíncrona existe desde antes da era digital (sim, antes dos computadores)[[01]](http://www.i-programmer.info/programming/theory/6040-what-is-asynchronous-programming.html). <br />
A maioria das linguagens de programação assíncrona se apoia no conceito de thread, uma thread é basicamente um processo ou uma parte de código que é executada de forma independente, o kernel (C++)[[02]](https://stackoverflow.com/questions/28999765/how-does-the-linux-kernel-handle-asynchronous-i-o-aio-requests), por exemplo, consiste de várias threads, temos a thread da UI que é responsável por exibir informações na tela do seu dispositivo, uma outra para capturar input, e muitas outras threads responsáveis por acesso ao disco, acesso a network, garbage collector, etc.

O Node.js usa esse mesmo conceito internamente, temos apenas uma thread responsável por processar o código JavaScript, mas o Node gerencia outras threads internamente[[03]](https://www.quora.com/Is-Node-js-single-threaded), quando mandamos ler um arquivo no disco a thread principal JavaScript compila o código e manda para outra thread de acesso ao disco, e volta a procurar códigos JavaScript para compilar, e só quando aquele acesso ao disco terminar ele entra na fila para voltar para a thread principal.

A maior confusão na cabeça das pessoas está em entender que o código que está abaixo da chamada para uma função assíncrona não necessariamente será executado após aquela função e que um *callback não retorna valor nenhum*[[04]](https://stackoverflow.com/questions/25399725/nodejs-get-async-return-value-callback).

Veremos aqui o modelo padrão de *callback* para você entender bem como isso tudo funciona, depois passaremos para *Promise* e enfim para *async / await*.

<a id='callback'></a>
## Callback

O modelo mais simples para programação assíncrona é *callbacks*, callback é simplesmente uma função que será executada após completar uma ação, por exemplo:

[callback-1.js](../exercises/module-4/callback-1.js)
```javascript
function callback () { console.log('I will be the last'); }
setTimeout(callback, 1000);
console.log('I wil lbe first!');
```

Para algumas pessoas é muito dificil assimilar que o log `'I wil lbe first!'` sera mostrado antes do `'I will be the last'`, já que o callback foi definido antes, e chamado para executar antes.


Talvez esse código tenha parecido óbvio para você, vou dar um exemplo mais *tricky*:

[callback-2.js](../examples/module-4/callback-2.js)
```javascript
const fs = require('fs');

fs.readFile(process.argv[1], function (err, data) {
    if (err) throw new Error(err);

    console.log("I'm done.");
});
console.log("I'm just starting ;)");
```

Note que no exemplo acima usamos um `throw`, a idéia é "explodir" mesmo se rolar erro, e veja que *"I'm just starting ;)"* é mostrado antes do *"I'm done"*.

Isso acontece pois quando chamamos a função `readFile` o Node.js envia para a fila o nosso comando junto com o callback e continua a execução do script, apenas quando termina de ler o arquivo ele volta para o mundo JavaScript e executa nossa função.

Muitas pessoas acham que uma função de callback retorna algum valor, mas isso não acontece, um callback é apenas uma função que sera chamada quando termina de executar uma ação, ele *não retorna valor nenhum*, logo codigos como `const foo = callback()`, **estão errados**.


### Tratamento de erros em Node.js

Node.js criou um *anti-pattern* para cuidar de erros[[05]](https://www.joyent.com/node-js/production/design/errors).  <br />
Um erro pode ocorrer dentro de uma função assíncrona e temos que cuidar dele, simplesmente mandar um `try{ } catch { }` não funciona pois o código é executado em outra thread, considere o seguinte:

[callback-1.js](../examples/module-4/callback-1.js)
```javascript
try {
    function callback () { throw new Error('OH NO'); }
    setTimeout(callback, 1000);
} catch (ex) {
   console.log("i will never be hit :/")
}
```

Se você executar o código acima, verá que mesmo estando fechado em um `try/catch` ainda temos uma uncaughtException[[06]](https://nodejs.org/api/process.html#process_event_uncaughtexception), ou seja, nosso catch *não funcionou*.

Com isso em mente, surgiu o pattern de enviarmos o erro como o primeiro paramêtro da função e o retorno como segundo, considere o código abaixo:

```javascript

function callback (err, result) {
    if (err) return console.error(err);
    console.log(result);
}
setTimeout(() => {
    callback('OH NO');
}, 1000);

setTimeout(() => {
    callback(null, 'Oh good!');
}, 1000);
```

No primeiro `setTimeout` retornamos um erro para o callback e na segunda retornamos ok, esse é o padrão de callbacks do Node.js, o primeiro argumento de um callback é sempre um erro e os próximos a resposta que queremos.

### Callback hell

Para começar, quero deixar bem claro que **callback hell não é causado pelo estilo da programação do Node.js e sim por desenvolvedores que não entendem muito bem o que estão fazendo**[[07]](http://callbackhell.com/). <br />
Eu quero dizer que não adianta nada você evitar programação com callback usando *Promises* ou até mesmo *async / await* se você não entender como callbacks funcionam, como o JavaScript funciona, seu código vai continuar um *inferno*, só vai mudar o nome dele.

Por exemplo, considere o seguinte *inferno*:

[callback-hell.js](../examples/module-4/callback-hell.js)
```javascript
// welcome to CALLBACKHELL! :)
const fs = require('fs');

function readAndProcessFiles (callback) {
    fs.readFile('file1.txt', function (err, data) {
        if (err) return callback(err);
        
        const contentFile1 = data.toString();
        fs.readFile('file2.txt', function (err, data) {
            if (err) return callback(err);
            
            const contentFile2 = data.toString();
            
            fs.readFile('file3.txt', function (err, data) {
                if (err) return callback(err);
                
                const contentFile3 = data.toString();
                const allContent = contentFile1 + contentFile2 + contentFile3;
                
                fs.writeFile('all-files-together.txt', allContent, function (err) {
                    if (err) return callback(err);
                    callback(null, allContent);
                });
           });
        });
    });
}

readAndProcessFiles(function (err, allContent) {
    if (err) throw new Error(err);
    console.log(allContent);
});
```

Note como o código acima toma uma forma de *"pirâmide deitada"*, mesmo fazendo um processamento simples, fica muito difícil de ler e entender o que esta acontecendo, e pode ficar pior caso o desenvolvedor adicione mais arquivos ou algum outro processamento assíncrono.

Podemos, reescrever esse mesmo código da seguinte forma usando *functional programming*:

[callback-hell-fix.js](../examples/module-4/callback-hell-fix.js)
```javascript
const fs = require('fs');

// recursive and not a pure function
// this will change the filesToProcess array
function concatAllFiles (filesToProcess, currentData, callback) {
    fs.readFile(filesToProcess.shift(), (err, data) => {
        if (err) return callback(err);

        currentData += data.toString();

        // no more files to process, just return
        if (filesToProcess.length === 0) {
            return callback(null, currentData);
        }

        concatAllFiles(filesToProcess, currentData, callback);
    });
}

function readAndProcessFiles (callback) {
    const filesToProcess = [ 'file1.txt', 'file2.txt', 'file3.txt' ];
    const startContent = '';

    concatAllFiles(filesToProcess, startContent, (err, allContent) => {
        if (err) return callback(err);

        fs.writeFile('all-files-together.txt', allContent, (err) => {
            callback(err, allContent);
        });
    });
}

readAndProcessFiles(function (err, allContent) {
    if (err) throw new Error(err);

    console.log(allContent);
}
```

Note como o código acima faz **exatamente a mesma coisa** que o anterior só que é mais **flexível** e **claro**, podemos adicionar mais arquivos sem nenhuma modificação na nossa função de `concatAllFiles`.

<a id='promise'></a>
## Promise

Uma `Promise` é um objeto que pode produzir um valor no futuro, esse valor pode ser resolvido ou não. Uma promise pode estar em um dos 3 estágios: *fulfilled*, *rejected* ou *pending*[[08]](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261).

- `fullfiled` é quando chamamos a fução `resolve()` de uma `Promise`.
- `rejected` é quando chamamos a fução `reject()` de uma `Promise`.
- `pending` é quando a `Promise` ainda não foi `fullfiled` ou `rejected`.

O padrão de promises foi definido pela especificação da comunidade Promises/A+[[09]](https://promisesaplus.com/implementations).

Uma promise retorna um objeto com os métodos `.then` e `.catch`, assim que executamos o `new Promise()` a promise é executada, caso ocorra algum erro na promise o método `.catch` será chamado, isso é parecido com executarmos um código dentro de um bloco `try/catch`.

[promises.js](../examples/module-4/promises.js)

```javascript
const wait = (secs) => {
    return new Promise((resolve, reject) => {
        if (secs > 4) return reject("Can't wait 4 secs!");
        setTimeout(resolve, secs * 1000);
    });
}

console.log('waiting 2 secs...');
wait(2).then(() => console.log('waited 2 secs'));

console.log("Trying to wait 5 secs...");
wait(5)
    .then(() => console.log("I will never work :("))
    .catch((err) => {
        console.error("Error in promise:");
        console.error(err);
    });
```

Note que a função `wait` retorna um `new Promise()`, esse é o padrão ao usar promises, você tem que retornar uma instância de `Promise`, note também que a chamada de `new Promise((resolve, reject) => { })` recebe uma função que aceita dois argumentos (que também são funções), são os métodos de `resolve` e `reject`. 

Usamos esses dois métodos quando queremos resolver a promise, podemos dizer que a promise foi bem sucedida chamando a primeira função *(`resolve`)* ou que falhou chamando a segunda função *(`reject`)*.

Observe que o paramêtro para uma `new Promise` é apenas uma função, e poderiamos ter chamado seus argumentos de qualquer coisa, a seguinte função tem exatamente o mesmo efeito do exemplo anterior:

```javascript
const wait = (secs) => {
    function myPromiseFn (resolvedor, rejeitor) {
        if (secs > 4) return rejeitor("Can't wait 4 secs!");
        setTimeout(resolvedor, secs * 1000);
    }
    
    return new Promise(myPromiseFn);
};
```

Podemos inclusive englobar uma função, que originalmente usa callback, em uma promise:

```javascript
const fs = require('fs');

const readFilePromise = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, function (err, data) {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

readFilePromise(process.argv[1]).then((data) => {
    console.log("I'm done.");
});
console.log("I'm just starting ;)");
```

Note no exemplo acima que o efeito é o mesmo que usando o callback, o log *"I'm just starting ;)"* é mostrado antes do *"I'm done."*.

Para um maior entendimento de promises, considere o seguinte exemplo:

```javascript
const promiseTest = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done!'), 100);
});

console.log(promiseTest); // Promise { <pending> }
promiseTest.then(() => {
    console.log(promiseTest); // Promise { 'done' }
});
console.log(promiseTest); // Promise { <pending> }

const promiseTest2 = new Promise((resolve, reject) => {
    setTimeout(() => reject('fail!'), 100);
});

promiseTest2.catch(() => {
    console.log(promiseTest2); // Promise { <rejected> 'fail!' }
});

const promiseTest3 = new Promise((resolve, reject) => {
    resolve('Learning promises is fun :P');
});
console.log(promiseTest3); // Promise { 'Learning promises is fun :P' }
promiseTest3.then((value) => {
    console.log(value); // "Learning promises is fun :P"
});
```

No exemplo acima, iniciamos duas promises e logamos seus estados, observe que até chamarmos o método `resolve` ou `reject` ela continua com o estado de `<pending>`, enquanto a `promiseTest3` já tem o seu estado *(`fullfiled`)* logo de inicio, pois não tem nenhum timeout e chamamos o método `resolve()` assim que executamos o `new Promise(...)`, repare também que mesmo a promise estando *fullfiled* o método `.then` e chamado.

### Promise hell

Importante dizermos que do mesmo jeito que existe callback hell, existe o promise hell. 

Como vimos, callback hell acontece por programadores que não estão familiarizados com a linguagem, o mesmo acontece com promises[[10]](https://medium.com/@pyrolistical/how-to-get-out-of-promise-hell-8c20e0ab0513).

[promise-hell.js](../examples/module-4/promise-hell.js)
```javascript
// welcome to PROMISE HELL :D
const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise  = util.promisify(fs.writeFile);

function readAndProcessFiles () {
    return new Promise((resolve, reject) => {
        readFilePromise('file1.txt').then((data) => {
            const contentFile1 = data.toString();

            readFilePromise('file2.txt').then((data) => {
                const contentFile2 = data.toString();

                readFilePromise('file3.txt').then((data) => {
                    const contentFile3 = data.toString();
                    const allContent = contentFile1 + contentFile2 + contentFile3;

                    writeFilePromise('all-files-together', allContent)
                        .then(() => resolve(allContent))
                        .catch(reject);
                }).catch(reject);
            }).catch(reject);
        }).catch(reject);
    });
}

readAndProcessFiles().then((allContent) => {
    console.log(allContent);
}).catch((err) => {
    throw new Error(err);
});
```

Note no exemplo acima o uso de `util.promisify`, essa é a primeira vez que vemos esse método em nosso curso, falaremos mais a respeito na próxima sessão.

Observe o quão hell e complicado esse código ficou, por mais que ele funcione, ele está feio e difícil de ler, podemos reescrever ele da seguinte forma:

[promise-hell-fix.js](../examples/module-4/promise-hell-fix.js)
```javascript
const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise  = util.promisify(fs.writeFile);

function readAndProcessFiles () {
    let allContent = '';

    return new Promise((resolve, reject) => {
        return readFilePromise('file1.txt')
                    .then((data) => allContent += data)
                    .then(() => readFilePromise('file2.txt'))
                    .then((data) => allContent += data)
                    .then(() => readFilePromise('file3.txt'))
                    .then((data) => allContent += data)
                    .then(() => writeFilePromise(
                        'all-files-together.txt',
                        allContent
                    ))
                    .then(() => resolve(allContent))
                    .catch(reject);
    });
}


readAndProcessFiles().then((allContent) => {
    console.log(allContent);
}).catch((err) => {
    throw new Error(err);
}
```

### Promisify

Como vimos nos exemplos anteriores, o módulo util[[11]](https://nodejs.org/api/util.html) nos provém uma função chamada `promisify()` que é útil para transformarmos uma função com callback em uma *promise*.

Ela assume que o último argumento da função é um callback e cria uma promise em volta disso, similar com o exemplo que fizemos antes de usar o *promisify*, caso queira saber exatamente como ela funciona, abra o repositório do Node.js e leia a função[[12]](https://github.com/nodejs/node/blob/1d2fd8b6/lib/internal/util.js#L295-L333), aconselho sempre procurar direto na fonte e ver como as pessoas implementaram determinada função, isso te dara um dominio muito maior da tecnologia além de espantar de vez o medo de códigos, pode ser a diferença entre você realmente entender um problema (e resolver) ou ficar estagnado. *;)*

<a id='generators'></a>
## Generators

Agora que já vimos em JavaScript moderno o básico de generators, vimos como callbacks funcionam, entendemos promises, está na hora de mostrarmos como generators podem trabalhar junto com promises para *simular* um modelo mais síncrono de programação.

Considere o seguinte exemplo:

[generators.js](../examples/module-4/generators.js)
```javascript
function asyncify (generatorFn) {
    const myIterator = generatorFn();

    // recursive function that continue to feed itself
    // yielded Promises until there are none left
    const runNext = ({ value, done }) => {
        if (done) return;
        value.then(() => runNext(myIterator.next()))
    };

    runNext(myIterator.next());
}

const wait = (secs) => {
    return new Promise((resolve, reject) => {
        if (secs > 4) return reject("Can't wait 4 secs!");
        setTimeout(resolve, secs * 1000);
    });
};

asyncify(function* () {
    console.log("WAIT 1 sec...");
    yield wait(1);

    console.log("WAIT 2 secs...");
    yield wait(2);

    console.log("WAIT 1 sec...");
    yield wait(1);
});
```

A função de `asyncify` definida acima (por *silesky*[[14]](https://gist.github.com/silesky/5c43ad2964054579ba202a65294859cd#file-blog_asyncify-js)) nos da uma idéia de como podemos usar generators e promises para pausar e continuar o flow.

Porém, esse approach tem alguns problemas óbvios como *error handling* e *return values*:

```javascript
// what about return?
const returnValuePromise = () => {
    return new Promise((resolve, reject) => resolve('value'));
};
asyncify(function* () {
    // return values dont work in our cool model :x
    console.log(yield returnValuePromise());
});

// what about an error?
const errorPromise = () => {
    return new Promise((resolve, reject) => reject(new Error('bum!')));
}
asyncify(function* () {
    // Well, with our functions errors are gone, unhandled promise rejections :x
    try {
        console.log(yield errorPromise());
    } catch (ex) {
        console.error(ex);
    }
}
```

Precisamos de algo mais estável, estamos perto de algo muito bom...

<a id='async-await'></a>
## async / await

*async / await* to the rescue! :D

Modelo mais limpo de programação assíncrona, a implementação atual de async / await no V8 é com base no uso de promises e generators[[13]](https://stackoverflow.com/questions/46908575/async-await-native-implementations), lembra um pouco com o que vimos anteriormente, mas em um nível mais baixo.

Toda promise pode ser chamada com `await promise` no lugar de chamarmos `.then()` podemos usar o retorno direto, e no lugar de `.catch()`, podemos colocar um `try/catch` em volta da função *(lembra que para callbacks isso não funcionava? VIVA `await`!)*.

Vamos reescrever o exemplo de promises em async/await para termos uma ideia:

[async-await.js](../examples/module-4/async-await.js)
```javascript
const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise  = util.promisify(fs.writeFile);

async function readAndProcessFiles () {
    let allContent = '';

    allContent += await readFilePromise('file1.txt');
    allContent += await readFilePromise('file2.txt');
    allContent += await readFilePromise('file3.txt');

    await writeFilePromise('all-files-together.txt', allContent);
    return allContent;
}

(async () => {
    try {
        console.log(await readAndProcessFiles());
    } catch (ex) {
        console.error(ex);
    }
}
```

Note no exemplo acima que ele faz exatamente a mesma coisa que os exemplos anteriores, só que com *menos código*, sem contar que fica claro o que está acontecendo.

Observe que tivemos que definir uma função que chama a sí própria como `async`, isso é necessário pois só podemos usar a *keyword* `await` dentro de uma função declarada como `async`, se tentassemos usar `await readAndProcessFiles()` sem a async function, receberiamos um erro `SyntaxError: Unexpected identifier`.

Mais uma coisa legal de *async functions* é que agora nossas funções assíncronas **podem retornar valor**, ao invés de chamarmos o callback, podemos simplesmente usar o `return value` igual uma função síncrona. \o/

async functions em uma class:

```javascript
class RpgGame {
    constructor () {
        this.players = [ ];
    }

    async loadPlayers () {
        const players = await readFilePromise('players.txt');
        this.players = JSON.parse(players.toString());
    }

    async savePlayers () {
        const playersString = JSON.stringify(this.players);
        await writeFilePromise('players.txt', playersString);
    }

    async addPlayer (playerName) {
        this.players.push(playerName);
        await this.savePlayers();
    }
}

(async function () {
    const rpg = new RpgGame();

    try {
        await rpg.loadPlayers();
    } catch (ex) {
        // maybe file is corrupt, we want to keep the flow even if we can't
        // load the players, so we'll just log here
        console.error(ex);
    }

    await rpg.addPlayer(`speedy, force ${new Date().getTime()}`);
    console.log(rpg.players);
})();
```

**Curiosidade**, como async functions no final se tornam promises, podemos chamar uma função `async` do mesmo jeito que chamamos promises:

```javascript
async function testAsyncWithPromise () {
    return 'COOL';
}

testAsyncWithPromise().then((val) => console.log(val));
```
---

<a id='exercises'></a>
## Exercícios

### 1) Usando apenas *callbacks*, **não** use *promises* ou *async / await* para esse exercício, fuja do callback hell abaixo:

```javascript
const fs = require('fs');

function crazyTimeouts (callback) {
    setTimeout(() => {
        console.log('ok, we waited 100ms');
        console.log('waiting more 200ms ...');

        setTimeout(() => {
            console.log('now, waiting 300ms...');

            setTimeout(() => {
                console.log("PHEW, now we'll read us :)");

                fs.readFile(process.argv[1], (err, res) => {
                    if (err) return callback(err);
                    console.log('now, write us (crazy?) :)');

                    fs.writeFile(process.argv[1], res, (err) => {
                        if (err) return callback(err);
                        callback(null, res);
                    });
                });
            }, 300);
        }, 200);
    }, 100);
}

crazyTimeouts((err, res) => {
    if (err) throw new Error(err);
    console.log(res.toString());
}
```

### 2) Escreva a função `sleep` usando `async`, ela deve espera N secs e continuar a execução do script, de modo que a mensagem *"DONE :)"* seja mostrada após 5 segundos.

```javascript
async function sleep (secs) {
    // ...
}

async function main () {
    console.log("Hello, I will sleep for 5 secs now...");
    
    await sleep(5);
    
    console.log("DONE :)");
}

main();
```

---

# Referência
- [01] http://www.i-programmer.info/programming/theory/6040-what-is-asynchronous-programming.html
- [02] https://stackoverflow.com/questions/28999765/how-does-the-linux-kernel-handle-asynchronous-i-o-aio-requests
- [03] https://www.quora.com/Is-Node-js-single-threaded
- [04] https://stackoverflow.com/questions/25399725/nodejs-get-async-return-value-callback
- [05] https://www.joyent.com/node-js/production/design/errors
- [06] https://nodejs.org/api/process.html#process_event_uncaughtexception
- [07] http://callbackhell.com/
- [08] https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261
- [09] https://promisesaplus.com/implementations
- [10] https://medium.com/@pyrolistical/how-to-get-out-of-promise-hell-8c20e0ab0513
- [11] https://nodejs.org/api/util.html
- [12] https://github.com/nodejs/node/blob/1d2fd8b6/lib/internal/util.js#L295-L333
- [13] https://stackoverflow.com/questions/46908575/async-await-native-implementations
