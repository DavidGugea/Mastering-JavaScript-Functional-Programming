const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const randomizer = (...fns) => (...args) => {
    return fns[random(0, fns.length - 1)].apply(this, args);
}

const add = (a, b) => a + b;
const minus = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const pick = randomizer(add, minus, multiply, divide);
for (let i = 0; i < 101; i++) {
    console.log(pick(5, 7));
}