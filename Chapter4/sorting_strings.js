const sort1 = a => a.sort().pop();
const sort2 = a => [...a].sort().pop();

let letters = ["d", "c", "b", "a"];
console.log(sort1(letters));
console.log(letters);

console.log(sort2(letters));
console.log(letters);
console.log(sort2(letters));
console.log(letters);