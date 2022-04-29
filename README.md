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