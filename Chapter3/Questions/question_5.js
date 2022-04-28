const bind_polyfill = (func, new_this) => (...args) => func.call(new_this, ...args);
const f = function(a, b, c){
    console.log(a, b, c);
    console.log(this);
}
const obj = {
    number: 7
}

const x = bind_polyfill(f, obj);
x(1, 2);