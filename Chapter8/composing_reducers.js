const mapTR = fn => reducer => (accum, value) => reducer(accum, fn(value));
const filterTR = fn => reducer => (accum, value) =>
    fn(value) ? reducer(accum, value) : accum;

const testOdd = x => x % 2 === 1;
const testUnderFifty = x => x < 50;
const duplicate = x => x + x;
const addThree = x => x + 3;

const testOddR = filterTR(testOdd);
const testUnderFiftyR = filterTR(testUnderFifty);
const duplicateR = mapTR(duplicate);
const addThreeR = mapTR(addThree);


const addToArray = (a, v) => {
    a.push(v);
    return a;
}

const myArray = [22, 9, 60, 24, 11, 63];

const a1 = myArray.reduce(
    testOddR(duplicateR(testUnderFiftyR(addThreeR(addToArray)))), []
)

const compose = (...fns) => value =>
    fns.reduceRight((accumulator, currentFn) => currentFn(accumulator), value);

const makeReducer1 = (arr, fns) =>
    arr.reduce(compose(...fns)(addToArray), []);

const a2 = makeReducer1(myArray, [
    testOddR,
    duplicateR,
    testUnderFiftyR,
    addThreeR
]);

const makeReducer2 = (arr, fns, reducer = addToArray, initial = []) =>
    arr.reduce(compose(...fns)(reducer), initial);

const a3 = makeReducer2(myArray, [
    testOddR,
    duplicateR,
    testUnderFiftyR,
    addThreeR
]);

console.log(a3);