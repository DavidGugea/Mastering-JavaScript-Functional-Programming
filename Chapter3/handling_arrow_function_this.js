function ShowItself1(identity) {
    this.identity = identity;

    setTimeout(
        function() {
            console.log(this.identity);
        },
        1000
    );
}

function ShowItself2(identity) {
    this.identity = identity;
    let that = this;

    setTimeout(
        function() {
            console.log(that.identity);
        },
        1000
    );

    setTimeout(
        function() {
            console.log(this.identity);
        }.bind(this),
        2000
    );

    setTimeout(
        () => {
            console.log(this.identity);
        },
        3000
    );
}

const x = new ShowItself1("Functional");
const y = new ShowItself2("JavaScript");