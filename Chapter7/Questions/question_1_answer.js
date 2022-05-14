const sumMany = total => number =>
    number === undefined ? total : sumMany(total + number);

console.log(sumMany(5)(7)(3)());