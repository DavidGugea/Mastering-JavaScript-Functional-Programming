const addVAT = (rate, amount) => amount * (1 + rate / 100);

console.log(addVAT(20, 500));
console.log(addVAT(15, 200));

const addVATcurried = rate => amount => amount * (1 + rate / 100);
const addNationalVAT = addVATcurried(6);

console.log(addNationalVAT(1500));