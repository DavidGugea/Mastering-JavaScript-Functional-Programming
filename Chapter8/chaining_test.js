class City {
    constructor(name, lat, long) {
        this.name = name;
        this.lat = lat;
        this.long = long;
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }

    setLat(newLat) {
        this.lat = newLat;
    }

    setLong(newLong) {
        this.long = newLong;
    }

    getCoords() {
        return [this.lat, this.long];
    }
}


const getHandler = {
    get(target, property, receiver) {
        if (typeof target[property] === 'function') {
            // requestion a method? return a wrapped version
            return (...args) => {
                const result = target[property](...args);
                return result === undefined ? receiver : result;
            }
        } else {
            // an attribute was requested - just return it
            return target[property];
        }
    }
}

const chainify = obj => new Proxy(obj, getHandler);

let myCity = new City("Montevideo, Urugay", -34.9011, -56.1645);
myCity = chainify(myCity);

console.log(
    myCity
    .setName("Pune, India")
    .setLat(18.5626)
    .setLong(73.8087)
    .getCoords(),
    myCity.getName()
);