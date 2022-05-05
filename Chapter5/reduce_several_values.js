const myArray = [22, 9, 60, 12, 4, 56];

const average3 = arr => {
    const sumCount = arr.reduce(
        (accum, value) => ({
            sum: value + accum.sum, 
            count: accum.count + 1
        }), {sum: 0, count: 0}
    );

    return sumCount.sum / sumCount.count;
}

const average4 = arr => {
    const sumCount = arr.reduce(
        (accumulator, value) => ([accumulator[0] + value, accumulator[1] + 1]),
        [0, 0]
    );

    return sumCount[0] / sumCount[1];
}

console.log(average4(myArray));