const myMap = (arr, fn) => arr.reduce(
    (accumulator, value) => accumulator.concat(fn(value)),
    []
);

const myArray = [22, 9, 60, 12, 4, 56];
const dup = x => 2 * x;

console.log(myArray.map(dup));
console.log(myMap(myArray, dup));
console.log(myArray);