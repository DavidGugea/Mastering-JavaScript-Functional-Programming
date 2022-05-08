const addLogging2 = fn => (...args) => {
    console.log(`entering ${fn.name}: ${args}`);
    try{
        const valueToReturn = fn(...args);
        console.log(`exiting ${fn.name}: ${args}`);
        return valueToReturn;
    }catch(thrownError){
        console.log(`exiting ${fn.name}: threw ${thrownError}`);
        throw thrownError; 
    }
}
