const applyStyle = tag => textToApplyStyleTo => `<${tag}>${textToApplyStyleTo}</${tag}>`;

const makeBold = applyStyle("b");
console.log(makeBold("hello world bold"));

const makeUnderline = applyStyle("u");
console.log(makeUnderline("hello world underline"));