const binaryOp2 = op => new Function("x", "y", `return x ${op} y;`);