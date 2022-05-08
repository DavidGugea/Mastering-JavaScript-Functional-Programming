const onceAndAfter = (f, g) => {
    let done = false;
    return (...args) => {
        if (!done) {
            done = true;
            return f(...args);
        } else {
            return g(...args);
        }
    }
}