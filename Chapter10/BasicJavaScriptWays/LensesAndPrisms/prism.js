const author = {
    user: "fkereki",
    name: {
        first: "Federico",
        middle: "",
        last: "Kereki"
    },
    books: [{
            name: "Google Web Toolkit",
            year: 2010
        },
        {
            name: "Functional Programming",
            year: 2017
        },
        {
            name: "JavaScript Cookbook",
            year: 2018
        },
    ],
};

const pUser = prismProp("user");
console.log(review(pUser, author).toString());