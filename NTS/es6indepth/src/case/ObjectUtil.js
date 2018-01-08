function each(o, callback) {

    for (let key in o) {
        callback(o[key], key, o);
    }
}

function filter(o, callback) {
    const result = {};

    each(o, (v, k, obj) => {
        if (callback(v, k, obj)) result[k] = v;
    });

    return result;
}

/*
function reduce(o, callback, initialValue) {
    let t = initialValue;
    for(let key in o){
        if(typeof t === 'undefined') {
            t = o[key];
            continue;
        }
        t = callback(t, o[key]);
    }
    return t;
}
 */

function reduce(o, callback, init) {
    let t = init;

    each(o, (v, k, obj) => {
       if (t === undefined) {
           t = v;
           return;
       }
       t = callback(t, v, k, obj);
    });

    return t;
}

function every(o, callback) {
    return reduce(o, (a, b, k, obj) => a && callback(b, k, obj), true);
}

function some(o, callback) {
    return reduce(o, (a, b, k, obj) => a || callback(b, k, obj), false);
}

const o = {
    a: 1, b: 2, c: 3, d: 4, e: 5
}

let t;

// each(o, (v, k, obj) => console.log(v));

t = filter(o, n => n % 2);
t = every(o, n => n < 6);
t = some(o, n => n < 3);
t = reduce(o, (a, b) => a + b);
console.log(t);

