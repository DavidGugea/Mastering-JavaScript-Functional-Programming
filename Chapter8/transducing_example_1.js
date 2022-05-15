const testOdd = x => x % 2 === 1;
const testUnderFifty = x => x < 50;
const duplicate = x => x + x;
const addThree = x => x + 3;

const myArray = [22, 9, 60, 24, 11, 63];

const a0 = myArray
    .filter(testOdd)
    .map(duplicate)
    .filter(testUnderFifty)
    .map(addThree);

console.log(a0);