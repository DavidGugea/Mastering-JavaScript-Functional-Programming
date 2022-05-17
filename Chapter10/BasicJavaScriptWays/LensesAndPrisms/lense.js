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

const getField = attr => obj => obj[attr];

const curry = (fn, len = fn.length) =>
    len === 0 ? fn() : p => curryByBind2(fn.bind(null, p), len - 1);

const lens = (getter, setter) => ({
    getter,
    setter
});
const lensProp = attr => lens(getField(attr), setField(attr));
const view = curry((lens, obj) => lens.getter(obj));
const set = curry((lens, newVal, obj) => lens.setter(newVal, obj));
const over = curry((lens, mapfn, obj) =>
    lens.setter(mapfn(lens.getter(obj)), obj)
);
const composeTwoLenses = (lens1, lens2) => ({
    getter: obj => lens2.getter(lens1.getter(obj)),
    setter: curry((newVal, obj) =>
        lens1.setter(lens2.setter(newVal, lens1.getter(obj)), obj)
    ),
});