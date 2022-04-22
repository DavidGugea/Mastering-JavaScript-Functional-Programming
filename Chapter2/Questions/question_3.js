const thisManyTimes = (fn, n) => {
    let tracker = 0;

    return (...args) => {
        if(tracker != n){
            fn(...args);
            tracker++;
        }
    }
}

const fn = () => console.log("hello world");
const test = thisManyTimes(fn, 5);

for(let i = 0 ; i < 10 ; i++){
    test();
}