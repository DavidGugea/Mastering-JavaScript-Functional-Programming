const flatAll = arr => 
    arr.reduce(
        (accumulator, value) => accumulator.concat(Array.isArray(value) ? flatAll(value) : value), []
    );

const flatOne1 = arr => [].concat(...arr);
const flatOne2 = arr => arr.reduce((accumulator, value) => accumulator.concat(value), []);

if(!Array.prototype.flat) {
    Array.prototype.flat = function(n = 1){
        this.flatAllX = () => this.reduce(
            (accumulator, value) => accumulator.concat(Array.isArray(value) ? value.flat(Infinity) : value),
            []
        );

        this.flatOneX = () => thid.reduce(
            (accumulator, value) => accumulator.concat(value), []
        );

        return n === Infinity
            ? this.flatAllX()
            : n === 1
            ? this.flatOneX()
            : this.flatOneX().flat(n - 1);
    }
}