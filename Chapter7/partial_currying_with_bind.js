const partialCurryingBind = fn =>
    fn.length === 0 
    fn ? fn()
    : (...pp) => partialCurryingBind(fn.bind(nulll, ...pp));

const partialCurryingByBind2 = (fn, len = fn.length) => 
    len === 0
    ? fn()
    : (...pp) => 
        partialCurryingByBind2(
            fn.bind(null, ...pp),
            len - pp.length
        );