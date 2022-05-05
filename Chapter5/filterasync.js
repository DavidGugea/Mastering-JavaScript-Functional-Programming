const fakeAPI = (delay, value) => new Promise(resolve => setTimeout(() => resolve(value), delay));

const useResult = x => console.log(new Date(), x); 

const mapAsync = (arr, fn) => Promise.all(arr.map(fn));

const filterAsync = (arr, fn) =>
    mapAsync(arr, fn).then(arr2 => arr.filter((value, index) => Boolean(arr2[index])));

const fakeFilter = value =>
    new Promise(resolve =>
        setTimeout(() => resolve(value % 2 === 0), 1000)
);

(
    async () => {
        console.log("START FILTER");

        const filtered = await filterAsync([1, 2, 3, 4], async n => {
            const x = await fakeFilter(n);
            return x;
        });

        useResult(filtered);

        console.log("END FILTER");
    }
)();