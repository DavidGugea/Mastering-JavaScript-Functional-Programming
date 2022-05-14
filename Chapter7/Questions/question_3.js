const sum3 = (a, b, c) => 100 * a + 10 * b + c;


Function.prototype.curry = function () {
    // Build all the arguments needed for the curry function ( depending on the initial number of arguments )
    argumentNameArray = []; // [ a1, a2, ... a_n]
    for (let i = 0; i < this.length; i++) {
        argumentNameArray.push(`a${i}`);
    }

    // Build the curry string that will be given to the eval function
    let curryString = ""; // a1 => a2 => .. => a_n => this.apply(null, [a1, a2, ... a_n])

    // Add all the arguments to the curry string
    for (let j of argumentNameArray) {
        curryString += `${j} => `;
    }

    // Finish the curry string by applying all the argument names to the apply function
    curryString += `this.apply(null, [${argumentNameArray}])`;

    return eval(curryString);
}

console.dir(sum3);
console.log(sum3.curry()(1)(2)(3));