var a = 1;
let b = 2; // 변수
const c = 3; // 상수

// let: 블록을 기준으로 스코프를 설정한다

if (true) {
    var varA = 1;
}
console.log(varA);

if (true) {
    let varB = 2;
}

/*
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, i * 100);
}
*/

for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, i* 100);
}

var temp = 1;
var temp = 1;

/*
let 은 호이스팅이 발생하지 않기 때문에 error 이다.
let temp2 = 1;
let temp2 = 1;
*/

/*
const 는 상수로 재할당할 수 없다.
const c = 1;
c = 2;
*/