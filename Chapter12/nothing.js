class Nothing extends Functor {
    isNothing() {
        return true;
    }

    toString() {
        return "Nothing()";
    }

    map(fn) {
        return this;
    }
}