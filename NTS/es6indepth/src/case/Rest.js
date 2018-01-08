function addAll(...rest) {
    var n = 0;

    for (let i = 0; i < rest.length; i++) {
        n += rest[i];
    }

    return n;
}

function containsAll(arr, ...rest) {
    for (var i = 0; i < rest.length; i++) {
        if (arr.indexOf(rest[i]) != -1) return false;
    }

    return true;
}

console.log(containsAll([1, 2, 3, 4, 5], 3));

function add(a = 0, b = 0) {
    return a + b;
}

console.log(add());

function temp(a = 0, b = a % 2 == 0 ? 'even' : 'odd') {
    return b;
}

console.log(temp(4));