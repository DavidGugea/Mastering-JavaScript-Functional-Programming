const VALUE = Symbol("Value");

class Container {
    constructor(x) {
        this[VALUE] = x;
    }

    map(fn) {
        return fn(this[VALUE]);
    }
};