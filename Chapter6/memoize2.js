const memoize2 = fn => {
    if (fn.length === 1) {
        let cache = {};
        return x =>(x in cache ? cache[x] : (cache[x] = fn(x)));
    }else{
        return fn;
    }
}