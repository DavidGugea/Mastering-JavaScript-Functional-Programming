const range = (start, stop) => new Array(stop - start).fill(0).map(
    (v, i) => start + i
);

const factorial4 = n => {
    let result = 1;

    range(1, n + 1).forEach(
        v => (result *= v)
    );

    return result;
}