const myArray = [22, 9, 60, 12, 4, 56];
const sum = (x, y) => x + y;
const average = arr => arr.reduce(sum, 0) / arr.length;

const average2 = (sum, val, ind, arr) => {
    sum += val;
    return ind === arr.length - 1 ? sum / arr.length : sum;
}

console.log(average(myArray));
console.log(myArray.reduce(average2, 0));