/*
    * If we want to pipeline a single function, then that's the result of the pipeline.
    * If we want to pipeline several functions, then we must fisrt apply the initial function, and then pass that result as input to the pipeline of the other functions.
*/

const pipelineR = (first, ...rest) => {
    rest.length === 0
        ? first
        : (...args) => pipelineR(...rest)(first(...args));
}