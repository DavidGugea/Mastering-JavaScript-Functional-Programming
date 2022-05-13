const partialCurryByClosure = fn => {
    const curryize = (...args1) => (...args2) => {
        const allParams = [...args1, ...args2];

        return (allParams.length < fn.length ? curryize : fn)(...allParams);
    }

    return curryize();
}