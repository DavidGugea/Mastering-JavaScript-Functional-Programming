const make3 = (a, b, c) => String(100 * a + 10 * b + c);

const curry = fn => fn.length === 0 ? fn() : p => curry(fn.bind(null, p));

const make3c = curry(make3);
console.log(make3c(1)(2)(3));

const uncurry = (fn, arity) => {
    return function(...args){
        if(args.length !== arity) {
            throw Error("Too many arguments");
        }else{
            let curriedFunction = fn(args[0]);
            for(let i = 1 ; i < arity - 1 ; i++){
                curriedFunction = curriedFunction(args[i]);
            }
            
            return curriedFunction(args[args.length-1]);
        }
    }
}

const remake3 = uncurry(make3c, 3);
console.log(remake3(1, 2, 3));