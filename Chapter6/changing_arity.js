// const unary = fn => (...args) => fn(args[0]);
// const binary = fn => (...args) => fn(args[0], args[1]);
// const ternary = fn => (...args) => fn(args[0], args[1], args[2]);
const arity = (fn, n) => (...args) => fn(...args.slice(0, n));
const unary = fn => arity(fn, 1);
const binary = fn => arity(fn, 2);
const ternary = fn => arity(fn, 3);

console.log(["123.45", "-67,8", "90"].map(parseInt));
console.log(["123.45", "-67,8", "90"].map(unary(parseInt)));