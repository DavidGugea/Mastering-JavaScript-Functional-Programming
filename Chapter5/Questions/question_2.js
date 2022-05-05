const characters = [
    {name: "Fred", plays: "bowling"},
    {name: "Barney", plays: "chess"},
    {name: "Wilma", plays: "bridge"},
    {name: "Betty", plays: "checkers"},
    {name: "Pebbles", plays: "chess"},
];

const build_ul_in_dev_with = arr => {
    let returnString = "<div><ul>";

    arr.forEach(
        (value) => ( value.plays === "chess" || value.plays === "checkers" ) ? returnString += `<li>${value.name}</li>` : undefined
    );

    returnString += "</ul></div>";
    return returnString;
}

console.log(build_ul_in_dev_with(characters));