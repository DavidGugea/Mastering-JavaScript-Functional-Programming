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