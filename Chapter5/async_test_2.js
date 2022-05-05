const fakeAPI = (delay, value) => new Promise(resolve => setTimeout(() => resolve(value), delay));

const useResult = x => console.log(new Date(), x); 

(
    async () => {
        console.log("START SEQUENCE");

        const x1 = await fakeAPI(1000, 1);
        useResult(x1);
        const x2 = await fakeAPI(1000, 2);
        useResult(x2);
        const x3 = await fakeAPI(1000, 3);
        useResult(x3);
        const x4 = await fakeAPI(1000, 4);
        useResult(x4);

        console.log("END SEQUENCE");
    }
)();