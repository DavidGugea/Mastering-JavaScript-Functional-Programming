const binaryOp1 = op => {
    switch(op) {
        case "+":
            return (x, y) => x + y;
        case "-":
            return (x, y) => x - y;
        case "*":
            return (x, y) => x * y;

        //
        // etc.
        //
    }
}