import { addLogging, addLogging2 } from 'addlogging.js';

describe("a logging function", function() {
    it("should log twice with well behaved functions", () => {
        let something = (a, b) => `result=${a}:${b}`;
        something = addLogging(something);

        spyOn(window.console, "log");
        something(22, 9);
        expect(window.console.log).toHaveBeenCalledTimes(2);
        expect(window.console.log).toHaveBeenCalledWith(
            "entering something: 22,9"
        );
        expect(window.console.log).toHaveBeenCalledWith(
            "exiting something: 22,9"
        );
    });

    it("should report a thrown exception", () => {
        let thrower = (a, b, c) => {
            throw "CRASH!";
        };

        spyOn(window.console, "log");
        expect(thrower).toThrow();

        thrower = addLogging(thrower);
        try{
            thrower(1, 2, 3);
        }catch (e){
            expect(window.console.log).toHaveBeenCalledTimes(2);
            expect(window.console.log).toHaveBeenCalledWith(
                "entering thrower: 1, 2, 3"
            );
            expect(window.console.log).toHaveBeenCalledWith(
                "exiting thrower: 1, 2, 3"
            );
        }
    })
})