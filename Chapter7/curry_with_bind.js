const curryByBind = fn =>
    {
        console.log("Inside curryByBind");
        console.log(`Function legth -- > ${fn.length}`);

        // IT IS NOT RECURSIVE, YOU RETURN A FUNCTION
        return fn.length === 0 ? fn() : p => curryByBind(fn.bind(null, p));
    }

const make3 = (a, b, c) => String(100 * a + 10 * b + c);

// f1 is a function that will fix make3's 1st parameter
const f1 = curryByBind(make3);
console.dir(f1);

// f2 is a function that will fix mak3's 2nd parameter
const f2 = f1(6);

// f3 is a function that will fix make3's last parameter
const f3 = f2(5);

// no more parameters to fix
const f4 = f3(8);

console.log(f4);

console.log("-".repeat(50));

const curryByBind2 = (fn, len = fn.length) =>
    len === 0 ? fn() : p => curryByBind2(fn.bind(null, p), len - 1);

const sum2 = (...args) => args.reduce((x, y) => x + y, 0);

console.log(sum2(1, 5, 3));
console.log(sum2(1, 5, 3, 7));
console.log(sum2(1, 5, 3, 7, 4));

curriedSum5 = curryByBind2(sum2, 5);
console.log(curriedSum5(1)(5)(3)(7)(4));