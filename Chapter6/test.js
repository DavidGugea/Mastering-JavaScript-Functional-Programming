const demethodize = fn => (arg0, ...args) => {
    console.log(arg0);
    console.log(...args);
    console.log(`${fn}.apply(${arg0}, ${args})`);
    return fn.apply(arg0, args);
}

function add(a, c){
    console.log(this);
    return a + this.b + c;
}
const c = {
    b: 10
}

// console.log(add(5));
// console.log(add.call(c, 5));
// console.log(add.apply(c, [120]));
const x = add.bind(c);
console.log(x);
console.log(x(120, 0.5));