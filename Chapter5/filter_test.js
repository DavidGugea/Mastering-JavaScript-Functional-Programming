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

const delinquent = serviceResult.accountsData.filter(
    value => value.balance < 0
);

const delinquentIds = delinquent.map(value => value.id)
const delinquentIds2 = serviceResult.accountsData
    .filter(value => value.balance < 0)
    .map(value => value.id);

console.log(delinquent);
console.log(delinquentIds);
console.log(delinquentIds2);