const split = str => arr => arr.split(str);
const map = fn => arr => arr.map(fn);
const firstToUpper = word => word[0].toUppercase() + word.substr(1).toLowerCase();
const join = str => arr => arr.join(str);

const pipeline = (...fns) => value =>
    fns.reduce(
        (accumulator, currentFn) => currentFn(accumulator),
        value
    );

const headline = pipeline(split(" "), map(firstToUpper), join(" "));

let testString = "Alice's ADVENTURES in WoNdErLaNd";
console.log(headline(testString));