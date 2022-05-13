const make3 = (a, b, c) => String(100 * a + 10 * b + c);

const make3curried = a => b => c => String(100 * a + 10 * b + c);

const make3curried2 = function(a){
    return function(b){
        return function(c){
            return String(100 * a + 10 * b + c);
        }
    }
}


console.log(make3curried(1)(2)(3));