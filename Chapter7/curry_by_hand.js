const sum = (x, y) => {
    if (x !== undefined && y !== undefined) {
        return x + y;
    } else if(x !== undefined && y == undefined) {
        return z => sum(x, z);
    } else{
        return sum;
    }
}