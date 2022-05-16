const reduceR = (orig, cb, accum) => {
    const reduceLoop = (arr, i) => {
        return arr.length == 0
            ? accum
            : reduceR(
                arr.slice(1),
                cb,
                !(0 in arr) ? accum : cb(accum, arr[0], i, orig),
                i + 1,
                orig
            );
    };

    return reduceLoop(orig, 0);
}

let bbb = [1, 2, , 5, 7 ,8 ,10, 21, 40];
const reduceCb = (x, y) => x + y;
console.log(bbb.reduce(reduceCb, 0));
console.log(reduceR(bbb, reduceCb, 0));