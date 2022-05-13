const myParameters = {
    method: "GET",
    headers: new Headers(),
    cache: "default"
}

const myFetch = partial(fetch, undefined, myParameters);

myFetch("a/first/url")
    .then( /* do something */ )
    .catch( /* on error */ )

myFetch("a/second/url")
    .then( /* do something */ )
    .catch( /* on error */ )