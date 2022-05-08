const myPut = (text, name ,tStart, tEnd) =>
    console.log(`${name} - ${text} ${tEnd - tStart} ms`);

const myGet = () => performance.now();

const addTiming = (fn, getTime = myGet, output = myPut) => (...args) => {
    let tStart = getTime();

    try{
        const valueToReturn = fn(...args);
        output("normal exit", fn.name, tStart, getTime());
        return valueToReturn;
    }catch(thrownError){
        output("exception thrown", fn.name, tStart, getTime());
        throw thrownError;
    }
}

const subtract = (a, b) => {
    if(b == 0){
        throw "Subtraction through 0 ( acceptable, but I need an error )";
    }

    return a - b;
}

let x = subtract(7, 5);
let y = subtract(4, 0);