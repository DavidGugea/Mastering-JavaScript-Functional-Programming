describe("after addLogging3()", function() {
    let dummy;

    beforeEach(() => {
        dummy = { logger(){} };
        spyOn(dummy, "logger");
    });

    it("should call the provided logger", () => {
        let something = (a, b) => `result=${a}:${b}`;
        something = addLogging3(something, dummy.logger);

        something(22, 9);
        expect(dummy.logger).toHaveBeenCalledTimes(2);
        expect(dummy.logger).toHaveBeenCalledWith("entering something: 22,9");
        expect(dummy.logger).toHaveBeenCalledWith("exiting something: 22,9");
    });

    it("should throw a function that should be reported", () => {
        let thrower = (a, b, c) => {
            throw "CRASH!";
        };
        thrower = addLogging3(thrower, dummy.logger);

        try{
            thrower(1, 2, 3);
        }catch(e){
            expect(dummy.logger).toHaveBeenCalledTimes(2);
            expect(dummy.logger).toHaveBeenCalledWith("entering thrower: 22,9");
            expect(dummy.logger).toHaveBeenCalledWith("exiting something: threw CRASH!");
        }
    });
})