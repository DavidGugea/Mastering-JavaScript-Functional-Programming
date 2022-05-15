const markers = [
    {name: "AR", lat: -34.6, lon: -58.4},
    {name: "BO", lat: -16.5, lon: -68.1},
    {name: "BR", lat: -15.8, lon: -47.9},
    {name: "CL", lat: -33.4, lon: -70.7},
    {name: "CO", lat: 4.6, lon: -74.0},
    {name: "EC", lat: -0.3, lon: -78.6},
    {name: "PE", lat: -12.0, lon: -77.0},
    {name: "PY", lat: -25.2, lon: -57.5},
    {name: "UY", lat: -34.9, lon: -56.2},
    {name: "VE", lat: 10.5, lon: -66.9}
];


const sum = (a, b) => a + b;
const average = arr => arr.reduce(sum, 0) / arr.length;
const getField = attr => obj => obj[attr];

const myMap = curry(flipTwo(demethodize(array.prototype.map)));
const getLat = curry(getField)("lat");
const getAllLats = curry(myMap)(getLat);

let averageLat = pipeline(getAllLats, average);