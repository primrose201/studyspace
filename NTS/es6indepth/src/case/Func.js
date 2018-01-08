// 람다표현식
(a, b) => a + b;

// 익명함수로 사용 가능
const add = (a, b) => a + b;

// 매개변수가 1개 일때는 괄호 생략 가능
n => n * n;

() => console.log('hello, world');

// 블록이 있을 때는 return 키워드를 사용한다.
(...rest) => {
    let n = 0;

    for (let i = 0; i < rest.length; i ++) {
        n += rest[i];
    }

    return n;
}


// 객체를 리턴할 때 괄호로 묶어줘야 한다.
() => ({x: 1, y: 2, z: 3});

// 람다표현식에서는 argument가 없다. 하지만 여기서는 es5로 변환시키기 때문에 나오는 것 처럼 보일 것이다.
(() => console.log(arguments))();

// 내부함수의 경우에 this 는 글로벌 객체지만, 람다표현식을 사용하면 제대로 받는다.
const caller = {
    f() {
        setTimeout(() => console.log(this), 100);
    },
    f2() {
        setTimeout(function() {
            console.log(this);
        }, 200)
    }
}
caller.f();
caller.f2();