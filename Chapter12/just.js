class Just extends Functor {
    isNothing() {
        return false;
    }

    map(fn) {
        return Maybe.of(fn(this[VALUE]));
    }
}