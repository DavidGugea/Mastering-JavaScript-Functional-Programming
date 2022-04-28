const fs = require("fs");

fs.readFile("someFile.txt", (err, data) => {
    if(err) {
        console.log(err);
    } else{
        console.log(data.toString())
    }
})