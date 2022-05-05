const range = (start, stop, step=1) => new Array(Math.abs(parseInt(Math.abs(stop-start) / step, 10))).fill(0).map(
    (value, index) => start + index*step
)

console.log(range(0, 10));
// 0 1 2 3 4 5 6 7 8 9 10
// 
console.log(range(0, 10, 5));
console.log(range(10, 0, -1));
console.log(range(10, 0, -5));

console.log(range(10, -10, -5));