const SIZE = 8;
let places = Array(SIZE);
let solutions = 0;

const checkPlace = (column, row) =>
    places
    .slice(0, column)
    .every((v, i) => v !== row && Math.abs(v - row) !== column - i);

const checkPlace2 = (column, row) => {
    const checkColumn = i => {
        if (i == column) {
            return true;
        } else if (
            places[i] == row ||
            Math.abs(places[i] - row) == column - i
        ) {
            return false;
        } else {
            return checkColumn(i + 1);
        }
    };

    return checkColumn(0);
}

const finder = (column = 0) => {
    if (column == SIZE) {
        // all columns tried out?
        console.log(places.map(x => x + 1)); // print out solution
        solutions++; // count it
    } else {
        const testRowsInColumn = j => {
            if (j < SIZE) {
                if (checkPlace(column, j)) {
                    places[column] = j;
                    finder(column + 1);
                }

                testRowsInColumn(j + 1);
            }
        };

        return testRowsInColumn(0);
    }
};