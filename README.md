# Mastering JavaScript Functional Programming

## 1. Becoming Functional - Several Questions
## 2. Thinking Functionally - A First Example
## 3. Starting Out with Functions - A Core Concept
## 4. Behaving Properly - Pure Functions
## 5. Programming Declaratively - A Better Style
## 6. Producing Functions - Higher-Order Functions
## 7. Transforming Functions - Currying and Partial Application
## 8. Connecting Functions - Pipelining and Composition
## 9. Designing Functions - Recursion
## 10. Ensuring Purity - Immutability
## 11. Implementing Design Patterns - The Functional Way
## 12. Building Better Containers - The Functional Way

---

# 3. Starting Out with Functions - A Core Concept

## The difference between arguments and parameters

The difference between arguments and parameters are that **parameters represent the placeholders for arguments, they are the names that are written when you built the function** while **arguments are the values that are given to the parameters**.

## Arrow funtions

Arrow functions can return values even if they don't explicitly use the ```return``` statement. The value of ```this``` is not bound in arrow functions and there is no ```arguments``` object.

Arrow functions can't be used as constructor functions, hence they also don't have a ```prototype``` property and they also can't be used as generators, i.e. they can't use the ```yield``` operator.

## Passing functions directly

Let's take a look at the following code:

```JavaScript
fetch(url)
    .then((data) => {
        processResult(data);
    });
```

We are using the ```fetch``` API to fetch some data from some url. Afterwards, a promise is returned so we are using the ```.then``` function and give in a callback function with one argument as the argument. Then callback function then calls another function that also takes in only one argument. 
Since the callback function takes in only one argument, there's no point in calling another function inside of it that takes in the same argument if we are not doing any processing with the ```data```.
Hence, we can simplify this situation like this:

```JavaScript
fetch(url)
    .then(processResult);
```

This programming style is called ***pointfree*** or ***tacit*** style. Its main characterisitcs are that you never specify the arguments for each function, you just give the function directly as the callback and everything will be handled for you.

## Forgetting to bind

Let's look at the following example:

```JavaScript
fetch("some/remote/url")
    .then(
        (data) => {
            myObject.store(data);
        })
    );
```

We've already talked about the ***pointfree***/***tacit*** style of programming. Let's implement it in here:

```JavaScript
fetch("some/remote/url")
    .then(myObject.store);
```

The problem with this code is that the ```store``` function from ```myObject``` is using the store to deposit the data, hence it uses a certain instance of a class using the ```this``` keyword. In our example, ```myObject.store``` is a ***free*** function since it isn't bound to its object. We have to bind it to the ```myObject``` object:

```JavaScript
fetch("some/remote/url")
    .then(myObject.store.bind(myObject));
```

## Continuation passing style

The ***pointfree***/***tacit*** style of programing is considered a case of ***continuation passing style ( CPS )***. One way of thinking about this technique of coding/concept is by trying to answer the following question:

> How would you program if using the ```return``` statement was forbidden ?

An answer to this question is to pass in a callback and call the callback inside the function whenever we wanted to use the ```return``` statement. By doing this, the callback is used by the called function to continue the process, hence the concept of *continuation*.

> Working out how to use continuations is sometimes challengeing, but always possible. An interesting advantage of this way of coding is that by specifying yourself how the process is going to continue, you can go beyond all the usual structures ( ```if```, ```while```, ```return``` and so on ) and implement whatever mechanisms you want. This can be very useful in some kind of problems where the process isn't necessarily linear. Of course, this can also lead to you inveting a kind of control structures that is far worse than the possible usage of ```GOTO``` statements that you might imagine !

![](ScreenshotsForNotes/Chapter3/goto.png)

You are not limited to only provide only one single continuation, you can provide more continuations to the function called and it will decide internally which one to use when. This also provides a solution to the problem with dealing with exceptions. Here is an example:

```JavaScript
function doSomething(a, b, c, normalContinuation, errorContinuation) {
    let r = 0;
    // ... do some calculations involving a, b and c
    // and store the result in r
    // if an error happens, invoke:
    // errorContinuation("description of the error")
    // otherwise, invoke:
    // normalContinuation(r)
}
```

## Polyfills

Polyfills are functions that implement built-ins that are not already available in some version of the language. They are often used for integrating older browsers since their JavaScript engines are a lot older and don't support certain modern built-ins.

## Stubbing

The idea of *stubbing* is to **make a function to different work depending on the environment**. This idea comes from testing where the concept of stubbing means replacing a function with another that does a simpler job instead of doing the original work since it's easier to test.

Stubbing is commonly used with logging functions. You might want the logger to do its normal job of logging while being in the development environment and you might want it to not log anything while in production:

```JavaScript
let myLog = someText => {
    if(DEVELOPMENT){
        console.log(someText); // or some other way of logging
    }else{
        // do nothing
    }
}
```

Since this checks the development environment every time you want to log something, it's inefficient. You can refactor it like this:

```JavaScript
let myLog;

if(DEVELOPMENT) {
    myLog = someText => console.log(someText);
}else{
    myLog = someText => {};
}
```

You can simplify in even more using the ternary operator:

```JavaScript
const myLog = DEVELOPMENT
    ? someText => console.log(someText)
    : someText => {};
```

## Solving variable hoisting with IIFEs

Take a look at the following example:

```JavaScript
function ready() {console.log("ready")}
function set() {console.log("set")}
function go() {console.log("go")}

ready();
set();
go();

function set() {console.log("UNEXPECTED")}

/*
OUTPUT:
"ready"
"UNEXPECTED"
"go"
*/
```

This happens because of variable hoisting. JavaScript executes a function at its last change. Variable hoisting means that the variables are declared at the top first and implementing later. In this case since the function has changed, regardless that its before the execution, the JS engine executes the last change.

You can solve this by using an IIFE:

```JavaScript
(
    () => {
        function ready() {console.log("ready")}
        function set() {console.log("set")}
        function go() {console.log("go")}

        ready();
        set();
        go();
    }
)();

function set() {console.log("UNEXPECTED")}

/*
OUTPUT:
"ready"
"set"
"go"
*/
```

# 4. Behaving Properly - Pure Functions

## Pure functions 

A function is pure when it satisfies the following conditions:

* **Given the same arguments, the function calculates and returns the same result.** This must be true no matter how many times the function is called and regardless under what conditions it is called. **The result can't depend on any outside information or state which could change during the execution of the program and cause it to return a different result.** The result of the function can't depend on random numbers, or any external variable or I/O results since they are not controllable.
* **The function doesn't have any side effects:** That means that the function doesn't interact with the outside scope. This include the mutation of objects or any changes to a program's state outside of the scope of the function.

Pure functions don't and aren't allowed to depend on anything outside their scope and their are also not allowed to interact with anything outside their scope. They just receive some input and return the same output over and over again for the same input regardless of where or how many times it is called and all that without interacting with anything outside its scope.

> Another word used in this context is **idempotency** but it's not exactly the same. An idempotent function can be called as many times as desired, and will always produce the same result; however, this doesn't imply that the function is free from side effects. Idempotency is usually mentionted in the context of RESTful services. A ```PUT``` call would cause a database record to be updated ( a side effect ), but if you repeat the call, the element will not be further modified, so the global state of the database won't change any further.

***A function should do one thing, only one thing and nothing but that thing.*** 

If the function doesn't follow this rule and has some hidden side effects then it will be very hard to predict the function's output.

## Referential transparency

In mathematics, **referencial transparency** is the property that lets you replace an expression with its value without changing the result of whatever you were doing.

> The counterpart of referential transparency is, **referential opacity**. A referentially opaque function cannot guarantee that it will always produce the same result, even when called with the same arguments.

For example, you can look at the statement:

```JavaScript
const x = 1 + 2 * 3;
```

The compiler might optimize it by noting that 2 * 3 is a constant:

```JavaScript
const x = 1 + 6;
```

A new optimization to this might be:

```JavaScript
const x = 7;
```


In order to save execution time the compiler is taking advantage of the fact that mathematical expressions are referentially transparent. If it wouldn't optimize the calculations, they would be all executed at runtime.

All arithmetical expressions are referentially transparent. Expressions involving I/O are not transparent since their results can't be known until they are executed. The same goes for expressions that revolve around date or time or random numbers.

Functions can be classified as the following:

* **Pure functions:** These return a value that depends only on its arguments and have no side effects whatsoever.
* **Side effects:** These don't return anything but do produce some kind of side effects.
* **Functions with side effects:** This menas taht they return a value that may not only depend on the function arguments, but also involve side effects.

> In FP, much emphasis is put on the first group, ***referentially transparent pure functions***. Not only can a compiler reason about the program behavior ( and thus be able to optimize the generated code ) but also the programmer can more easily reason about the program and the relationship between its components. This in turn can help prove the correctness of an algorithm or optimize the code by replacing a function with an equivalent one.

## Side effects

Side effects can be defined as a change in state or an interaction with outside elements that occurds during the execution of a function.

If you write a function that includes a ```console.log()```, that function has a side effect, even if that's what you intended the function to do. This is because you've interacted with something outside of the scope of the function. If the function doesn't only work with its given arguments and absolutely nothing else, then the function contains side effects.

You should not think about side effects in FP as in "collateral damage", just like we do in real life. When you think about side effects in FP you think about any interactino that a function has with the outside world. If a function interacts with the console API, even if that's what you wanted it to do, that is still considered a side effect thus the function is no longer pure.

### Usual side effects

Common side effects are:

* Changing global variables
* Mutating objects received as arguments
* Performing any kind of I/O, such as showing an alert message or logging some text
* Working with, and changing the filesystem
* Updating a database
* Calling a web service
* Querying or modifying the DOM
* Triggering any external process
* Just calling anohter function that happens to produce a side effect of its own. ***You could say that impurity is contagious: a function taht calls an impure function automatically becomes impure on its own!***

## Global state

One of the key properties of a pure function is that it only interacts with its given arguments and nothing else. It must produce the same output if given th esame arguments. **If it interacts with anything volatile outside its state, it becomes impure**.

Example:

```JavaScript
let limitYear = 2003;

const isOldEnough = birthYear => birthYear <= limitYear;

console.log(isOldEnough(2004));
console.log(isOldEnough(2002));
```

The function ```isOldEnough``` is impure since it interacts with a function from outside its state. That makes the function impure since you cannot be sure that the function will return the same result every time for the same arguments given since the ```limitYear``` variable might be changed in the future.

Testing would also be hard since you would have to remember to implemnet a ```limitYear``` variable otherwise your tests won't work.

However, if the function interacts with something outside its state that is a constant, then it remains pure since the value is a constant so the function will always return the same values for the same input no matter what:

```JavaScript
const PI = 3.14159265358979;
const circleArea = r => PI * Math.pow(r, 2); 
```

The function ```circleArea``` is pure even though it is working with something outside its scope. That is because that something is the ```PI``` value which is described as a constant.

## Inner State

This notion also goes for internal variables.
If a function works with some internal variable that is prone to change or with some variable from a closure, then that function also becomes impure.

Example:

```JavaScript
const roundFix = (
    () => {
        let accum = 0;

        return n => {
            // reals get rounded up or down
            // depending on the sign of accum
            let nRounded = accum > 0 ? Math.ceil(n) : Math.floor(n);
            console.log(`accum ${accum.toFixed(5)} result ${nRounded}`);
            accum += (n - nRounded);
            return nRounded;
        }
    }
)();

roundFix(3.14159);
roundFix(2.71828);
roundFix(2.71828);
roundFix(3.14159);
roundFix(2.71828);
roundFix(2.71828);
roundFix(2.71828);
```

If you run the code, you will see that the function doesn't return the same value for the same input all the time. That is because it works with a variable from its closure.

## Argument mutation

***A pure function is not allowed to modify its arguments outside its scope***. If a function is given an array for example, it's not allowed to change the array in any kind of way outside its scope. ***In JavaScript, arguments are passed by value, except in the case of arrays and objects, which are passed by reference***.

This can be further obscurred by the fact that there are several **mutator** methods, that change the udnerlying objects by definition.

An example of an impure function that changes the state of its arguments:

```JavaScript
const sortArray = a => a.sort().pop();

let someArray = ['a', 'b', 'c', 'd'];
console.log(sortArray(someArray));
```

## Troublesome functions

There are functions that are considered simply 'troublesome' in FP since they make functions impure. As previously mentioned, ***any function that uses an impure function becomes itself impure.***

That means that if a function uses something like ```Math.random()```, which is an impure function, that function will become impure as well. This is also true for functions that work with date or time or for functions that cause I/O. If a function gets input from another source (web service, users, a file, cloud ), then the function is impure since its results may vary.

## Advantages of pure functions

The main advantages of pure functions is that they don't have any side effects. They only work with the arguments that they are given and nothing else. You can also be sure that they don't break anything around them since they are not allowed to interact with the outside space.

### Order of execution

Pure functions are also ***robust***. That means that their execution - regardless of the order - won't have any sort of impact on the system. In this case we are referring to the **commutative property**, which means that the order in which you call the functions is irrelevant: The expressions ```f(5) + f(2)``` and ```f(2) + f(5)``` are the same.

### Memoization

Since the output of a pure function for a certain input is always the same, it might be good to cache the function results and avoid a possibly costly recalcuation. This process, which implies only evaluation a function once and then storing the data of the input and the output, is called ***memoization***.

> Of course, you don't need to do this for every pure function in your program. You'd do this sort of optimization only for frequently called function sthat take a certain important amount of time - if it were otherwise, then the added cache management time would end up consting more than whatever you expected to save !

### Self-documentation

Since pure functions only work with their given arguments and can't interact with the outside scope, it's very easy to read the source code and just understand what the function does.

It's also safer to use them since you know that they don't interact with outside resources, so you can't really break anything.

Unit tests also work as documentation since they provide examples of what the function returns when given certain arguments.

### Testing

Pure function have a single responsibility: producing their output in term of their input.
That means that it is very easy to test them.

## Impure Functions

> Reducing side effects in FP is a good goal, but we shouldn't go overboard with it!

We can reduce the number of impure functions using the following two methods:

* Avoiding the usage of state
* Using a common pattern, *injection*, to have impurity in a controleld fashion

### Avoiding the usage of state

The key points to this are:

* Provide whatever is needed of the global state toe the function as arguments
* If the function needs to update the state, it shouldn't do it directly, but rather rpdoceu a new version of the state and return it.
* It should be the responsibility of the caller to take the returned state, if any and update the global state.

### Injecting impure functions

A function that uses an impure function, becomes impure. In order to deal with this problem we can inject the impure function inside of it, this would also provide a lot of flexibility in our code and make future changes easier.

Example:

```JavaScript
const a = () => {
    b();
}
```

In this context, ```b``` is an impure function, which also make ```a``` an impure function.
In order to solve this problem, we can inject the function ```b``` into ```a```:

```JavaScript
const a = (x) => {
    x();
}

a(b);
```

Now, the function ```a``` remain pure, even if it's using an impure function, since the impure function is injected into it.

# 5. Programming Declaratively - A Better Style

## Reducing an array to a value

> In usual FP parlance, we speak of **folding** operations: ```reduce()``` is **foldl** ( for fold left ) or just plain **fold** and ```reduceRight()``` is correspondingly known as **foldr**. In category theory terms, both operaitons are **catamorphisms**: the reduction of all the values in a *container* down to a single result.

The ```reduce()``` function iterates through the array and applies a function to each element and the accumulator. In the end, this reduces the whole array to one single value.

These are the reasons why you should use ```reduce()```/```reduceRight``` over hand-coded loops:

* All the aspects of loop control are automatically taken care of, so you don't even have the possibility of, say, and *off-by-one* mistake.
* The initialization and handling of the result values are also done implicitly.
* Unless you work really hard at being impure and modifying the original array, your code will be side effect free.

In order to reduce an an array you must provide a **dyadic**/**binary** function which is a function with two parameters and you can also provide an initial value.

It's always better to provide a starting value since, for example if an array is empty, you will receive an error.

```reduce``` allows you to work more declaratively, focusing on *what* rather than *how*.

### Folding left and right

The complementary ```reduceRight()``` method works just as ```reduce()``` does but it works from right to left.

## Applying an operation - map

> In mathematics, a **map** is a transfomration of elements from a **domain** into elements of a **codomain**. For example, you might transforms numbers into strings or strings into numbers, but also numbers to numbers, or strings to strings: the important point is that you have a way to transform an element of the first **kind** or **domain** ( think **type**, if it helps ) into an element of the second kind, or **codomain**. In our case, this will mean taking the elements of an array and applying a function to each of them to produce a new arrayl. In more computer-like terms, the map function transforms an array of inputs into an array of outputs.

The ```map()``` function doesn't modify the original array and only applies a given function to every single element ( excluding ```undefined``` elements ) and returns a new array with the results.

Here are the advantages of using ```map()``` over a normal loop:

* First, you don't have to write any loops, so that's one less possible source of bugs.
* Second, you don't even have to access the original array or the index position, even though they are there for you to use if you relaly need them.
* Lastly, a new array is produced, so your code is pure ( though, of course, if you really want to produce side effects, you can! )

There are only two caveats when using this:

* Always return something from your mapping function. If you forget this, then you'll just produce an ```undefined```-filled array, because JavaScript always provides a default ```return undefined``` for all functions.
* If the input array elements are objects or arrays and you include them in the output array, then JavaScript will still allow the original elements to be accessed.

## Flattening an array

The ```flat()``` method creats a new array, concatenating all elements of its subarrays to the desired level, which is, by default, 1:

```JavaScript
const a = [
    [1, 2],
    [3, 4, [5, 6, 7]],
    8,
    [[[9, 10]]]
];

console.log(a);
console.log(a.flat());
console.log(a.flat(2));
console.log(a.flat(Infinity));
```

## Mapping and flattening - ```flatMap()```

The function ```flatMap()``` is a combination between ```map()``` and ```flat()```. It first applies the ```map()``` function on the array and then the ```flat()``` function.

## Filtering an array

The ```filter()``` takes in a function and applies that function to each element and only keeps the elements for which the output of the function was true.

> The ```filter()``` method lets you inspect each element of an array int he same fashion as ```map()```. The difference is that instead of producing a new element, the result of your function determines wheter the input value willbe kept in the output ( if the function returned ```true``` ) or if it will be skipped ( if the function returned ```false``` ). Also similar to ```map()```, ```filter()``` doesn't alter the original array, but rather returns a new array with the chosen items.

There are a couple of things to remember when filtering an array:

* **Always return something from your predicate**: If you forget to include a ```return```, the function will implicitly return ```undefined``` and since that's a *falsy* value, the output will be an empty array.
* **The copy that is amde is shallow**: If hte input array elements are objects or arrays, then the original elements will still be accessible.

## Searching an array

You can search elements in an array using:

* ```find()``` searches through the array and returns the value of the first element that satisfies a given condition, or ```undefined``` if no such element is found
* ```findIndex()``` performs a similar task, but instead of returning an element, it returns the index of the first element in the array that satisfies the condition, or -1 of none were found

### A special serach case

```NaN``` is the only value that isn't equal to itself:

```JavaScript
[1, 2, NaN, 4].findIndex(x => x === NaN); // -1
[1, 2, NaN, 4].findIndex(x => isNaN(x)); // 2 
```

## Higher-level predicates - some, every

```every()``` returns ```true``` if and only if *every* element in the array satisfies a given predicate.
```some()```, which is ```true``` if at least *one* element in the array satisfies the predicate.

## Async implementations

The following are async implementations of the higher-order functions we've seen so far:

### Async ```forEach```

```JavaScript
const fakeAPI = (delay, value) => new Promise(resolve => setTimeout(() => resolve(value), delay));

const useResult = x => console.log(new Date(), x); 

const forEachAsync = (arr, fn) => 
    arr.reduce(
        (promise, value) => promise.then(() => fn(value))
    );

(
    async () => {
        console.log("START FOREACH VIA REDUCE");

        await forEachAsync([1, 2, 3, 4], async n => {
            const x = await fakeAPI(n * 1000, n);
            userResult(x);
        })

        console.log("END FOREACH VIA REDUCE");
    }
)();
```

### Async ```filter```

```JavaScript
const fakeAPI = (delay, value) => new Promise(resolve => setTimeout(() => resolve(value), delay));

const useResult = x => console.log(new Date(), x); 

const mapAsync = (arr, fn) => Promise.all(arr.map(fn));

const filterAsync = (arr, fn) =>
    mapAsync(arr, fn).then(arr2 => arr.filter((value, index) => Boolean(arr2[index])));

const fakeFilter = value =>
    new Promise(resolve =>
        setTimeout(() => resolve(value % 2 === 0), 1000)
);

(
    async () => {
        console.log("START FILTER");

        const filtered = await filterAsync([1, 2, 3, 4], async n => {
            const x = await fakeFilter(n);
            return x;
        });

        useResult(filtered);

        console.log("END FILTER");
    }
)();
```

### Async ```map```

```JavaScript
const fakeAPI = (delay, value) => new Promise(resolve => setTimeout(() => resolve(value), delay));

const useResult = x => console.log(new Date(), x); 

const mapAsync = (arr, fn) => Promise.all(arr.map(fn));

(
    async () => {
        console.log("START MAP");

        const mapped = await mapAsync([1, 2, 3, 4], async n => {
            const x = await fakeAPI(n * 1000, n);
            return x;
        })

        useResult(mapped);

        console.log("END MAP");
    }
)();
```

### Async ```reduce```

```JavaScript
const fakeAPI = (delay, value) => new Promise(resolve => setTimeout(() => resolve(value), delay));

const useResult = x => console.log(new Date(), x); 

const forEachAsync = (arr, fn) => 
    arr.reduce(
        (promise, value) => promise.then(() => fn(value))
    );

const reduceAsync = (arr, fn, init) =>
    Promise.resolve(init).then(
        accum => 
            forEachAsync(arr, async (value, index) => {
                accum = await fn(accum, value, index);
            }).then(() => accum)
    );

const fakeSum = (value1, value2) => 
    new Promise(resolve => setTimeout(() => resolve(value1 + value2), 1000));

(
    async () => {
        console.log("START REDUCE");

        const summed = await reduceAsync(
            [1, 2, 3, 4],
            async (_accum, n) => {
                const accum = await _accum;
                const x = await fakeSum(accum, n);
                useResult(`accumulator = ${accum} value = ${x}`);
                return x;
            },
            0
        );

        useResult(summed);
        console.log("END REDUCE");
    }
)();
```

# 6. Producing Functions - Higher-Order Functions

We can roughly classify the kinds of custom higher-order functions like this:

* **Wrapped functions:** These keep their original functionality while adding some kind of new feature ( e.g. : *logging*, *timing*, *memoization* )
* **Altered functions:** These differ in some key points from their original versions
* **Other productions:** These provide new operations, turn functions into promises, allow enhanced search functions, or decouple methods from objects so that we can use them in other contexts as if they were common functions.

## Timing functions

> If you plan to optimize your code, remember the following three rules: *Don't do it*, *Don't do it yet* and *Don't do it without measuring*. Much bad code arises from early atempts at optimization, so don't start by trying to write optimal code, don't try to optimize until you recognize the need for it, and don't do it haphazardly, without trying to determine the reasons for the slowdonw by measuring all the parts of your application.o

## Arity of functions

> The number of parameters of a function is called the *arity* of the function, or its *valence*. You may speak in three different ways: you can say a function has arity 1, 2, 3, and so on; you can say that a function is unary, binary, ternay and so on; or you can say it's monadic, dyadic, triadic, and so on.

# 7. Transforming Functions - Currying and Partial Application

## Theory

```>```

* ***Currying*** is the process of transforming an *m*-ary function ( that is, a function of arity *m* ) into a sequence of *m* unary functions, each of which receives one argument of the original function, from left to right. ( The first funciton receives the first argument of the original function, and returns a second function that receives the second argument, and returns a third function that receives the third argument, and so on. ) Upon being called with an argument, each function produces the next one in the sequence, and the last one oes the actual calculations.
* ***Partial application*** is the idea of providing *n* arguments to an *m*-ary function, being *n* less or equal to *m*, to transform it into a function with (*m*-*n*) parameters. Each time you provide some arguments, a new function is produceed, with smaller arity. When you provide the last arguments, the actual calculations are performed.
* ***Partial currying*** is a mixture of both of the preceding ideas: you provide *n* arguments (from left to right) to an *m*-ary function and you produce a new function of arity (*m*-*n*). When this new funciton receives some other arguments, and from left to right, it will produce yet another function. When the last parameters are provided, the function produces the correct calculations.

## Currying

***Currying is a tecnique that enables you to only work with single-variable functions, even if you need a multi-variable one.***

### Currying example

Let's say that you have a function that returns the combination between 3 numbers:

```JavaScript
const make3 = (a, b, c) => 100 * a + 10 * b + c;
```

Now, you can curry this function using arrow functions:

```JavaScript
const make3Curry = a => b => c => 100 * a + 10 * b + c;
```

### Curry with ```bind()```

You can also use ```bind()``` in order to curry a function. This is very useful when you don't know the number of parameters that the function takes:

```JavaScript
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
```

The explanation of this code is as follows:

* The first function, ```f1()```, has not received any arguments yet. Its result is a function of a single parameter, which will itself produce a curried version of ```make3()```, with its first argument fixed to whatever it's given.
* Calling ```f1(6)``` produces a new unary function, ```f2()```, which will itself produce a curried version of ```make3()``` - but with its first argument set to ```6```, so actually the ne wfunction will end up fixing the second parameter of ```make3()```
* Similarly, calling ```f2(5)``` produces yet a third unary function, ```f3()```, which will produce a version of ```make3()```, but fixing its third argument, since the first two have already been fixed.
* Finally, when we calculate ```f3(8)```, this fixes the last parameter of ```make3()``` to ```8```, and since there are no more arguments left, the thrice-bound ```make3()``` function is called and the result "658" is produced.

You can also use ```.bind()``` to curry a function with a variable number of parameters:

```JavaScript
const curryByBind2 = (fn, len = fn.length) =>
    len === 0 ? fn() : p => curryByBind2(fn.bind(null, p), len - 1);

const sum2 = (...args) => args.reduce((x, y) => x + y, 0);

console.log(sum2(1, 5, 3));
console.log(sum2(1, 5, 3, 7));
console.log(sum2(1, 5, 3, 7, 4));

curriedSum5 = curryByBind2(sum2, 5);
console.log(curriedSum5(1)(5)(3)(7)(4));
```

## Partial application

***A partial appliaction lets you fix some of the parameters of the function, creating a new function that will receive the rest of them.***

An example:

> Imagine you have a function with 5 parameters. You might want to fix the second and fifth parameters, and partial application would then produce a new version of the function that fixed those two parameters but left the other three open for new calls. If you called the result function with the three requires arguments, it would produce the correct answer, by using the original two fixed parameters plus the newly provided three.

> The idea of specifying only some of the parameters in function application, producing a function of the remaining parameters, is called **projection**: you are said to be *projecting* the function onto the remaining arguments.

Example of a partial application:

```JavaScript
const myParameters = {
    method: "GET",
    headers: new Headers(),
    cache: "default"
}

const myFetch = partial(fetch, undefined, myParameters);

myFetch("a/first/url")
    .then( /* do something */ )
    .catch( /* on error */ )

myFetch("a/second/url")
    .then( /* do something */ )
    .catch( /* on error */ )
```

### Partial application with closures

You can also use closures to build partial applications:

```JavaScript
const partialByClosure = (fn, ...args) => {
    const partialize = (...args1) => (...args2) => {
        for(let i = 0 ; i < args1.length && args2.length ; i++) {
            if(args1[i] === undefined) {
                args1[i] = args2.shift();
            }
        }

        const allParams = [...args1, ...args2];

        return (allParams.includes(undefined) || allParams.length < fn.length
            ? partialize
            : fn)(...allParams);
    };

    return partialize(...args);
}

const make3 = (a, b, c) => String(100 * a + 10 * b + c);

const f1 = partialByClosure(make3, undefined, 4);
const f2 = f1(7);
const f3 = f2(9);
```

* First, it replaces all possible undefined values in ```args1``` with values from ```args2```.
* Then, if any parameters are left in ```args2```, it also appends them to those of ```args2```, producing ```allParams```.
* Finally, if that list of arguments does not include any more undefined values, and it is sufficiently long, it calls the original function.
* Otherwise, it partializes itself, to wait for more parameters.

## Partial currying

***The idea of partial currying is, given a function, to fix its first few arguments and produce a new function that will receive the rest of them. However, if that new function is given fewer arguments, it will fix whatever it was given and produce a newer function, to receive the rest of them, untill all the arguments are given and the final result can be calculated.***

### Partial currying with bind

You can implement partial currying using ```.bind()```:

```JavaScript
const partialCurryingBind = fn =>
    fn.length === 0 
    fn ? fn()
    : (...pp) => partialCurryingBind(fn.bind(nulll, ...pp));

```

Use this type for partial currying a function wtih a variable number of parameters:

```JavaScript
const partialCurryingByBind2 = (fn, len = fn.length) => 
    len === 0
    ? fn()
    : (...pp) => 
        partialCurryingByBind2(
            fn.bind(null, ...pp),
            len - pp.length
        );
```

### Partial currying with closures

```>```

Example:

```JavaScript
const partialCurryByClosure = fn => {
    const curryize = (...args1) => (...args2) => {
        const allParams = [...args1, ...args2];

        return (allParams.length < fn.length ? curryize : fn)(...allParams);
    }

    return curryize();
}
```

Since we are always providign arguments from the left, and there is no way to skip some, you concatenate whatever arguments you ahd with the new ones, and check wheter you got enough. If the new list of arguments has reached the expected arity of the original function, you can call it and get the final result.

# 8. Connecting Functions - Pipelining and Composition

Here are the following topics that will be discussed in this chapter:

* **Pipelining:** A way to join functions together in a similar way to Unix/Linux pipes.
* **Chaining:** This may be considered a variant of pipelining, but is restricted to objects.
* **Composing:** This is a classic operation with its origins in basic computer theory.
* **Transducing:** An optimized way to compose map/filter/reduce operations.

## Pipelining

> Pipelining and composition are techniques that are used to set up functions so that they work in sequence so that the output from a function becomes the input for the next function.

This is how pipelining looks like:

```JavaScript
function pipeline = f, g, h => value => h(g(f(value)))
```

This is how you can build a higher-order pipelining function that builds a pipeline between two functions:

```JavaScript
const pipeTwo = (f, g) => (...args) => g(f(...args));
```

**With pipelining, you are evaluating the first function and its output becomes the input of the second function and the output of the second function becomes the input of the third function, and so on.**

***This is how you build a higher-order pipelining functions for a variable amount of functions:***

```JavaScript
const pipeline = (...fns) => (...args) => {
    let result = fns[0](...args);

    for(let i = 1 ; i < fns.length ; i++) {
        result = fns[i](result);
    }

    return result;
}
```

or, using ```reduce```:

```JavaScript
const pipeline = (...fns) => value =>
    fns.reduce((accumulator, currentFn) => currentFn(accumulator), value);
```

An example of how to use the pipeline:

```JavaScript
const pipeline = (...fns) => value =>
    fns.reduce((accumulator, currentFn) => currentFn(accumulator), value);

const add5 = x => x + 5;
const minus1 = x => x - 1;
const multiplyWith5 = x => x * 5;

const test = pipeline(
    add5,
    minus1,
    multiplyWith5
); // ( x + 5 - 1 ) * 5

console.log(test(6)); // 50
```

### Debugging pipelines

There are two common debugging choices when it comes to pipelines:

1. One solution that comes from the Unix world > the ```tee```.
2. Using wrappers to provide some logs.

#### Using ```tee```

> The first solution implies adding a function to the pipeline, which will just log its input.

This is you can write such a function and simply add it to the sequence of functions that will be pipelined:

```JavaScript
const tee = arg => {
    console.log(arg);
    return arg;
}
```

An even better thing to do would be to give the ```tee``` function the opportuinty to receive different kinds of loggers:

```JavaScript
const tee = (arg, logger=console.log) {
    logger(arg);
    return arg;
}
```

In the example above however, you should be careful with the ```console.log``` since you might have a binding problem. The best solution to go with in order to be safe would be to bind it to the ```console``` API:

```JavaScript
const tee = (arg, logger=console.log.bind(console)) {
    logger(arg);
    return arg;
}
```

If you want to you can write a more enhanced ```tee``` function that can send the logging data to a remote service or debug the information, etc. This is called tapping into the flow of the pipeline. YOu could write something like this, for example:

```JavaScript
const tap = fn => x => (fn(x), x)
```

This wouldn't mess with the receiving args but it wuold pass the args to the ```fn``` function given to the ```tap``` function.

#### Using a loggin wrapper

The second idea that was mentioned was to wrap the functions into a logging wrapper:

```JavaScript
pipeline(
    addLogging(fn1),
    addLogging(fn2),
    addLogging(fn3)
);
```

## Pointfree style

```>```

When you join functions together, either in pipeline fashion or with composition, as we'll see later in this chapter, you don't need any intermediate variables to hold the results that will become arguments to the next function in line: they are implicit. Similarly, you can write functions without mentioning their parameters; this is called the pointfree style.

Pointfree style is also called *tacit* programming. The term *point* itself means a function parameter, while pointfree refers to not naming those parameters.

## Composing

Composition is basically the reverse order of pipelining:

Pipelining:

```JavaScript
function pipeline = f, g, h => value => h(g(f(value)))
```

Composition:

```JavaScript
function composition = f, g, h => value => f(g(h(value)))
```

> The concept of composition is simply - a sequence of function calls, in which the output of one function is the input for the next one - but the order is reverse from the one in pipelining. So, if you have a series of functions, from left to right, whne pipelining, the first function of the series th be applied is the leftmost one, buth when you use composition, you stat with the rightmost one.
> When you define the composition of, say, three function as f, g, h and apply this composition to *x*, this is equivalent to writing *f(g(h(x)))*. It's important to note that, as with pipelining, the arity of the first function to be applied (actually the last one in the list) can be anything, but all the other functions must be unary. Composing is an important tool in FP because it also abstracts implementation details (putting your focus in what you need to accomplish, rather than on the specific details for achieving that), thereby letting you work in a more declarative fashion.

So, as previously mentioned, function composition is the same as function pipelining but with the order of the function reversed. So when we implemented a higher-order function that composes functions, we don't use ```reduce```, we use ```reduceRight```:

```JavaScript
const compose = (...fns) => value =>
    fns.reduceRight((accumulator, currentFn) => currentFn(accumulator), value);
```

In terms of testing and debugging, we can apply the same ideas that we applied to pipelining, however, remember that composition is *reversed*.

## Transducing

```>```

Now, let's consider a performance problem in JavaScript that happens when we're dealing with large arrays and applying several map/filter/reduce operations. If you start with an array and apply such operations, you get the desired result, but many intermediate arrays are created, processsed and discarded - and that causes delays. If you are dealing with short arrays, the extram tiem won't make an impact, but if you are processing larger arrays (as in a big data process, maybe in Node, where you're working with the results of a large database query), then you will havve cause to look for some optimization. We'll do this by learning about a new tool for composing functions: *transducing*.

The problem with most compositions and pipelines is that the processing applies the first transofmraiton to the input array; then, the second transformation is applied to the result array; then the third, and so on. The alternative solutino would be to take the first element of the input array and apply all the transformations in sequence to it. Then, you would need to take the second element of the input array and apply all the transformations to it, then take the third, and so on. In a sort of pseudocode, the difference is between the following schemes:

```
for each transformation to be applied:
    for each element in the input list:
        apply the transformation to the element
```

With this logic, we go transformatino by transformation, applying it to each list and generating a new one. This will require several intermediate lists to be produced. The alternative is as follows:

```
for each element in the input list:
    for each transformation to be applied:
        apply the transformation to the element
```

In this variant, we go element by element and apply all the transformations to it in sequence so that we arrive at the final output list without any intermediate ones.

By using those definitions, instead of a seqeunce of different functions, we will be applying the smae operation  (reduce) at each step, and here is the secret - we change the order of evaluation by composing all the transformations so that they can be applied in a singe pass, with no intermediate arrays whatsoever.

Instead of applying a first reduce operations, passings its result to a second, its result to a third, and so on, we will compose all the reducing functions into a single one!

## Demethodizing

A very important thing, that doesn't have anything to do really with this chapter but can still come in handy at any time is the concept of **demethodizing**.

As the name says, you are demethodizing a method, so you are **transforming a method into a normal function**.

This is very helpful for example when you are trying to work with currying/composition/pipelining since you can for example use methods from Strings and Arrays directly withing the code without building a new string or an array.
You can apply methods that are not made for a specific data types to those specific data types by making them independt of their original prototype.

This one way of writing a demethodizing function:

```JavaScript
const demethodize = fn => (arg0, ...args) => fn.apply(arg0, args);
```

The first argument that it takes is the function that you want to demethodize. Then, it returns a function that takes in, as the first argument, the ```this``` arg used for the ```.apply()``` function and then the ```...args``` are used as the actual arguments for the method.

An example:

```JavaScript
const demethodize = fn => (arg0, ...args) => fn.apply(arg0, args);

const toUpperCase = demethodize(String.prototype.toUpperCase);

console.log(toUpperCase("hello world")); // HELLO WORLD
```

The function ```toUpperCase``` is now the demethodized version of ```String.prototype.toUpperCase```. 
The function ```toUpperCase``` now takes in as the first argument the ```this``` arg, which in our case has to be a string since ```String.prototype.toUpperCase``` is internally modifying the string object itself, which is pointed at by the ```this``` operator. If the ```String.prototype.toUpperCase``` function would have needed more arguments, you could have specified them right after the ```this``` arg.

## Comma Operator

Another important thing to know in FP is the comma operator.

MDN ```>```:

The comma operator (,) evaluates each of its operands (from left to right) and returns the value of the last operand. This lets you create a compound expression in which multiple expressions are evaluated, with the compound expression's final value being the value of the rightmost of its member expressions.

It looks like this:

```
expr1, expr2, expr3...
```

One or more expressions, the last of which is returned as the value of the compound expression.

# 9. Designing Functions - Recursion

> A basic fact of computer science is that whatever you can do with recursion, you can also do with iteration (loops), and vice versa.

## Thinking recursively

```>```

The key to solving problems recursively is assuming that you already have a function that does whatever you need and just calling it normally. If you want to solve a problem by using recursion, you must first have solved it before. On the other hand, if you try to work out in your head how the recursive calls work and attempt to follow th flow in your mind, you'll rpobably just get lost. So what you need to do is the following:

1. Assume you already hav ean appropriate function to solve your problem.
2. See how the big problem can be solved by sovling one (or more) smaller problems
3. Solve those problems by using the imagined function from step 1.
4. Decide what your base cases are. Make sure that they are simple enough that they are sovled directly, without requiring any more calls.

There are three usual methods for solving problems by applying recursion:

* **Decrease and conquer**: solving a problem direclty depends on sovling a single simpler case of itself.
* **Divide and conquer**: The idea is to try to divide your problem into two or more smaller versions, sovle them recursively, and use these solutions to solve the original problem. Here, you have to solve two or more other problems, instead of only one.
* **Dynamic programming**: You solve a complex problem by breaking it into a set of somewhat simpler version of the same problem and sovling each in order. A keay idea in this strategy is to store rpeviously found solutions, so that whenever you find yourself needing the solution to a simpler case again you won't directly apply recursion, but rahter use the stores result and avoid unnecessary repeated calcuations.

## Decrease and conquer - searching

```>```

The most usual case of recursion involves just a single, simple case.

To search for an element in an array, you would also use this decrease and conquer strategy. If the array is empty, then obviously the searched-for value isn't there; otherwise, the reuslt is in the array if and only if it's the first element in it, or if it's in the rest of the array.

```JavaScript
const search = (arr, key) => {
    if (arr.length === 0) {
        return false;
    } else if (arr[0] === key) {
        return true;
    } else {
        return search(arr.slice(1), key);
    }
}

const search2 = (arr, key) => 
    arr.length === 0 ? false : arr[0] === key || search2(arr.slice(1), key);

const search3 = (arr, key) =>
    arr.length && (arr[0] === key || search3(arr.slice(1), key));
```

## Divide and conquery - sorting

```>```

We can see an example of divide and conquer in sorting. A way to sort arrays, called *quicksort*, is based upon the following steps:

1. If yo uarray has 0 or 1 elements, do nothing; it's already sorted (this is the base case).
2. Pick an elemnt of the array (called the **pivot**) and split the rest of the array into two subarrays: the elements smaller than your chosen element and the elements greater than or equal to your chosen element.
3. Recursively sort each subarray.
4. Concatenate both sorted reuslts, with the pivot in-between, to produce the sorted verison of the original array.

```JavaScript
const quicksort = arr => {
    if (arr.length < 2) {
        return arr;
    } else {
        const pivot = arr[0];
        const smaller = arr.slice(1).filter(x => x < pivot);
        const greaterEqual = arr.slice(1).filter(x => x >= pivot);
        return [...quicksort(smaller), pivot, ...quicksort(greaterEqual)];
    }
}

console.log(quicksort([22, 9, 60, 12, 4, 56]));
```

## Dynamic programming

```>```

The third general strategy, dynamic programming, assumes that you will have to solve many smaller problems, but, instead of using recursion each and every time, it dpeneds on you having stored the previously found solutions... memoization, in other words!

## Recursion Techniques

```>```

Here are a couple of recursion techniques:

* **Tail call optimization**, a technique that sppeds up recursion
* **Continuation passing style**, an important FP technique that can help with recursion
* A couple of interestingly named techniques, **trampolines** and **thunks**, which are also common FP tools.
* **Recursion elimination**

### Tail call optimization

When is a recursive call not a recursive call ? If the recursive call is the very last thing a function wil ldo, then the call could be transformed to a simple jump to the start of the function ewithout needing to create a new stack entry. ( Why ? The stack entry wouldn't be required: after the recursive call is done, the function would have nothing else to do, so ther eis no need to further save any of the elements that have been pushed into the stack upon entering the function.  ) The original stack entry would then no longer be needed and could simply be replaced by a new one, corresponding to the recent call.

These calls are known as **tail calls** and have higher efficiency, not only because of the saved stack space, but also because a jump is quite a bit faster than any alternative. If the brwoser implements this enhancement, then it is using a **tail call optimization (TCO)**.

### Continuation passing style

We can transform recursive calls into tail calls by using a well-known FP concept - **continuations**.

In FP parlance, a continuation is something that represents the state of a process and allows processing to conitnue. The key idea is that, when you call a function, you also provice it with a continuation (in reality, a simpel function) that will be called at return time.

Let's look at a trivial example. Suppose you have a function that returns the time of the day and you want to show this on the console. The usual way to do this could be as follows:

```JavaScript
function getTime() {
    return new Date().toTimeString();
}

console.log(getTime());
```

If you were doing **continuation passing style (CPS)**, you would pass a continuation to the ```getTime()``` function. Instaed of returning a calculated value, the function would invoke the conitnuation, giving it the value as a parameter:

```JavaScript
function getTime2(cont) {
    return cont(new Date().toTimeString());
}

getTime2(console.log);
```

What's the difference?
The key is that we can apply this mechanism to make a recursive call into a tail call because all of the code that comes after will be provided in the recursive call itself.

### Trampolines and thunks

A **thunk** is just a nullary function (so, with no parameters) that helps delay a computation, providing a form of **lazy evaluation**. If you have a thunk, then, unless you call it, you won't get its value.
For example, if you want to get the current date and time in ISO format, you could get it with ```new Date().toISOString()````; however, if you provide a thunk that calculates that, you won't get the value until you actually invoke it:

```JavaScript
const getIsoDateAndTime = () => new Date().toISOString();

const isoDateAndTime = getIsoDateAndTime();
```

What's the use of this?
The problem with recursion is that a function calls itself, and calls itself, and calls itself, and so on until the stack blows over. Instead of directly calling itself, we are going to have the function return a thunk, which, when executed, will actually recursively call the function. So, instead of having the stack grow more and more, it will actually be quite flat, since the function will enver get to actually call itself; the stack will grow by one position, when you call the function, and then get back to its size, as soon as the function returns its thunk.

Who gets to do the recursion ? That's where the concept of a **trampoline** comes in. A trampoline is just a loop that calls a function, gets its return, and, if it is a thunk, then it calls it so that recursion will proceed, but in a flat, linear , way ! The loop is exited when the thunk evaluation returns an actual vlaue instead of a new function.

```JavaScript
const trampoline = fn => {
    while(typeof fn === 'function') {
        fn = fn();
    }

    return fn;
}
```

How can we apply this to an actual function? Let's start with a simple one that just sums all the numbers from 1 to *n*, but in a recursive, guaranteed-to-cause-stack-crash fashion. Our simple ```sumAll()``` function could just be the following:

```JavaScript
const sumAll = n => (n == 0 ? 0 :  n + sumAll(n - 1));
```

However, if we start trying this functin out, we'll eventually stumble and get a crash.

The stack problem will come up sooner or later depending on your machine, your memory  size, and so on, but it will come, no doubt about that. Let's rewrite the function in continuation-passing style so that it will become tail recursive. We will just apply the same technique that we saw earlier, as shown in the following code:

```JavaScript
const sumAllC = (n, cont) =>
    n === 0 ? cont(0) : sumAllC(n-1, v => cont(v+n));
```

Now, let's apply a simpler rule: whenver you are going to return from a call, instead return a thunk that will, when executed do the call that you actually wanted to do:

```JavaScript
const sumAllT = (n, cont) =>
    n === 0 ? () => cont(0) : () => sumAllT(n - 1, v => () => cont(v + n));
```

Whnever there would have been a call to a function, we now return a thunk. How do we get to run this function? This is the missing detail. YOu need an initial call that will invoke ```sumAllT()``` the first time and (unless teh function was called with a zero argument) a thunk will be immediately returned. The trampoline function will call the thunk, and that will cause a new call, and so on, until we eventually get a thun kthat simply returns a value, and then the calculation will be ended:

```JavaScript
const sumAll2 = n => trampoline(sumAllT(n, x => x));
```

### Recursion elimination

There's yet one other possibility that you might want to explorer, but that falls beyond the realm of FP and into algorithm design. It's a computer science fact that any algorithm that is implemen ted using recursion has an equivalent version that doesn't use recursion at all and instead depends on a stack. There are ways to systematically transform recursive algorithms into iterative ones, so, if you run out of all options ( that is, if not even continuations or thunks can help you ), then you'd have a final opportunity to achieve your goals by replacing all recursion with iteration.

# 10. Ensuring Purity - Immutability

There are several ways of ensuring impurity:

* Using basic JavaScript ways
* Using persistent data structures

## Mutator Functions

There are a lot of functions that are troublesome, especially when talking about arrays, since they are simply made to change objects, like:

* ```copyWithing()``` lets you copy elements withing the array
* ```fill()``` fills an array with a given value
* ```push()``` and ```pop()``` let you add or delete elements at the end of an array
* ```shift()``` and ```unshift()``` work in the same way as ```push()``` and ```pop()```, but at the beginning of the array.
* ```splice()``` lets you add or delete elements anywhere within the array
* ```reverse()``` and ```sort()``` modify the array in place, reversing its elements or ordering them.

## Constants

If you want to keep an object from getting changed, make it a constant. The only thing that can still change are the values within but new values can't be added.

## Freezing

After an object has been frozen, you won't be able to change it, however, freezing is a *shallow* operation, meaning that if the object has a property that is an object, you'll be able to change the properties of that property object.

## Cloning and mutating

There are several ways of cloning an object:

```JavaScript
let a = Object.assign({}, obj);
let b = {...obj};
let c = array.slice();
let d = [...array];
```

They all have the *shallowness* problem.

You can however make a deep copy of an object using JSON:

```JavaScript
let x = JSON.parse(JSON.stringify(obj));
```

## Lenses and Prisms

```>```

There's another way to get and set values, which goes by the name of *optics*, including *lenses* and *prisms*. Lenses are functional ways of *focusing* on a given spot in an object so that we can access or modify its value in a non-mutating way.

Several libraries provide full implementations of lenses that are production-ready and more complete than what we saw in this chapter; for exampe, check out *Rambda*.

A lense depends on having a getter and a setter for a given attribute.

With lenses, there are three basic operations:

* ```view()```: used to access the value of an attribute
* ```set()```: used to modify the value of an attribute
* ```over()```: used to apply a function to an attribute and change its value

The result of ```set()``` is a new object wiith a change value. Using ```over()``` is similar in that a new object is returned, but in this case, the value is changed by applying a mapping function to it.

es, as we saw in the previous section, are useful for working with *product types*. However, prisms are useful for working with *sum types*. The idea is that a product type is always built out of the same optins, such as an object from a class, while a sum type will likely ahve different structures - extra or missing attributes, for example. When you use a lens, you assume that the object that you'll be applying it to has a known structure with no variations, but what do you use if the object may have different structures ? The answer is prisms.


# 12. Building Better Containers - The Functional Way

## Functors

Functors are functions that take a value and a function. 
The functor is responsible for unwrapping the individual values of the value that's being passed in and then passes each of those into the function. Then it takes the processed values and creates a new structure for those values that it returns. ```map``` and ```filter``` are for example functors.

Example:

```JavaScript
function stringFunctor(value, fn) {
    var chars = value.split("");
    return chars.map(function(char){ 
        return String.fromCharCode(fn(char.charCodeAt(0)))
    }).join("")
}

function plus1(value) {
    return value + 1;
}

function minus1(value) {
    return value - 1;
}

[3, 4].map(plus1) // returns [4, 5]
stringFunctor("ABC", plus1); // returns "BCD"
stringFunctor("ABC", minus1); // returns "RXY"
```