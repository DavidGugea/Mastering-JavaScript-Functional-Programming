const setField = (attr, value, obj) => {
    Object.defineProperty(obj, attr, {
        value: value,
    });
}