const demethodize1 = fn => (arg0, ...args) => fn.apply(arg0, args);
const demethodize2 = fn => (arg0, ...args) => fn.call(arg0, args);
const demethodize3 = fn => (...args) => fn.bind(...args)();

const name = "FUNCTIONAL";
const result = name.split("").map(x => x.toUpperCase());

const map = demethodize1(Array.prototype.map);
const toUpperCase = demethodize1(String.prototype.toUpperCase);
const result2 = map(name, toUpperCase);

console.log(result);