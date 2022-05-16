const search = (arr, key) => {
    if (arr.length === 0) {
        return false;
    } else if (arr[0] === key) {
        return true;
    } else {
        return search(arr.slice(1), key);
    }
}

const search2 = (arr, key) => 
    arr.length === 0 ? false : arr[0] === key || search2(arr.slice(1), key);

const search3 = (arr, key) =>
    arr.length && (arr[0] === key || search3(arr.slice(1), key));