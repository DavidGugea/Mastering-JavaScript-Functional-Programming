const fakeAPI = (delay, value) => new Promise(resolve => setTimeout(() => resolve(value), delay));

const useResult = x => console.log(new Date(), x); 

const forEachAsync = (arr, fn) => 
    arr.reduce(
        (promise, value) => promise.then(() => fn(value))
    );

(
    async () => {
        console.log("START FOREACH VIA REDUCE");

        await forEachAsync([1, 2, 3, 4], async n => {
            const x = await fakeAPI(n * 1000, n);
            userResult(x);
        })

        console.log("END FOREACH VIA REDUCE");
    }
)();