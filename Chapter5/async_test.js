const fakeAPI = (delay, value) => new Promise(resolve => setTimeout(() => resolve(value), delay));

const useResult = x => console.log(new Date(), x); 

(
    async () => {
        console.log("START");
        console.log(new Date());
        const result = await fakeAPI(1000, 229);
        useResult(result);
        console.log("END");
    }
)();