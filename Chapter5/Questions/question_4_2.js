const range = (start, stop, step=1) => new Array(Math.abs(parseInt(Math.abs(stop-start) / step, 10))).fill(0).map(
    (value, index) => start + index * step
);

console.log(range(0, 10));
console.log(range(0, 10, 5));
console.log(range(-5, 10, 5));
console.log(range(10, -20, -5));