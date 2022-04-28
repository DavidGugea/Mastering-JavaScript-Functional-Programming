const bind_polyfill = function(args){
    let that = this
    return function() {
        return that.apply(context, arguments);
    }
}