const find = (arr, fn) => 
    arr.reduce(
        (accumulator, value) => (accumulator === undefined && fn(value) ? value : accumulator), undefined
    );

const findIndex = (arr, fn) => 
    arr.reduce(
        (accumulator, value, index) => (accumulator == -1 && fn(value) ? i : accumulator),
        -1
    );