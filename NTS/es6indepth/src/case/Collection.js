const o = {a: 1, b: 2, c: 3};

function size(o) {
    let n = 0;

    for (let k  in o) n++;

    return n;
}


// Set

const set = new Set();
// new Set(Iterator)
const set2 = new Set([1, 2, 2, 3, 3, 3]);
console.log(set, set2);

set.add(1);
set.add(2);
set.add(3);
set.add(3);
set.add(3);

console.log(set);
console.log(set.has(3), set.size);

set.delete(3);
console.log(set);


// Map

const map = new Map();
const map2 = new Map([['a', 1], ['b', 2], ['c', 3]]);

map.set('a', 1);
map.set('b', 2);
map.set('c', 3);

console.log(map.size);

map.delete('b');

console.log(map);

console.log(...map.keys());
console.log(...map.values());
console.log(...map.entries());

for (let [key, value] of map) {

}

// WeakMap => GC가 자동으로 관리해준다.
// key값에 못쓰는 타입도 있고, property도 적고 제한적인 부분이 많다.
// WeakSet도 마찬가지이다..