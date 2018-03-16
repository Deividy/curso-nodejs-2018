Curso Node.js 2018
===

Welcome!

Esse curso tem como objetivo levar o conhecimento da história do Node.js, ensinar conceitos básicos do ecossistema, apresentar os modulos internos e passar uma perspectiva dos modulos e da comunidade atual do Node.js.

Ao finalizar o curso você tera conhecimentos suficientes para construir um processo em Node.js, um módulo, um http server e/ou qualquer outro aplicativo que você queira usando Node.js.

### Motivação

Muitos cursos e materiais sobre Node.js hoje em dia abordam apenas frameworks e modulos da comunidade, com esse curso tenho a missão de levar para você o conhecimento interno, mostrando o que é possível ser feito e como sobreviver na selva `npm`. <br />
Sem firulas, sem compilar JavaScript, só o bom e velho JS e nosso amigo Node.js, tudo com muita prática e mão na massa. =)


## Pré requisitos
Conhecimento básico em JavaScript, sistemas operacionais e terminal (ou cmd).

---

<a id='index'></a>
## Índice

1. [Introdução](#introduction)
   - [JavaScript](#introduction-javascript)
   - [ECMAScript](#introduction-ecmascript)
   - [Node.js](#introduction-nodejs)
   - [Code standards](#introduction-codestandards)
2. [Instalando o Node.js](#getting-ready)
   - [macOS](#getting-ready-macos)
   - [Windows](#getting-ready-windows)
   - [Linux](#getting-ready-linux)
3. [JavaScript moderno](#newjs)
   - [Escopo de variáveis](#newjs-variableescope)
   - [var, const e let](#newjs-constletvar)
   - [Arrow functions](#newjs-arrowfunctions)
   - [Array iterables](#newjs-arrayiterables)
   - [Iterables e Iterators]()
   - [Destructuring]()
   - [Generators]()
   - [Stay foolish, stay hungry]()
4. [Funções assíncronas](#async-functions)
   - [Callback]()
   - [Promise]()
   - [async / await]()
   - [Promisify]()
5. [Gerenciamento de modulos]()
   - [História e estado atual]()
   - [npm]()
   - [npx]()
   - [Como criar um módulo]()
6. [Modulos internos]()
   - [util]()
   - [events]()
   - [stream]()
   - [http e https]()
   - [querystring]()
   - [url]()
   - [net]()
   - [fs]()
   - [path]()
   - [crypto]()
   - [zlib]()
   - [cluster]()
   - [child_process]()
7. [Modulos da comunidade]()
   - [Situação atual]()
   - [express]()
   - [hapijs]()
   - [jsonwebtoken]()
   - [bcrypt]()
   - [loopback]()
   - [mongo]()
   - [outros modulos]()
   - [criando um npm module]()
8. [Debugging]()
   - [Debugger]()
   - [Inspector (experimental)]()
9. [Produção]()
   - [O que eu preciso saber?]()
   - [Nginx? Vagrant?]()
   - [Opções para manter o Node.js em pé]()
   - [Deploy free]()
   - [Deploy profissa]()
10. [Conclusão]()
11. [Referência](#ref)

---

<a id="introduction"></a>
## 1) Introducão

<a id="introduction-javascript"></a>
### JavaScript

JavaScript (ou js) no começo da web era usado apenas para simples validações de formulário e para abrir (chatos) popups e com isso era denegrido por profissionais da área, já que era um pessoal mais leigo (famosos sobrinhos) que usavam para esse tipo de ação. <br />
Quando foi desenvolvido, há mais de 20 anos atrás, teve outros nomes como Mocha e LiveScript. LiveScript foi o primeiro nome oficial da linguagem no Netscape 2.0, em setembro de 1995, desenvolvido originalmente por Brendan Eich[[1]](#ref-1).
Em dezembro desse mesmo ano teve o nome trocado por JavaScript no lançamento da versão 2.0B3 do Netscape, em um anúncio conjunto com a Sun Microsystems, muitos acreditam que o nome foi uma sacada de marketing para atrair o público do recém-lançado Java.

Em novembro de 1996 a Netscape anunciou que tinha submetido o JavaScript para Ecma internacional como candidato a padrão industrial, o que resultou na versão padronizada ECMAScript.

A Microsoft em 1996 lançou o Internet Explorer 3.0 e nele foi incluído o JScript, que mesmo tendo o nome levemente diferente do JavaScript ele segue a implementação ECMAScript[[2]](#ref-2).

Em meados de 1999, a Microsoft criou o XMLHTTP ActiveX Object[[3]](#ref-3) para o acesso a web do Outlook, Mozilla rapidamente implementou o XMLHttpRequest em seu navegador, porém, foi o Gmail do Google o primeiro site a usar extensivamente o XMLHttpRequest, isso em 2004[[4]](#ref-4).<br />
Jesse James Garrett (criador do Adaptive Pattern), definiu em 2005 o acrônimo AJAX em seu post histórico[[5]](#ref-5). A partir disso, JavaScript começou a se formar não apenas uma linguagem padrão de browsers e algo chato para abrir popups, mas uma tecnologia que podia criar uma interação e experiência incrível para interfaces de usuários. <br />
Começaram a surgir muitos frameworks e bibliotecas com foco na experiência do usuário, jQuery foi criado em 2006 por John Resig[[6]](#ref-6) e rapidamente se espalhou para a maioria dos sites e sistemas para a web da época. <br />
Foi nessa época que começaram a usar o JavaScript fora do browser, e em 2009 o projeto CommonJS[[7]](#ref-7) foi fundado com o objetivo de especificar uma biblioteca padrão para desenvolvimento JavaScript fora do navegador.

<a id="introduction-ecmascript"></a>
### ECMAScript

ECMAScript não é uma linguagem de programação, e sim especificações e padrões para a implementação de uma linguagem de scripting[[8]](#ref-8). Imagine o ECMAScript como o padrão que os desenvolvedores tem que seguir para a implementação do JavaScript (ou JScript se você estiver usando Internet Explorer[[9]](#ref-9)).<br />
As primeiras versões não foram seguidas bem a risca e cada empresa decidiu implementar boa parte da linguagem em seus próprios padrões, inclusive a versão 4 do ECMAScript foi abandonada por questões políticas e por sua especificação ter ficado complexa demais[[10]](#ref-10).

Apenas em 2011, com a versão 5.1 do ECMAScript, que essas grandes empresas começaram a se alinhar em relação ao padrão ECMA.<br />
A versão 6 de 2015, oficialmente ECMA2015[[11]](#ref-11), introduziu um grande avanço com uma nova sintaxe, classes, módulos, for/of loops, além de algumas features mais parecidas com a linguagem de programação Python como generators, arrow functions, binary data, typed arrays, entre muitas outras features[[12]](#ref-12). <br />
Teve mais uma versão em Junho de 2016 (ECMAScript 7) e outra em Junho de 2017 (ECMAScript 8), agora aguardamos a versão 9[[13]](#ref-13).

<a id='introduction-nodejs'></a>
### Node.js

Google, em 2008, lançou, para o seu navegador Google Chrome, o motor para processamento JavaScript Chrome V8[[14]](#ref-14) e decidiu fazer disso um código aberto onde qualquer pessoa na internet poderia contribuir para sua evolução.<br />
Em 2009, Ryan Dahl juntou a tecnologia de processamento JavaScript V8 com a libevent[[15]](#ref-15)] (hoje em dia libuv[[16]](#ref-16)] para criar o Node.js, ele apresentou sua nova tecnologia na JSConf de 2009[[17]](#ref-17).<br />
O mundo JavaScript nunca mais foi o mesmo, Node.js se espalhou e se tornou viral. Hoje em dia é usado em diversas empresas[[18]](#ref-18) dos mais variados nichos pelo mundo todo, inclusive existe um pessoal criando hardwares baseados em JavaScript[[19]](#ref-19).<br />
Node.js provém uma maneira fácil de criar um servidor para a web com grande poder de escalabilidade que pode rodar em quase qualquer sistema operacional, além disso é possível criar variados tipos de aplicativos, não apenas HTTP servers, o que ajudou sua proliferação.

[img e testo explicando funcionamento interno]

Na metade de 2014 o projeto Node.js deu uma estagnada, isso por que alguns membros do core estavam insatisfeitos com o rumo que a Joyent (patrocinadora do projeto inicialmente) queria levar para o projeto, alguns dos desenvolvedores tentaram conversar com a empresa, foi dai que surgiu o projeto 'Node forward' [[20]](#ref-20), mas Fedor Indutny[[21]](#ref-21) se cansou de tanta conversa e decidiu criar um fork do projeto Node.js, chamando o fork de io.js[[22]](#ref-22), depois de longas conversas e releases separadas, mikeal criou um Reconciliation Proposal[[23]](#ref-23) que conseguiu enfim mergear o io.js de volta no Node.js[[24]](#ref-24)[[25]](#ref-25)

<a id='introduction-codestandards'></a>
### Code standards
Agora que já vimos a historia do ecosistema, está na hora de definirmos um padrão de codigo para o curso.

Usaremos um padrão de 4 espaços no lugar de tab, e mesmo não sendo necessários, usaremos ponto e vírgula (*;*) no final de cada *statement* ou *expression*, usaremos parênteses em todos os argumentos de funções, nosso limite de column é *80* e iremos sempre preferir ser mais claro do que minimalista.

Os códigos e comentários dentro de códigos serão escritos em *inglês*, pois esse é o padrão mundial e você como desenvolvedor em 2018 tem que no mínimo poder ler e escrever códigos em inglês.

O `.eslintrc` e `.vimrc` usados podem ser encontrados na referência([[26]](#ref-26), [[30]](#ref-30)) e na [raiz desse repositorio](#ref-26).

---

<a id="getting-ready"></a>
## 2) Instalando o Node.js

<a id="getting-ready-macos"></a>
### macOS

Para instalar no macOS você pode simplesmente acessar o site https://nodejs.org/en/download/ e baixar o instalador para macOS.

Aconselhamos você a tentar um gerenciador de versões em sua maquina local, isso pois você conseguira trocar de uma versão do Node.js para outra facilmente, aconselhamos você a seguir os passos de instalação do [nvm](https://github.com/creationix/nvm#installation)[[27]](#ref-27).<br />
Depois de instalado você podera executar ele da seguinte forma:

[carece de dados]
[carece de screenshot]

<a id="getting-ready-windows"></a>
### Windows

Para instalar no Windows você pode simplesmente acessar o site https://nodejs.org/en/download/ e baixar o instalador para Windows.

Depois de instalado você podera executar ele da seguinte forma:


[carece de dados]
[carece de screenshot]

<a id="getting-ready-linux"></a>
### Linux

Para instalar no Linux você pode simplesmente acessar o site https://nodejs.org/en/download/ e baixar o instalador para Linux.

Aconselhamos você a tentar um gerenciador de versões em sua maquina local, isso pois você conseguira trocar de uma versão do Node.js para outra facilmente, aconselhamos você a seguir os passos de instalação do [nvm](https://github.com/creationix/nvm#installation)[[27]](#ref-27).

Depois de instalado você podera executar ele da seguinte forma:


[carece de dados]
[carece de screenshot]

---

<a id="newjs"></a>
## 3) JavaScript moderno

Nessa sessão iremos ver novas funcionalidades do JavaScript, não iremos passar pelo básico e assumimos que você tenha um pré conhecimento em JavaScript, saiba diferenças de statement vs expression, como usar ifs, etc.

Caso você não tenha nenhum conhecimento prévio com JavaScript, pare agora esse curso e vá estudar um pouco a respeito, algumas fontes podem ser encontradas na referência [[28]](#ref-28), [[29]](#ref-29).

<a id='newjs-lexicalscope'></a>
### Escopo de variáveis em JavaScript

Existem diversas maneiras de definir um escopo em JavaScript. <br/>
Os nomes dos escopos serão citados em inglês para você ja ir se acostumando (caso ainda nao esteja) :)

Tem uma pergunta no stack overflow com muitas respostas legais[[31]](#ref-31). <br />
Irei sumarizar alguns tipos de escopo:

#### Global scope

O escopo global, em Node.js, significa uma váriavel setada no objeto `global`, você pode iniciar uma váriavel global da seguinte forma:

`foo.js`
```javascript
global.foo = 'speedyforce'

require('./bar');
```

`bar.js`
```javascript
console.log(foo);
```

```shell
node foo.js # will print: 'speedyforce'
```

#### Local scope

No JavaScript, toda função (com excessão de arrow functions), cria um novo lexical scope[[32]](#ref-32), e isso é o que conhecemos como *local scope*. <br />
Algo peculiar é que váriaveis (`var`) e funções de um local scope são *hoisted*[[33]](#ref-33) no topo de seu escopo.

Entendo que a primeira vista essas palavras parecem bem complicadas, mas com alguns exemplos fica mais simples. <br />
Considere o seguinte codigo:

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

#### Block scope

Block scope são escopos criados por qualquer `{}`, com a obvia excessao de funçoes que vimos em local scope. <br />
Por exemplo, podemos definir um block scope da seguinte forma:
```javascript
{
  console.log("I'm in a block scope!");
}
```

Isso é um block scope, agora qualquer `if (true) { }` ou `for () { }` tem um block scope, uma regra simples de lembrar é: *Se temos um `{}` definicao nao e uma `function` ou `class` isso e um block scope*.

`let` e `const` sao variaveis de block scope, enquanto `var` e variavel de local scope. <br />
Na pratica, isso significa que uma var definida em um block scope eh visivel fora do block scope, enquanto let e const nao.

Considere o seguinte codigo:

```javascript

for (var i = 0; i < 5; ++i) {}
console.log(i) // 5

for (let n = 0; n < 5; ++n) {}
console.log(n) // TypeError
```

#### Closure

Closure pode ser um nome meio estranho a primeira vista, mas significa algo muito simples. <br />
Uma closure e uma funcao que tem acesso a uma variavel que nao e exposta, por exemplo:

```
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

<a id='newjs-constletvar'></a>
### var, const e let
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
### Arrow functions
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
### Array iterables

No spec do ECMA5[[ref]](#ref) foram introduzidos novos array iterables como `forEach`, `reduce` e `map`. São funcoes bem simples que iteram um array, todas elas recebem uma funcao de iterable que eh passada por todos os itens do array, veremos alguns exemplos:

```javascript

const myArray = [ 1, 2, 3, 4, 5 ];

myArray.forEach((item) => console.log(item)); // 1, 2, 3, 4, 5

const newArray = myArray.map((item) => item + 1); // [ 2, 3, 4, 5, 6 ]

const total = myArray.reduce((accumulator, item) => accumulator + item) // 10
```

#### Iterables e iterators

http://2ality.com/2015/02/es6-iteration.html


#### Destructuring

http://exploringjs.com/es6/ch_destructuring.html


#### Generators

http://exploringjs.com/es6/ch_generators.html


#### Stay foolish, stay hungry

Continue faminto! A especificacao ECMA vem evoluindo rapido, em menos de 5 anos mudou MUITA coisa, entao nao pare de estudar e aprender, para esse capitulo deixarei um desafio 'simples' (he he he :D). <br />

Refatore o codigo abaixo escrito em javascript legacy para usar os novos conceitos que voce aprendeu:


```javascript

code legacy

```

---
<a id="async-functions"></a>
## 4) Programação assíncrona

Programação assíncrona é quando mandamos o código executar alguma ação e podemos mandar ele fazer alguma outra coisa enquanto executa essa ação.

Vamos pensar em um exemplo simples do mundo real, imagina que você tem que fazer compras, enquanto você esta indo no mercado está executando uma ação, porém, você não está limitado a isso, você pode ir fazendo outras coisas, como preparando a lista de compras no caminho ou lendo esse ebook, por outro lado, tem certas ações que dependem da volta do mercado, um exemplo seria preparar a comida.

Se parar para pensar um pouco, nossa mente funciona de forma assíncrona, quando pensamos em algo, pensamos na 'thread' principal nossa, mas muitas vezes deixamos esse pensamento de lado e vamos fazer outras coisas, mais tarde no dia voltamos com outras ideias para esse mesmo pensamento, isso é um modelo assíncrono de pensar.

Agora, no mundo dos computadores a rogramação assíncrona existe desde antes da era digital (sim, antes dos computadores). <br />
A maioria das linguagens de programação assíncrona se apoia no conceito de thread, uma thread é basicamente um processo ou uma parte de código que é executada de forma independente, o kernel (C++), por exemplo, consiste de várias threads, temos a thread da UI que é responsável por exibir informações na tela do seu dispositivo, uma outra para capturar input, e muitas outras threads responsáveis por acesso ao disco, acesso a network, garbage collector, etc.

O Node.js usa esse mesmo conceito internamente, temos apenas uma thread responsável por processar o código JavaScript, mas o Node gerencia muitas outras threads internamente, quando mandamos ler um arquivo no disco a thread principal JavaScript compila o código e manda para outra thread de acesso ao disco, e volta a procurar códigos JavaScript para compilar, e só quando aquele acesso ao disco terminar ele entra na fila para voltar para a thread principal.

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


---

<a id="async-functions"></a>
## 5) Gerenciamento de modulos

Node.js nos provem duas globais importantes para exportarmos e importarmos modulos

falar do spec de import / export

https://nodejs.org/docs/latest/api/modules.html#modules_module_exports

---

<a id='ref'></a>
## 11) Referência
<a href=#index>Índice</a>

<a id='ref-1'></a>
- [1] https://brendaneich.com/
<a id='ref-2'></a>
- [2] https://stackoverflow.com/questions/135203/whats-the-difference-between-javascript-and-jscript
<a id='ref-3'></a>
- [3] https://news.ycombinator.com/item?id=5626079
<a id='ref-4'></a>
- [4] https://www.wired.com/2011/04/0401gmail-launches/
<a id='ref-5'></a>
- [5] http://adaptivepath.org/ideas/ajax-new-approach-web-applications/
<a id='ref-6'></a>
- [6] http://lanyrd.com/2006/barcamp-boston-1/
<a id='ref-7'></a>
- [7] https://www.blueskyonmars.com/2010/01/29/commonjs-the-first-year/
<a id='ref-8'></a>
- [8] https://stackoverflow.com/questions/4269150/what-is-ecmascript
<a id='ref-9'></a>
- [9] https://stackoverflow.com/questions/135203/whats-the-difference-between-javascript-and-jscript
<a id='ref-10'></a>
- [10] https://stackoverflow.com/questions/2329602/why-was-ecmascript-4th-edition-completely-scrapped
<a id='ref-11'></a>
- [11] https://bytearcher.com/articles/es6-vs-es2015-name/
<a id='ref-12'></a>
- [12] https://github.com/lukehoban/es6features
<a id='ref-13'></a>
- [13] https://tc39.github.io/ecma262/
<a id='ref-14'></a>
- [14] https://www.youtube.com/watch?v=JxUvULKf6A4
<a id='ref-15'></a>
- [15] http://libevent.org/
<a id='ref-16'></a>
- [16] http://libuv.org/
<a id='ref-17'></a>
- [17] https://www.youtube.com/watch?v=ztspvPYybIY&t=146s
<a id='ref-18'></a>
- [18] https://siftery.com/nodejs?group=unicorns
<a id='ref-19'></a>
- [19] https://tessel.io/
<a id='ref-20'></a>
- [20] https://github.com/node-forward/discussions/issues
<a id='ref-21'></a>
- [21] https://github.com/indutny
<a id='ref-22'></a>
- [22] https://iojs.org/en/faq.html
<a id='ref-23'></a>
- [23] https://github.com/nodejs/node/issues/978
<a id='ref-24'></a>
- [24] https://nodejs.org/en/blog/announcements/foundation-v4-announce/
<a id='ref-25'></a>
- [25] http://anandmanisankar.com/posts/nodejs-iojs-why-the-fork/
<a id='ref-26'></a>
- [26] .eslintrc
<a id='ref-27'></a>
- [27] https://github.com/creationix/nvm#installation
<a id='ref-28'></a>
- [28] https://javascript.info/
<a id='ref-29'></a>
- [29] https://javascript.info/
<a id='ref-30'></a>
- [30] .vimrc
<a id='ref-31'></a>
- [31] https://stackoverflow.com/questions/500431/what-is-the-scope-of-variables-in-javascript



---

http://exploringjs.com/es6/
