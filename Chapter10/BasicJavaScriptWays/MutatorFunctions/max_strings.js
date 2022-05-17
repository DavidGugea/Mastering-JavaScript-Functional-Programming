const maxStrings = a => a.sort().pop();
const maxStrings2 = a => [...a].sort().pop();
const maxStrings3 = a => a.slice().sort().pop();

let countries = ["Argentina", "Uruguay", "Brasil", "Paraguay"];

console.log(maxStrings3(countries));
console.log(countries);