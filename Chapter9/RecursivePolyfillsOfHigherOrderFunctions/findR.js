const findR = (arr, cb) => {
    if (arr.length === 0) {
        return undefined;
    } else {
        return cb(arr[0]) ? arr[0] : findR(arr.slice(1), cb);
    }
}

// shorter version
const findR2 = (arr, cb) =>
    arr.length === 0 ?
    undefined :
    cb(arr[0]) ?
    arr[0] :
    findR(arr.slice(1), cb);


let aaa = [1, 12, , , 5, 22, 9, 60];

const isTwentySomething = x => 20 <= x && x <= 29;
console.log(findR(aaa, isTwentySomething));

const isThirtySomething = x => 30 <= x && x <= 39;
console.log(findR(aaa, isThirtySomething));