const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// forEach(callBack)
/*
a.forEach(function(value, index, array) {
    console.log(value, index, array);
});
*/

// a.forEach(n => console.log(n));

// map(callBack)
// 각 값마다 연산 후 return
let t = a.map(function(n) {
    return n * n;
});

t = a.map(n => n + 1);
console.log(t);

// filter(callBack)
// true가 되는 것만 return
t = a.filter(function(n) {
    return n % 2;
})

t = a.filter(n => n % 2 == 0);
console.log(t);

// reduce(callBack)
// return 값을 다시 a에 초기화해서 Loop
t = a.reduce(function(a, b) {
    return a + b;
});
t = a.reduce((a, b) => a * b)

console.log(t);

// every(callBack)
// 모두 리턴이 true면 true가 된다.
t = a.every(function(n) {
    return n < 11;
});
t = a.every(n => n < 11);
console.log(t);

// some(callBack)
// 하나라도 true라면 true이다.
t = a.some(n => n < 5);
console.log(t);

// sort(callBack)
// 배열의 정렬
const ul = [45, 60, 800, 1, 0, 50];
ul.sort(function(a, b) {
    if (a > b) return -1;
    if (a < b) return 1;

    return 0;
});
ul.sort((a, b) => a < b ? -1 : a > b);
console.log(ul);