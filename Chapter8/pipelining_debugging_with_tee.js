const tee = arg => (console.log(arg), arg);
const tap = fn => x => (fn(x), x);
const tee2 = tap(console.log.bind(console));

const pipeline = (...fns) => value =>
    fns.reduce((accumulator, currentFn) => currentFn(accumulator), value);

const add5 = number => number + 5;
const minus1 = number => number - 1;
const multiplyWith5 = number => number * 5;

const result = pipeline(add5, tee2, minus1, tee2, multiplyWith5)(7);
console.log(`The result is -- > ${result}`);