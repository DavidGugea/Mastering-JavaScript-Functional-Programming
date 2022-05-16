const mapR3 = (orig, cb) => {
    const mapLoop = (arr, i) =>
        arr.length == 0
            ? []
            : [cb(arr[0], i, orig)].concat(
                mapR3(arr.slice(1), cb, i + 1, orig)
            );

    return mapLoop(orig, 0);
}