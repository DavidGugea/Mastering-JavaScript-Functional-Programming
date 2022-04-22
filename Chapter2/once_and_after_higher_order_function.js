const onceAndAfter = (f, g) => {
    let done = false;
    return (...args) => {
        if (!done) {
            done = true;
            f(...args);
        } else {
            g(...args);
        }
    }
}

/*
const f = () => {
    console.log("Inside the function f.");
}
const g = () => {
    console.log("Inside the function g.");
}

const f_once_then_g = onceAndAfter(f, g);

f_once_then_g();
f_once_then_g();
f_once_then_g();
f_once_then_g();
*/

describe("onceAndAfter", () => {
    it("should call the first function once, and the other after", () => {
        func1 = () => {};
        spyOn(window, "func1");
        func2 = () => {};
        spyOn(window, "func2");

        onceFn = onceAndAfter(func1, func2);

        onceFn();
        expect(func1).toHaveBeenCalledTimes(1);
        expect(func2).toHaveBeenCalledTimes(0);

        onceFn();
        expect(func1).toHaveBeenCalledTimes(1);
        expect(func2).toHaveBeenCalledTimes(1);

        onceFn();
        expect(func1).toHaveBeenCalledTimes(1);
        expect(func2).toHaveBeenCalledTimes(2);

        onceFn();
        expect(func1).toHaveBeenCalledTimes(1);
        expect(func2).toHaveBeenCalledTimes(3);
    })
})