class Mabye extends Functor {
    constructor(x) {
        return x === undefined || x === null ?
            new Nothing() :
            new Just(x);
    }

    static of (x) {
        return new Mabye(x);
    }
}