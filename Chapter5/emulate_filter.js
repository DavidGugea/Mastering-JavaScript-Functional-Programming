const serviceResult = {
    accountsData: [
        {
            id: "F220960K",
            balance: 1024,
        },
        {
            id: "S120456T",
            balance: 2260,
        },
        {
            id: "J140793A",
            balance: -38,
        },
        {
            id: "M120396V",
            balance: -114,
        },
        {
            id: "A120289L",
            balance: 55000,
        },
    ]
}


const myFilter = (arr, fn) => 
    arr.reduce(
        (accumulator, currentValue) => (fn(currentValue) ? accumulator.concat(currentValue) : accumulator), []
    );

console.log(myFilter(serviceResult.accountsData, v => v.balance < 0));