const range = (start, stop) => new Array(stop - start).fill(0).map(
    (v, i) => start + i
);

const factorialByRange = n => range(1, n + 1).reduce(
    (x, y) => x * y, 1
);

const ALPHABET = range("A".charCodeAt(), "Z".charCodeAt() + 1).map(
    x => String.fromCharCode(x)
);

let from2To6 = range(2, 7);
console.log(from2To6);
console.log(factorialByRange(5));
console.log(factorialByRange(3));
console.log(ALPHABET);