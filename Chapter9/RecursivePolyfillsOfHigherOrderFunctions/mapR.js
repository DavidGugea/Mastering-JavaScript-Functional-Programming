const mapR = (arr, cb) =>
    arr.length === 0 ? [] : [cb(arr[0])].concat(mapR(arr.slice(1), cb));

let aaa = [1, 2, 4, 5, 7];
const timesTen = x => x * 10;
console.log(aaa.map(timesTen));
console.log(mapR(aaa, timesTen));