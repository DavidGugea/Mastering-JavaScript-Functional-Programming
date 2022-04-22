const once = fn => {
    return (...args) => {
        fn && fn(...args);
        fn = null;
    }
}

const sayHello = a => console.log(`Hello ${a}`);
const sayHelloOnce = once(sayHello);

sayHelloOnce("world");
sayHelloOnce("world");
sayHelloOnce("world");