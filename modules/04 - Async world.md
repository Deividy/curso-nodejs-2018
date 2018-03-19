# 4) Programação assíncrona


Programação assíncrona é quando mandamos o código executar alguma ação e podemos mandar ele fazer alguma outra coisa enquanto executa essa ação.

Vamos pensar em um exemplo simples do mundo real, imagina que você tem que fazer compras, enquanto você esta indo no mercado está executando uma ação, porém, você não está limitado a isso, você pode ir fazendo outras coisas, como preparando a lista de compras no caminho ou lendo esse ebook, por outro lado, tem certas ações que dependem da volta do mercado, um exemplo seria preparar a comida.

Se parar para pensar um pouco, nossa mente funciona de forma assíncrona, quando pensamos em algo, pensamos na 'thread' principal nossa, mas muitas vezes deixamos esse pensamento de lado e vamos fazer outras coisas, mais tarde no dia voltamos com outras ideias para esse mesmo pensamento, isso é um modelo assíncrono de pensar.

Agora, no mundo dos computadores a programação assíncrona existe desde antes da era digital (sim, antes dos computadores). <br />
A maioria das linguagens de programação assíncrona se apoia no conceito de thread, uma thread é basicamente um processo ou uma parte de código que é executada de forma independente, o kernel (C++), por exemplo, consiste de várias threads, temos a thread da UI que é responsável por exibir informações na tela do seu dispositivo, uma outra para capturar input, e muitas outras threads responsáveis por acesso ao disco, acesso a network, garbage collector, etc.

O Node.js usa esse mesmo conceito internamente, temos apenas uma thread responsável por processar o código JavaScript, mas o Node gerencia muitas outras threads internamente, quando mandamos ler um arquivo no disco a thread principal JavaScript compila o código e manda para outra thread de acesso ao disco, e volta a procurar códigos JavaScript para compilar, e só quando aquele acesso ao disco terminar ele entra na fila para voltar para a thread principal.

A maior confusão na cabeça das pessoas está em entender que o código que está abaixo da chamada para uma função assíncrona não necessariamente será executado após aquela função.

Veremos aqui o modelo padrão de *callback* para você entender bem como isso tudo funciona, depois passaremos para *Promise* e enfim para *async / await*.

### Callback

Uma forma de tirarmos proveito da programacao assincrona e mandar uma funcao que sera executada quando terminar o processamento, esse conceito eh chamado de callback, considere o seguinte codigo:

```javascript

function callback () { console.log('ready!'); }
setTimeout(callback, 1000);
```

Aqui definimos um callback que sera executado depois de um segundo. <br />
A comunidade Node.js criou um (anti)pattern para cuidar de erros, como um erro pode ocorrer dentro de uma funcao assincrona temos que cuidar dele, e simplesmente mandar um `try{ } catch { }` nao funciona pois o codigo eh executado em outra thread, e o try catch vai pegar excessoes apenas no codigo local, considere o seguinte:

```javascript
try {
function callback () { throw new Error('OH NO'); }
  setTimeout(callback, 1000);
} catch (ex) {
 console.log("i will never be hit :/"
}
```

Se voce executar o codigo acima, ira ver que mesmo tendo fechado em um try/catch nosso codigo ainda levamos uma uncaughtException[[ref]](ref), ou seja, nosso catch nao funcionou. <br />
Com isso em mente, surgiu o pattern de enviarmos o erro como o primeiro parametro da funcao e o retorno como segundo, considere o codigo abaixo:

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

No primeiro `setTimeout` retornamos um erro para o callback e na segunda retornamos ok, esse é o padrao da comunidade Node.js e dos modulos internos do node, primeiro argumento de um callback eh sempre um erro e os proximos a resposta que queremos, isso gera e plorifera problemas na cabeca dos devs, muitos devs esquecem de cuidar do primeiro argumento e consequentemente ficam com erros 'perdidos' por seu script. <br />

#### Callback hell

O famoso callback hell acontece nao pelo paradigma da linguagem e de callbacks mas sim pelo fato dos desenvolvedores nao entenderem muito ebm o codigo que estao escrevendo. Quero frisar isso **callbackhell acontece pelo fato de desenvolvedores nao entenderem muito bem a linguagem e o paradigma**. <br />
Digo isso pois, nao adianta nada voce achar que o problema do callback hell esta no callback e comecar a usar promises ou ateh mesmo o async / await, seu codigo vai continuar um *inferno*.

Existe muito codigo bom e facil de ler usando callback, o proprio core do node usa extensivamente e é muito bem escrito [[ref]](#ref).

Vou dar um exemplo e uma resolucao de um callback hell:

```javascript

```

> Exercicio:
> foo

### Promise

https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261

Uma definicao simples sobre promise eh: Promise eh um objeto em javascript que pode produzir um valor no futuro, um valor resolvido ou nao resolvido (rejeitado ou erro). Tipo uma promessa mesmo. :)


### async / await

https://javascript.info/async-await

### Promisify com async / await

Agora que ja sabemos o que eh callback, promise e async await, veremos uma forma de transformar callbacks em promises e com isso usarmos com async await.

O Node.js provem o module util[[ref]](#ref), que tem um metodo chamado `promisify`, ele basicamente transforma uma funcao com o padrao de callback(err, value) em uma promise, podemos usar esse meotod para transformar funcoes em promises ou podemos fazer na mao, darei exemplo das duas formas:

```javascript
...
```
