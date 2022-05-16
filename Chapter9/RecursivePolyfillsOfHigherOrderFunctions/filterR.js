const filterR = (orig, cb) => {
    const filterLoop = (arr, i) => {
        if (arr.length == 0) {
            return [];
        } else {
            const filterRest = filterR(arr.slice(1), cb, i + 1, orig);
            if (!(0 in arr)) {
                return filterRest;
            } else if (cb(arr[0], i, orig)) {
                return [arr[0]].concat(filterRest);
            } else {
                return filterRest;
            }
        }
    }

    return filterLoop(orig, 0);
}

let aaa = [1, 12, , , 5, 22, 9, 60];
const isOdd = x => x % 2;
console.log(aaa.filter(isOdd));
console.log(filterR(aaa, isOdd));