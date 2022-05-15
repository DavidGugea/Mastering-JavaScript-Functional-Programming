const demethodize = fn => (thisArg, ...args) => fn.apply(thisArg, args);
const toUpperCase = demethodize(String.prototype.toUpperCase);
const toLowerCase = demethodize(String.prototype.toLowerCase);
const charAt = demethodize(String.prototype.charAt);
const slice = demethodize(String.prototype.slice);


const splitWords = arr => arr.split(" ");
const lowerCaseEachValue = arr => arr.map(value => toLowerCase(value));
const headlineEachWord = arr => arr.map(
    value => (toUpperCase(charAt(value, 0)) + slice(value, 1, value.length))
);
const buildString = arr => arr.join(" ");

const fns = [
    buildString,
    headlineEachWord,
    lowerCaseEachValue,
    splitWords
];
let testString = "Alice's ADVENTURES in WoNdErLaNd";

const compose = (...fns) => value =>
    fns.reduceRight(
        (accumulator, currentFn) => currentFn(accumulator),
        value
    );

const headline = compose(...fns);

//console.log(buildString(headlineEachWord(lowerCaseEachValue(splitWords(testString)))));
console.log(headline(testString));