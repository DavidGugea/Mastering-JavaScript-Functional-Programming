const addLogging = fn => (...args) => {
    console.log(`entering ${fn.name}: ${args}`);
    const valueToReturn  = fn(...args);
    console.log(`exiting ${fn.name}: ${args}`);

    return valueToReturn;
}

function subtract(a, b) {
    b = changeSign(b);
    return a + b;
}

function changeSign(c) {
    return -c;
}

subtract = addLogging(subtract);
changeSign = addLogging(changeSign);

let x = subtract(7, 5);