const VALUE = Symbol("Value");

class Container {
    constructor(x) {
        this[VALUE] = x;
    }

    map(fn) {
        return fn(this[VALUE]);
    }

    static of (x) {
        return new Container(x);
    }

    toString() {
        return `${this.constructor.name}(${this[VALUE]})`;
    }

    valueOf() {
        return this[VALUE];
    }
};