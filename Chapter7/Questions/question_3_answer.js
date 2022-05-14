Function.prototype.curry = function () {
    return this.length === 0 ? this() : p => this.bind(this, p).curry();
}