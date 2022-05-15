const demethodize = fn => (arg0, ...args) => fn.apply(arg0, args);
const removeNonAlpha = str => str.replace(/[^a-z]/gi, " ");
const toUpperCase = demethodize(String.prototype.toUpperCase);
const splitInWords = str => str.trim().split(/\s+/);
const arrayToSet = arr => new Set(arr);
const setToList = set => Array.from(set).sort();

const compose = (...fns) =>
    fns.reduceRight((f, g) => (...args) => g(f(...args)));

const compose2 = (...fns) => value =>
    fns.reduceRight((accumulator, currentFn) => currentFn(accumulator), value);

const getUniqueWords = compose2(
    setToList,
    arrayToSet,
    splitInWords,
    toUpperCase,
    removeNonAlpha
);

const GETTYSBURG_1_2 = `Four score and even years ago our father brought forth on this continent, a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing wheter that nation, or any nation so concieved and so dedicated, can long endure.`;

console.log(getUniqueWords(GETTYSBURG_1_2));