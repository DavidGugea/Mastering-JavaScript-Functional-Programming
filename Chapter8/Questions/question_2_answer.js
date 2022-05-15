const getField = attr => obj => obj[attr];
const filter = fn => arr => arr.filter(fn);
const map = fn => arr => arr.map(fn);
const reduce = (fn, init) => arr => arr.reduce(fn, init);

const pending = (listOfTasks, name) =>
    pipeline(
        getField("byPerson"),
        filter(t => t.responsible === name),
        map(t => t.tasks),
        reduce((y, x) => x, []),
        filter(t => t && !t.done),
        map(getField("id"))
    )(allTasks || {byPerson: []});