const fakeAPI = (delay, value) => new Promise(resolve => setTimeout(() => resolve(value), delay));

const useResult = x => console.log(new Date(), x); 

const forEachAsync = (arr, fn) => 
    arr.reduce(
        (promise, value) => promise.then(() => fn(value))
    );

const reduceAsync = (arr, fn, init) =>
    Promise.resolve(init).then(
        accum => 
            forEachAsync(arr, async (value, index) => {
                accum = await fn(accum, value, index);
            }).then(() => accum)
    );

const fakeSum = (value1, value2) => 
    new Promise(resolve => setTimeout(() => resolve(value1 + value2), 1000));

(
    async () => {
        console.log("START REDUCE");

        const summed = await reduceAsync(
            [1, 2, 3, 4],
            async (_accum, n) => {
                const accum = await _accum;
                const x = await fakeSum(accum, n);
                useResult(`accumulator = ${accum} value = ${x}`);
                return x;
            },
            0
        );

        useResult(summed);
        console.log("END REDUCE");
    }
)();