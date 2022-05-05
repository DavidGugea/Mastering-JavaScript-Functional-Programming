const fakeAPI = (delay, value) => new Promise(resolve => setTimeout(() => resolve(value), delay));

const useResult = x => console.log(new Date(), x); 

(
    () => {
        console.log("START FOREACH");

        [1, 2, 3, 4].forEach(
            async n => {
                const x = await fakeAPI(n * 1000, n);
                useResult(x)
            }
        )

        console.log("END FOREACH");
    }
)();