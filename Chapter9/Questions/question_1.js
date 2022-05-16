let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const reverse = (arr) => {
    let returnArr = [];

    const innerReverse = (i=arr.length-1) => i == -1 ? undefined : (returnArr.push(arr[i]), innerReverse(i-1))

    innerReverse();
    return returnArr;
}

console.log(reverse(arr));