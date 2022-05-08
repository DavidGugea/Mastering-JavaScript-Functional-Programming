const demethodize = fn => (thisArg, ...args) => fn.apply(thisArg, args);

const map = demethodize(Array.prototype.map);
const toUpperCase = demethodize(String.prototype.toUpperCase);

let name = "FUNCTIONAL";
const result = map(name, toUpperCase);

console.log(result);