const getRandomLetter = () => {
    const min = "A".charCodeAt();
    const max = "Z".charCodeAt();

    return String.fromCharCode(
        Math.floor(Math.random() * (1+max-min)) + min
    );
}

const getRandomFileName = (fileExtension = "") => {
    const NAME_LENGTH = 12;
    let namePart = new Array(NAME_LENGTH);
    for(let i = 0 ; i < NAME_LENGTH; i++) {
        namePart[i] = getRandomLetter();
    }

    return namePart.join("") + fileExtension;
}