const memoize3 = fn => {
    let cache = {};
    const PRIMITIVES = ["number", "string", "boolean"];

    return (...args) => {
        let strX = 
            args.length === 1 && PRIMITIVES.includes(typeof args[0])
            ? args[0]
            : JSON.stringify(args);

        return strX in cache ? cache[strX] : (cache[strX] = fn(...args));
    }
}