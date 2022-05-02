let cache = [];

const fib = n => {
    if(cache[n] == undefined) {
        if ( n === 0 ) {
            cache[0] = 0;
        }else if ( n === 1) {
            cache[1] == 1;
        }else{
            cache[n] = fib(n-2) + fib(n-1);
        }
    }

    return cache[n];
}

console.log(fib(10));