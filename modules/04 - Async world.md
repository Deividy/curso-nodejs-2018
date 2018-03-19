# 4) Programação assíncrona


Programação assíncrona é quando mandamos o código executar alguma ação e podemos mandar ele fazer alguma outra coisa enquanto executa essa ação.

Vamos pensar em um exemplo simples do mundo real, imagina que você tem que fazer compras, enquanto você esta indo no mercado está executando uma ação, porém, você não está limitado a isso, você pode ir fazendo outras coisas, como preparando a lista de compras no caminho ou lendo esse ebook, por outro lado, tem certas ações que dependem da volta do mercado, um exemplo seria preparar a comida.

Se parar para pensar um pouco, nossa mente funciona de forma assíncrona, quando pensamos em algo, pensamos na 'thread' principal nossa, mas muitas vezes deixamos esse pensamento de lado e vamos fazer outras coisas, mais tarde no dia voltamos com outras ideias para esse mesmo pensamento, isso é um modelo assíncrono de pensar.

Agora, no mundo dos computadores a programação assíncrona existe desde antes da era digital (sim, antes dos computadores)[[01]](http://www.i-programmer.info/programming/theory/6040-what-is-asynchronous-programming.html). <br />
A maioria das linguagens de programação assíncrona se apoia no conceito de thread, uma thread é basicamente um processo ou uma parte de código que é executada de forma independente, o kernel (C++)[[02]](https://stackoverflow.com/questions/28999765/how-does-the-linux-kernel-handle-asynchronous-i-o-aio-requests), por exemplo, consiste de várias threads, temos a thread da UI que é responsável por exibir informações na tela do seu dispositivo, uma outra para capturar input, e muitas outras threads responsáveis por acesso ao disco, acesso a network, garbage collector, etc.

O Node.js usa esse mesmo conceito internamente, temos apenas uma thread responsável por processar o código JavaScript, mas o Node gerencia outras threads internamente[[03]](https://www.quora.com/Is-Node-js-single-threaded), quando mandamos ler um arquivo no disco a thread principal JavaScript compila o código e manda para outra thread de acesso ao disco, e volta a procurar códigos JavaScript para compilar, e só quando aquele acesso ao disco terminar ele entra na fila para voltar para a thread principal.

A maior confusão na cabeça das pessoas está em entender que o código que está abaixo da chamada para uma função assíncrona não necessariamente será executado após aquela função e que um *callback não retorna valor nenhum*[[04]](https://stackoverflow.com/questions/25399725/nodejs-get-async-return-value-callback)

Veremos aqui o modelo padrão de *callback* para você entender bem como isso tudo funciona, depois passaremos para *Promise* e enfim para *async / await*.

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

Node.js criou um *anti-pattern* para cuidar de erros.  <br />
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

Se você executar o código acima, verá que mesmo estando fechado em um `try/catch` ainda temos uma uncaughtException[[05]](https://nodejs.org/api/process.html#process_event_uncaughtexception), ou seja, nosso catch *não funcionou*.

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

Para começar, quero deixar bem claro que **callback hell não é causado pelo estilo da programação do Node.js e sim por desenvolvedores que não entendem muito bem o que estão fazendo**. <br />
Eu quero dizer que não adianta nada você evitar programação com callback usando *Promises* ou até mesmo *async / await* se você não entender como callbacks funcionam, como o JavaScript funciona, seu código vai continuar um *inferno*, só vai mudar o nome dele.

Darei alguns exemplos de callback hell por aqui e resolverei eles usando próprios callbacks mas de uma forma que um **humano entenda**.

[callback-hell-1.js](../examples/module-4/callback-hell-1.js)
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

Podemos, porém, reescrever esse mesmo código da seguinte forma usando *functional programming*:

[callback-hell-1fix.js](../examples/module-4/callback-hell-1fix.js)
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

## Promises

# Referência
- [01] http://www.i-programmer.info/programming/theory/6040-what-is-asynchronous-programming.html
- [02] https://stackoverflow.com/questions/28999765/how-does-the-linux-kernel-handle-asynchronous-i-o-aio-requests
- [03] https://www.quora.com/Is-Node-js-single-threaded
- [04] https://stackoverflow.com/questions/25399725/nodejs-get-async-return-value-callback
- [05] https://nodejs.org/api/process.html#process_event_uncaughtexception
