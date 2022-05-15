const curry = (fn, len = fn.length) =>
    len === 0 ? fn() : p => curry(fn.bind(null, p), len - 1);


function getDir(path) {
    const fs = require('fs');
    const files = fs.readdirSync(path);
    return files;
}

const filterByText = (text, arr) => arr.filter(v => v.endsWith(text));
const filterOdt = arr => filterByText(".odt", arr);
const filterOdt2 = curry(filterByText)(".odt");
const count = arr => arr.length;

const countOdtFiles = path => {
    const files = getDir(path);
    const filteredFiles = filterOdt(files);
    const countOfFiles  =count(filteredFiles);
    return countOfFiles;
}

countOdtFiles("/home/david/documents");