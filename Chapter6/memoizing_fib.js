const fib = n => {
    if (n == 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else {
        return fib(n - 2) + fib(n - 1);
    }
}

const memoize = fn => {
    let cache = {};
    return x => (x in cache ? cache[x] : (cache[x] = fn(x)));
}

const addTiming = (fn, getTime = myGet, output = myPut) => (...args) => {
    let tStart = getTime();

    try{
        const valueToReturn = fn(...args);
        output("normal exit", fn.name, tStart, getTime());
        return valueToReturn;
    }catch(thrownError){
        output("exception thrown", fn.name, tStart, getTime());
        throw thrownError;
    }
}

const testFib = n => fib(n);
const testMemoFib = memoize(n => fib(n));
fib = memoize(fib);

addTiming(testFib)(45);
addTiming(testFib)(40);
addTiming(testFib)(35);

addTiming(testMemoFib)(45);
addTiming(testMemoFib)(45);
addTiming(testMemoFib)(40);
addTiming(testMemoFib)(35);

addTiming(fib)(45);
addTiming(fib)(40);
addTiming(fib)(35);