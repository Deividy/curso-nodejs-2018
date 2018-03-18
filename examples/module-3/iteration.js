const myFirstIterator = {
    dataSource: [
        'This is a simple data source',
        'May the speedy force be with you'
    ],

    step: 0,
    [Symbol.iterator] () {
        return {
            next () {
                const value = myFirstIterator.dataSource[myFirstIterator.step++];
                return { done: !value, value };
            }
        };
    }
}

for (let value of myFirstIterator) {
    console.log(value);
}

// same example, in another way
(function () {
    const dataSource = [ 'Hey yooouu!', 'How are you?' ];
    let step = 0;

    const myFirstIterator = {
        [Symbol.iterator] () {
            return {
                next () {
                    const value = dataSource[step++];
                    return { done: !value, value };
                }
            }
        }
    };

    for (let value of myFirstIterator) {
        console.log(value);
    }
})();

class MyFirstClassIteraction {
    constructor () {
        this.values = [];
    }

    push (value) {
        this.values.push(value);
        return this;
    }

    [Symbol.iterator] () {
        let step = 0;

        return {
            next: () => {
                return {
                    done: this.values.length === step,
                    value: this.values[step++]
                };
            }
        };
    }
}

const iteractingClasses = new MyFirstClassIteraction();
iteractingClasses.push('Hey you')
                 .push(null)
                 .push('Ta curtindo?');

for (let value of iteractingClasses) {
    console.log(value);
}
