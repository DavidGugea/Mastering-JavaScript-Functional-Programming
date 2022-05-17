const getField = attr => obj => obj[attr];

const deepFreeze = obj => {
    if (obj && typeof obj === "object" && !Object.isFrozen(obj)) {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach(prop => deepFreeze(obj[prop]));
    }

    return obj;
}

const deepCopy = obj => {
    let aux = obj;
    if (obj && typeof obj === "object") {
        aux = new obj.constructor();
        Object.getOwnPropertyNames(obj).forEach(
            prop => (aux[prop] = deepCopy(obj[prop]))
        )
    }

    return aux;
}

const getByPath = (arr, obj) => {
    if (arr[0] in obj) {
        return arr.length > 1 ?
            getByPath(arr.slice(1), obj[arr[0]]) :
            deepCopy(obj[arr[0]])
    } else {
        return undefined;
    }
}

const setByPath = (arr, value, obj) => {
    if (!(arr[0] in obj)) {
        obj[arr[0]] =
            arr.length === 1 ? null : Number.isInteger(arr[1]) ? [] : {};
    }

    if (arr.length > 1) {
        return setByPath(arr.slice(1), value, obj[arr[0]]);
    } else {
        obj[arr[0]] = value;
        return obj;
    }
}

const updateObject = (arr, obj, value) => {
    let newObj = deepCopy(obj);
    setByPath(arr, value, newObj);
    return deepFreeze(newObj);
}

let myObj3 = {
    d: 22,
    m: 9,
    o: {
        c: "MVD",
        i: "UY",
        f: {
            a: 56
        }
    }
};

deepFreeze(myObj3);