const definingArrowFunction = () => "Thats one way!";
console.log(definingArrowFunction());

const arrowWithOneArg = name => `hello ${name}`;
console.log(arrowWithOneArg('speedy'));

const arrowWithTwoArgs = (name, email) => `hello ${name} <${email}>`;
console.log(arrowWithTwoArgs('speedy', 'deividyz@gmail.com'));

const arrowWithBody = (name) => {
    console.log(`Hey-yo, ${name}`);
    console.log('Do you want a beer?');
};

arrowWithBody('speedy');
console.log((() => "hiiii, self calling")());

(() => {
    console.log("I'm self calling with a body! :D");
    console.log("am I pretty? ;)");
})();

const HowAboutAClass = () => {
    console.log("That work?");
};

try {
    new HowAboutAClass();
} catch (ex) {
    console.error(ex);
}

// a function('class') to get a little context so we can test :)
new (function JustAContext () {
    this.canAnArrowFunctionSeeThis = 'YES';

    const arrowFn = () => {
        console.log("Arrow can see?");
        console.log(this.canAnArrowFunctionSeeThis);
    }

    function normalFn () {
        console.log("Normal can see?");
        console.log(this.canAnArrowFunctionSeeThis);
    }

    arrowFn();
    normalFn();
})();
