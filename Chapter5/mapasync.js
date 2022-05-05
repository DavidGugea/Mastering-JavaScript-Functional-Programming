const fakeAPI = (delay, value) => new Promise(resolve => setTimeout(() => resolve(value), delay));

const useResult = x => console.log(new Date(), x); 

const mapAsync = (arr, fn) => Promise.all(arr.map(fn));

(
    async () => {
        console.log("START MAP");

        const mapped = await mapAsync([1, 2, 3, 4], async n => {
            const x = await fakeAPI(n * 1000, n);
            return x;
        })

        useResult(mapped);

        console.log("END MAP");
    }
)();