const reverseString = str => {
    let arr = str.split("");
    arr.reverse();
    return arr.join("");
}

const reverseString2 = str => str.split("").reduceRight(
    (accumulator, value) => accumulator + value,
    ""
);

console.log(reverseString2("HELLOWORLD"));