const toCSV = data => data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.reduce(
        (accumulator, currentValue, index, array) => accumulator + currentValue + (index === array.length - 1 ? "" : ", "),
        ""
    ) + "\\n",
    ""
)

let myData = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
];

console.log(toCSV(myData));