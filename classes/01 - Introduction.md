1) Introducão
===

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
