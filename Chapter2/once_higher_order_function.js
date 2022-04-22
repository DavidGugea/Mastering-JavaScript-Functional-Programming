const once = fn => {
    let done = false;
    return (...args) => {
        if (!done) {
            done = true;
            fn(...args);
        }
    }
}

/*
const sayHello = a => console.log(`Hello ${a}`);
const sayHelloOnce = once(sayHello);

sayHelloOnce("world");
sayHelloOnce("world");
sayHelloOnce("world");
*/

describe("once", () => {
    beforeEach(() => {
        window.myFn = () => {};
        spyOn(window, "myFn");
    });

    it("without' once', a function alwyas runs", () => {
        myFn();
        myFn();
        myFn();

        expect(myFn).toHaveBeenCalledTimes(3);
    });

    it("with 'once', a function runs one time", () => {
        window.onceFn = once(window.myFn);
        spyOn(window, "onceFn").and.callThrough();
        onceFn();
        onceFn();
        onceFn();
        expect(onceFn).toHaveBeenCalledTimes(3);
        expect(onceFn).toHaveBeenCalledTimes(1);
    });
});