const addLogging3 = (fn, logger=console.log) => (...args) => {
    logger(`ntering ${fn.name}: ${args}`);
    try{
        const valueToReturn = fn(...args);
        logger(`exiting ${fn.name}: ${args}`);
        return valueToReturn;
    }catch(thrownError){
        logger(`exiting ${fn.name}: threw ${thrownError}`);
        throw thrownError; 
    }
}
