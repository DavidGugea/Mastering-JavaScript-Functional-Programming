const jasmine = require("jasmine");

let fib = null;
beforeEach(() => {
    fib = n => {
        if (n === 0) {
            return 0;
        } else if (n === 1) {
            return 1;
        } else {
            return fib(n - 2) + fib(n - 1);
        }
    }
})

describe("the original fib", () => {
    it("should produce correct results", () => {
        expect(fib(0)).toBe(0);
        expect(fib(1)).toBe(1);
        expect(fib(5)).toBe(5);
        expect(fib(8)).toBe(21);
        expect(fib(10)).toBe(55);
    });

    it("should repeat calculations", () => {
        spyOn(window, "fib").and.callThrough();
        expect(fib(6)).toBe(8);
        expect(fib).toHaveBeenCalledTimes(25);
    })
});