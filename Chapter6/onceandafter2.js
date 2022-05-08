const onceAndAfter2 = (f, g) => {
    let toCall = f;
    return (...args) => {
        let result = toCall(...args);
        toCall = g;
        return result;
    }
}

const a = (x) => console.log(x, "a!");
const b = (x) => console.log(x, "b!");

const c = onceAndAfter2(a, b);

c("hello world");
c("hello world");
c("hello world");
c("hello world");