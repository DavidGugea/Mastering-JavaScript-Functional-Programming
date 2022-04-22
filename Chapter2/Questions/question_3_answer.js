const thisManyTimes = (fn, limit) => {
    return (...args) => {
        if(limit > 0){
            limit--;
            return fn(...args);
        }
    }
}

const fn = () => console.log("hello world");
const test = thisManyTimes(fn, 5);

for(let i = 0 ; i < 10 ; i++){
    test();
}