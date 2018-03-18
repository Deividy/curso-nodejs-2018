<a id='introduction'></a>
# Introducão

Antes de falarmos sobre código e começarmos a por a mão na massa, precisamos conhecer um pouco da história e do funcionamento interno das tecnologias que estamos usando. <br />
Faremos uma viagem pela história do *JavaScript*, *ECMAScript* e *Node.js*, veremos também como o *Node.js* se comporta intermanete com seu *EventLoop*, no final teremos o padrão de código usado no curso.

> First, solve the problem. Then, write the code. - John Johnson

<a id="introduction-javascript"></a>
## JavaScript

JavaScript (ou js) no começo da web era usado apenas para simples validações de formulário e para abrir (chatos) popups e com isso era denegrido por profissionais da área, já que era um pessoal mais leigo (famosos sobrinhos) que usavam para esse tipo de ação. <br />
Quando foi desenvolvido, há mais de 20 anos atrás, teve outros nomes como Mocha e LiveScript. LiveScript foi o primeiro nome oficial da linguagem no Netscape 2.0, em setembro de 1995, desenvolvido originalmente por Brendan Eich[[01]](https://brendaneich.com/).
Em dezembro desse mesmo ano teve o nome trocado por JavaScript no lançamento da versão 2.0B3 do Netscape, em um anúncio conjunto com a Sun Microsystems, muitos acreditam que o nome foi uma sacada de marketing para atrair o público do recém-lançado Java.

Em novembro de 1996 a Netscape anunciou que tinha submetido o JavaScript para Ecma internacional como candidato a padrão industrial, o que resultou na versão padronizada ECMAScript.

A Microsoft em 1996 lançou o Internet Explorer 3.0 e nele foi incluído o JScript, que mesmo tendo o nome levemente diferente do JavaScript ele segue a implementação ECMAScript[[02]](https://stackoverflow.com/questions/135203/whats-the-difference-between-javascript-and-jscript).

Em meados de 1999, a Microsoft criou o XMLHTTP ActiveX Object[[03]](https://news.ycombinator.com/item?id=5626079) para o acesso a web do Outlook, Mozilla rapidamente implementou o XMLHttpRequest em seu navegador, porém, foi o Gmail do Google o primeiro site a usar extensivamente o XMLHttpRequest, isso em 2004[[04]](https://www.wired.com/2011/04/0401gmail-launches/).<br />
Jesse James Garrett (criador do Adaptive Pattern), definiu em 2005 o acrônimo AJAX em seu post histórico[[05]](http://adaptivepath.org/ideas/ajax-new-approach-web-applications/). A partir disso, JavaScript começou a se formar não apenas uma linguagem padrão de browsers e algo chato para abrir popups, mas uma tecnologia que podia criar uma interação e experiência incrível para interfaces de usuários. <br />
Começaram a surgir muitos frameworks e bibliotecas com foco na experiência do usuário, jQuery foi criado em 2006 por John Resig[[06]](https://jquery.org/history/) e rapidamente se espalhou para a maioria dos sites e sistemas para a web da época. 

Foi nessa época que começaram a usar o JavaScript fora do browser, e em 2009 o projeto CommonJS[[07]](https://www.blueskyonmars.com/2010/01/29/commonjs-the-first-year/) foi fundado com o objetivo de especificar uma biblioteca padrão para desenvolvimento JavaScript fora do navegador.

<a id="introduction-ecmascript"></a>
## ECMAScript

ECMAScript não é uma linguagem de programação, e sim especificações e padrões para a implementação de uma linguagem de scripting[[08]](https://stackoverflow.com/questions/4269150/what-is-ecmascript). Imagine o ECMAScript como o padrão que os desenvolvedores tem que seguir para a implementação do JavaScript (ou JScript se você estiver usando Internet Explorer[[09]](https://stackoverflow.com/questions/135203/whats-the-difference-between-javascript-and-jscript)).<br />
A versão 4 do ECMAScript foi abandonada por questões políticas e por sua especificação ter ficado complexa demais[[10]](https://stackoverflow.com/questions/2329602/why-was-ecmascript-4th-edition-completely-scrapped).

Apenas em 2011, com a versão 5.1 do ECMAScript, que as grandes empresas começaram a se alinhar em relação ao padrão ECMA.<br />
A versão 6 de 2015, oficialmente ECMA2015[[11]](https://bytearcher.com/articles/es6-vs-es2015-name/), introduziu um grande avanço com uma nova sintaxe, classes, módulos, for/of loops, além de algumas features mais parecidas com a linguagem de programação Python como generators, arrow functions, binary data, typed arrays, entre muitas outras features[[12]](https://github.com/lukehoban/es6features). <br />
Teve mais uma versão em Junho de 2016 (ECMAScript 7) e outra em Junho de 2017 (ECMAScript 8), agora aguardamos a versão 9[[13]](https://tc39.github.io/ecma262/).

<a id='introduction-nodejs'></a>
## Node.js

Em 2008, o Google lançou para o seu navegador Google Chrome, o motor para processamento JavaScript Chrome V8[[14]](https://www.youtube.com/watch?v=JxUvULKf6A4) e decidiu fazer disso um código aberto onde qualquer pessoa na internet poderia contribuir para sua evolução.

Em 2009, Ryan Dahl juntou a tecnologia de processamento JavaScript V8 com a libevent[[15]](http://libevent.org/)] (hoje em dia libuv[[16]](http://libuv.org/)] para criar o Node.js, ele apresentou sua nova tecnologia na JSConf de 2009[[17]](https://www.youtube.com/watch?v=ztspvPYybIY).<br />
O mundo JavaScript nunca mais foi o mesmo, Node.js se espalhou e se tornou viral, mas na metade de 2014 o projeto deu uma estagnada, isso por que alguns membros do core estavam insatisfeitos com o rumo que a Joyent (patrocinadora do projeto inicialmente) queria seguir, alguns dos desenvolvedores tentaram conversar com a empresa, surgiu então o projeto 'Node forward'[[20]](https://github.com/node-forward/discussions/issues), mas Fedor Indutny[[21]](https://github.com/indutny) se cansou de tanta conversa e decidiu criar um fork do projeto Node.js, chamando o fork de io.js[[22]](https://iojs.org/en/faq.html)[[25]](http://anandmanisankar.com/posts/nodejs-iojs-why-the-fork/), depois de longas conversas e releases separadas, mikeal criou um Reconciliation Proposal[[23]](https://github.com/nodejs/node/issues/978) que conseguiu enfim unir o io.js de volta no Node.js criando a *Node Foundation*[[24]](https://nodejs.org/en/blog/announcements/foundation-v4-announce/).

Hoje em dia é usado em diversas empresas[[18]](https://siftery.com/nodejs?group=unicorns) dos mais variados nichos pelo mundo todo, inclusive existe um pessoal criando hardwares baseados em JavaScript[[19]](https://tessel.io/).

Isso porque Node.js provém uma maneira fácil de criar um servidor para a web com grande poder de escalabilidade que pode rodar em quase qualquer sistema operacional, além disso é possível criar variados tipos de aplicativos, não apenas HTTP servers, o que ajudou sua proliferação.

Internamente, usa o V8 e a libuv, isso quer dizer que podemos escrever JavaScript (*processado pelo V8*) e usar o poder do event-loop da libuv[[28]](http://docs.libuv.org/en/v1.x/design.html).

Node.js internamente:

![node.js system](https://blog.deividy.com/img/event-loop.png)


Event Loop libuv:

![libuv loop iteration](http://docs.libuv.org/en/v1.x/_images/loop_iteration.png)

<a id='introduction-codestandards'></a>
## Code standards
Agora que já vimos a historia do ecosistema, está na hora de definirmos um padrão de código para o curso.

Usaremos 4 espaços no lugar de tab, mesmo não sendo necessários, usaremos ponto e vírgula (*;*) no final de cada *statement* ou *expression*, usaremos parênteses em todos os argumentos de funções, nosso limite de column é *80* e iremos sempre preferir ser mais claro do que minimalista.

Os códigos e comentários dentro de códigos serão escritos em *inglês*, pois esse é o padrão mundial e você, como desenvolvedor em 2018, tem que no mínimo poder ler e escrever códigos em inglês. <br />
Além de que alguns detalhes serão citados em inglês para você criar familiaridade com o linguajar.

O `.eslintrc` e `.vimrc` usados podem ser encontrados na referência([[26]](https://github.com/Deividy/curso-nodejs-2018/blob/master/.eslintrc), [[27]](https://github.com/Deividy/curso-nodejs-2018/blob/master/.vimrc)) e na [raíz desse repositorio](https://github.com/Deividy/curso-nodejs-2018/).

# Referências

<a id='ref-1'></a>
- [01] https://brendaneich.com/
<a id='ref-2'></a>
- [02] https://stackoverflow.com/questions/135203/whats-the-difference-between-javascript-and-jscript
<a id='ref-3'></a>
- [03] https://news.ycombinator.com/item?id=5626079
<a id='ref-4'></a>
- [04] https://www.wired.com/2011/04/0401gmail-launches/
<a id='ref-5'></a>
- [05] http://adaptivepath.org/ideas/ajax-new-approach-web-applications/
<a id='ref-6'></a>
- [06] https://jquery.org/history/
<a id='ref-7'></a>
- [07] https://www.blueskyonmars.com/2010/01/29/commonjs-the-first-year/
<a id='ref-8'></a>
- [08] https://stackoverflow.com/questions/4269150/what-is-ecmascript
<a id='ref-9'></a>
- [09] https://stackoverflow.com/questions/135203/whats-the-difference-between-javascript-and-jscript
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
- [17] https://www.youtube.com/watch?v=ztspvPYybIY
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
- [26] https://github.com/Deividy/curso-nodejs-2018/blob/master/.eslintrc
<a id='ref-27'></a>
- [27] https://github.com/Deividy/curso-nodejs-2018/blob/master/.vimrc
<a id='ref-27'></a>
- [28] http://docs.libuv.org/en/v1.x/design.html
