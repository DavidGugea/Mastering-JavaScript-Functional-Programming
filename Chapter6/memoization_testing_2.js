describe("the memoized fib", function() {
    beforeEach(() => {
        fib = memoize(fib);
    });

    it("should produce same results", () => {
        expect(fib(0)).toBe(0);
        expect(fib(1)).toBe(1);
        expect(fib(5)).toBe(5);
        expect(fib(8)).toBe(21);
        expect(fib(10)).toBe(55);
    });

    it("shouldn't repeat calculations", () => {
        spyOn(window, "fib").and.callThrough();

        expect(fib(6)).toBe(8);
        expect(fib).toHaveBeenCalledTimes(11);

        expect(fib(5)).toBe(5);
        expect(fib(4)).toBe(3);
        expect(fib(3)).toBe(2);
        expect(fib).toHaveBeenCalledTimes(14);
    })
});