const sumMany = accumulator => {
    const innerFunction = value => {
        if(value === undefined) {
            return accumulator;
        }else{
            accumulator += value;
            return innerFunction;
        }
    }

    return innerFunction;
}


console.log(sumMany(5)(7)(3)());