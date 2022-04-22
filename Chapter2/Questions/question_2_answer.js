const alternator = (fn1, fn2) => {
    return (...args) => {
        fn1(...args);
        [fn1, fn2] = [fn2, fn1];
    }
}

const f = () => console.log("F");
const g = () => console.log("G");
const alternate = alternator(f, g);

for(let i = 0;i < 10;i++){
    alternate();
}