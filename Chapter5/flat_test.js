const a = [
    [1, 2],
    [3, 4, [5, 6, 7]],
    8,
    [[[9, 10]]]
];

console.log(a);
console.log(a.flat());
console.log(a.flat(2));
console.log(a.flat(Infinity));