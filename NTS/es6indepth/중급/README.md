ES6 중급
====

[Symbol](http://hacks.mozilla.or.kr/2015/09/es6-in-depth-symbols/)
----

##### ES6의 새로운 타입

Javascript는 number, string, boolean, object, null, undefined의 6가지 타입을 가지고 있다. Symbol은 ES6에서 새롭게 추가된 7번째 타입이다. Symbol은 오직 객체의 속성에 대한 Key로 사용된다. 

* js의 6가지 타입

		const elements = [1, 'a', true, {}, null, undefined];

		elements.forEach(target => console.log(typeof target));

* Symbol은 new로 생성할 수 없다. Symbol() 함수 호출을 통해서 객체(key)를 생성할 수 있다. 

		const wrong = new Symbol('symbolkey'); // Uncaught TypeError: Symbol is not a constructor

		const symbol = Symbol('someKey');
		console.log(symbol); // Symbol(someKey)


* 생성한 Symbol 객체는 Object의 key로 사용할 수 있다. Symbol을 key로 사용할 경우 항상 대괄호가 필요하다. 

		const object = {};

		object['index'] = 10;

		const index = Symbol('index');
		object[index] = 11;

		console.log(object.index, object[index]); // 10 11

* Symbol의 key는 어떤것도 상관없지만, 가독성과 유지보수를 위해 String으로 사용하는게 바람직하다. 

		[1, 'a', true, {}, null, undefined].forEach(
		   target => console.log(Symbol(target))
		);


* 동일한 key도 언제나 다른 Symbol을 반환한다. Symbol은 항상 고유한 값을 보장한다. 

		const symbolA = Symbol('A')
		   	, symbolB = Symbol('A');

		console.log(symbolA == symbolB); // false

* Symbol을 사용하는 방법은 3가지가 있다. Symbol 함수를 호출하거나, Symbol.for를 이용해 
공유 Symbol을 사용하거나, 내장된 Symbol을 이용할 수 있다. 
		
		// 임의의 key로 symbol을 생성한다. 
		const complete = Symbol('complete');

		// 내부에서 저장되어 공유해서 사용할 수 있는 symbol을 생성한다. 
		const sharedSymbol = Symbol.for('complete');
		console.log(sharedSymbol == Symbol.for('complete')); // true

		// 이미 만들어져 고유 key로 사용되는 symbol을 가져올 수 있다. 
		console.log(Symbol.hasInstance); // Symbol(Symbol.hasInstance)

* object instanceof constructor는 생성자의 Symbol.hasInstance 메소드를 호출하여 결과값을 반환한다. 이를 이용해 instanceof를 확장할 수 있다. 

		// 홀수 
		const odd = {
		   [Symbol.hasInstance](number) {
		      return number % 2;
		   }
		};

		// 짝수
		const even = {
		   [Symbol.hasInstance](number) {
		      return number % 2 == 0;
		   }
		};

		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(n => console.log(n, n instanceof odd));
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(n => console.log(n, n instanceof even));

[반복문과 반복자(iterator)](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-iterators-and-the-for-of-loop/)
----

##### ES5의 반복문

* ES5까지 반복문은 for, for..in, Array.forEach등 아래와 같이 사용해 왔다.

		const indices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

		// 전통적인 반복문
		for(var i = 0; i < indices.length; i++) {
		   console.log(indices[i]);
		}

		// for..in 반복문
		for(let key in indices) {
		   console.log(indices[key]);
		}

		// Array.util 함수
		indices.forEach(n => console.log(n));

* ES6 부터 for..of 반복문이 추가되었다. 대상 객체가 반복자(iterator)라면 각 요소들을 순회하며 코드를 실행해준다. 
		
		// for..of 반복문
		for(let n of [1, 2, 3, 4, 5]) {
		   console.log(n);
		}

* String도 반복자(iterator)이다. 아래와 같이 string을 순회하며 각 character를 가져올 수 있다. 

		// string을 순회하여 원소를 가져온다. 
		for(let char of 'abcdefg') {
		   console.log(char);
		}

* Map과 Set도 for..of 반복문을 통해 순회 가능하다.

		// ES6의 새로운 자료구조 Map과 set도 반복자(iterator)이다. 
		const map = new Map([
		   ['a', 1],
		   ['b', 2],
		   ['c', 3],
		   ['d', 4],
		   ['e', 5],
		]);

		for(let [key, value] of map) {
		   console.log(key, value);
		}

		const set = new Set(['a', 'b', 'c', 'd', 'd']);

		for(let char of set) {
		   console.log(char);
		}

##### 반복자(iterator)

* 앞서 언급한 Array, String, Map, Set은 모두 iterator 메서드를 제공한다. 반복자란 spec에 맞는 iterator 메서드를 가지고 있는 객체라고 할 수 있다. Symbol.hasInstance와 같이 Symbol.iterator 메서드를 추가하면 어떠한 객체라도 반복자가 될 수 있다. 

		// 배열, string, map, set의 iterator 함수를 호출
		[[], 'string', new Map(), new Set()].forEach(
		   target => console.log(target[Symbol.iterator]()) 
		);

* Symbol.iterator는 아래와 같은 객체를 반환한다. 

		const iter = [1, 2, 3, 4, 5][Symbol.iterator]();

		console.log(iter.next()); // {value: 1, done: false}
		console.log(iter.next()); // {value: 2, done: false}
		console.log(iter.next()); // {value: 3, done: false}
		console.log(iter.next()); // {value: 4, done: false}
		console.log(iter.next()); // {value: 5, done: false}
		console.log(iter.next()); // {value: , done: false}

* Iterator의 동작을 아래와 같이 while 문과 for 문으로 작성할 수 있다. 
		
		const iter = [1, 2, 3, 4, 5][Symbol.iterator]();

		// while
		let result = iter.next();

		while(!result.done) {
		   console.log(result.value);
		   result = iter.next();
		}

		// for loop 
		for(let result = iter.next(); !result.done; result = iter.next()) {
		   console.log(result.value);
		}

[이터레이터 활용](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-iterators-and-the-for-of-loop/)
----

##### Symbol.iterator

* Symbol.hasInstance로 instanceof 키워드의 동작을 재정의한 것 처럼 객체에 Symbol.iterator 메소드를 
추가하면 원하는 형태의 iterator를 만들 수 있다. 

		// 무한히 증가하는 iterator
		const unlimited = {
		   [Symbol.iterator]() {
		      let n = 0;

		      return {
		         next() {
		            return {value: n++, done: false};
		         }
		      }
		   }
		}

		for(let n of unlimited) {
		   console.log(n);

		   if(n > 10) break;
		}

* a부터 b - 1까지 증가하는 iterator를 반환하는 range 함수를 만들 수 있다. 

		// Python의 range 함수도 만들 수 있다. 
		function range(a, b) {
		   return {
		      [Symbol.iterator]() {
		         return {
		            next() {
		               if(a >= b) return {done: true};

		               return {value: a++, done: false};
		            }
		         }
		      }
		   }
		}

		for(let n of range(0, 10)) {
		   console.log(n);
		}

* CSS selector에 해당하는 node들을 순회하는 함수를 만들 수 있다.  

		function traverse(selector) {
		   return {
		      [Symbol.iterator]() {
		         const nodes = document.querySelectorAll(selector);
		         let n = 0;

		         return {
		            next() {
		               if(!nodes || n >= nodes.length) return {done: true};

		               return {value: nodes[n++], done: false};
		            }
		         }
		      }
		   }
		}

		for(let dom of traverse('.listItem')) {
		   console.log(dom);
		}

##### [비구조화 할당(Destructuring)](http://hacks.mozilla.or.kr/2015/09/es6-in-depth-destructuring/)

* 아래와 같이 iterator 객체를 분해하여 해당 index의 값을 변수에 할당 할 수 있다.

		let [a, b, c] = [1, 2, 3, 4, 5];

		console.log(a, b, c); // 1 2 3

* String도 iterator 객체이기 때문에 아래와 같이 할당 가능하며, 순서를 건너뛰어 뒤에 있는 요소도 할당 할 수 있다.
		
		let [a, b,,,,c] = 'string';

* 다음과 같이 중첩된 배열안의 요소도 비구조화 할당 할 수 있다. 

		let [a, [b, c], d] = [1, [2, 3], 4];

* Default 값을 설정할 수 있으며, 할당된 값이 undefined인 경우 default 값을 사용한다. 

		let [a, b, c, d = 4] = [1, 2, 3];

* 새롭게 선언하는 변수의 경우 let이나 var, const를 붙여주고, 기존 변수인 경우 생략한다. 
		
		let [a, b] = [1, 2];

		[a, b] = [3, 4];

* 이터레이터 객체라면 비구조화 할당을 할 수 있다. 
		
		/**
		 * 피보나치 수열을 반환하는 함수. 
		 * @return {[type]} [description]
		 */
		function fibonaci() {
		   return {
		      [Symbol.iterator]() {
		         let [a, b] = [0, 1];

		         return {
		            next() {
		               [a, b] = [b, a + b];

		               return {value: a, done: false};
		            }
		         }
		      }
		   }
		}

		let [a, b, c, d, e, f, g] = fibonaci(); // 1 1 2 3 5 8 13

##### Object 비구조화 할당

* Object도 배열과 같이 비구조화 할당할 수 있다.  할당할 속성을 지정하고 변수를 지정한다. 
	
		const ordered = {
		    a: 1, b: 2, c: 3, d: 4, e: 5
		};

		let { a: varA, b: varB, c: varC } = ordered;

		console.log(varA, varB, varC); // 1 2 3

* 객체의 속성과 변수 이름이 동일할 경우 약식 구문으로 사용할 수 있다.

		let { a, b, c, d, e } = ordered;

* 기존에 선언된 변수에 할당할 경우 괄호가 필요하다. 객체 비구조화 할당은 {으로 시작하여 괄호가 없을 경우 syntax error 이다.

		( { a, b, c } = ordered );

* 배열과 똑같이 패턴을 중첩시켜 사용할 수 있다.

		const complicated = { array: [ 1, { second: 2 } ] };

		let { array: [ a, { second } ] } = complicated;

* 배열과 같이 없는 값에 접근할 경우 undefined이며 default 값을 지정할 수 있다.

		let { b = 3 } = { a: 1, c: 2 };

##### 활용

* 객체의 속성에 담긴 값을 바로 가져올 수 있다.
		
		function rotate( t, {x, y} ){

		    let cos = Math.cos(t),
		        sin = Math.sin(t);

		    [ x, y ] = [
		        cos * x - sin * y,
		        sin * x + cos * y
		    ];

		    return { x: x, y: y };
		}

		const point = {x: 20, y: -20};
		rotate( Math.PI, point );

* 여러개의 값을 반환하거나 객체를 반환하는 경우 속성에 저장된 값을 바로 할당 가능하다.

		let { x, y } = rotate( Math.PI / 2, point );

* 설정 객체에 default 값을 줄 수 있다.

		function initialize({
		    async = true,
		    beforeSend = noop,
		    cache = true,
		    complete = noop,
		    crossDomain = false,
		    global = true,
		    // ... more config
		}){
		    // 함수 본문
		}

##### [Spread Operator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_operator)
이터레이터 객체 앞에 ...을 사용하여 함수 인자나 배열 요소, 비구조화 할당 등에 사용할 수 있다.

* 이터레이터 객체의 각 요소를 함수의 인자로 할당한다. 

		function sumAll(a, b, c, d) {
		   return a + b + c + d;
		}

		const params = [1, 2, 3, 4];

		sumAll(...params); // 10

* 배열 내 원소로 할당할 수 있다. 

		const a = [1, 2, 3]
		   	, b = [...a, 4, 5]; // [1, 2, 3, 4, 5]

* 비구조화 할당에서 남은 원소들을 배열에 할당할 수 있다. 

		const [a, b, ...c] = [1, 2, 3, 4, 5]; // c = [3, 4, 5];

* Rest parameter를 이용하면 배열 내 모든 수를 더하는 함수가 된다. 

		function sumAll(...rest) {
		   return rest.reduce((a, b) => a + b);
		}

		console.log(sumAll(...range(1, 11))); // 55


[제너레이터 함수](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/)
----

##### Generator 함수란

* Generator 함수는 원하는 시점까지 코드를 실행하고 차후에 다시 시작할 수 있는 함수이다. Function 키워드 뒤에 *를 붙이고 일반 함수의 return과 비슷한 yield 키워드를 사용할 수 있다. Return과 달리 여러번 호출 할 수 있으며 yield가 호출되면 함수를 멈췄다가 다시 시작할 수 있다. 

		function* helloGen() {
		   yield 'hello';
		   yield 'this is';
		   yield 'Generator';
		}

		const gen = helloGen();

		console.log(gen.next()); // {value: "hello", done: false}
		console.log(gen.next()); // {value: "this is", done: false}
		console.log(gen.next()); // {value: "Generator", done: false}
		console.log(gen.next()); // {value: undefined, done: true}

* Generator 함수를 호출하면 iterator와 동일한 객체가 반환된다. 반환된 객체는 next 메서드를 가지고 있어 iterator와 똑같이 사용할 수 있다. Iterator로 작성한 무한 수열을 Generator로 작성하면 아래와 같다. 

		function* unlimited(i = 0) {
		   while(1) yield i++;
		}

* 아래와 같이 range 함수를 읽기 쉽고 간결하게 작성 가능하다. 

		function* range(a, b) {
		   for(; a < b; ) yield a++;
		}

		console.log(...range(0 ,10)); // 0 1 2 3 4 5 6 7 8 9

* 앞서 작성한 피보나치 수열 반환 함수를 generator로 바꿀 수 있다.

		function* fibonaci(len) {
		   let [a, b] = [0, 1];

		   for(; len--;) {
		      [a, b] = [b, a + b];

		      yield a;
		   }
		}

		console.log(...fibonaci(10)); // 1 1 2 3 5 8 13 21 34 55

* CSS Selector에 해당하는 dom을 순회하는 traverse 함수를 Generator로 바꿀 수 있다.

		function* traverse(selector) {
		   const nodes = document.querySelectorAll(selector);

		   for(let i = 0; i < nodes.length; i++) {
		      yield nodes[i];
		   }
		}

		console.log(...traverse('.listItem'));

* Yield 키워드로 반환하는 객체가 iterator일 경우 yield* 을 사용하면 모든 원소를 yield할 수 있다.  

		function* traverse(selector) {
		   yield* document.querySelectorAll(selector);
		}

* Array의 Util 함수들을 Iterator 용으로 만들 수도 있다. 
		
		function* map(iterator, callback) {
		   for(let t of iterator) {
		      yield callback(t, iterator);
		   }
		}

		function* filter(iterator, callback) {
		   for(let t of iterator) {
		      if(callback(t, iterator)) yield t;
		   }
		}

		function reduce(iterator, callback, init = null) {
		   for(let t of iterator) {
		      if(init == null) {
		         init = t;
		         continue;
		      }

		      init = callback(init, t);
		   }

		   return init;
		}

		console.log(...map(range(1, 11), n => n * n)); // 1 4 9 16 25 36 49 64 81 100
		console.log(...filter(range(1, 11), n => n % 2)); // 1 3 5 7 9
		console.log(reduce(range(1, 11), (a, b) => a + b)); // 55

[프라미스와 비동기 처리](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)
----

##### 정의 

프라미스는 기본적으로 비동기 로직을 위해 사용한다.  지금은 아니지만 나중에 완료될 로직을 성공했을 때와 실패했을 때 두 상황에 대한 callback 함수를 작성하는 것으로 프라미스를 사용할 수 있다. 

* 기본적인 형태는 아래와 같다. 
		
		function excutorCallback(resolve, rejected) {
		   //
		}

		const promise = new Promise(excutorCallback);

		promise.then(completeCallback, failedCallback);

* window.onload = function(){}을 다음과 같이 promise로 바꿔 쓸 수 있다. 

		function excutorCallback(resolve, rejected) {
		   window.onload = function() {
		      resolve();
		   }
		   window.onerror = function() {
		      rejected();
		   }
		}

		const promise = new Promise(excutorCallback);
		promise.then(complete, fail);

		function complete() {
		   console.log('window.onload');
		}
		function fail() {
		   console.log('window.fail');
		}

##### 활용

* 앞서 작성한 코드를 다음과 같이 ready 함수로 추상화 할 수 있다. 

		function ready(target) {
		   return new Promise((resolve, rejected) => {
		      target.onload = () => resolve(target);
		      target.onerror = e => rejected(e);
		   });
		}

		ready(window).then(
		   () => console.log('load'),
		   () => console.log('fail')
		);

* 많이 사용하는 이미지를 로드하는 함수도 다음과 같이 작성할 수 있다. 

		function loadImage(url) {
		   const img = document.createElement('img');
		   img.src = url;

		   return ready(img);
		}

		loadImage('img/a.png').then(
		   img => document.body.appendChild(img),
		   e => console.warn(e)
		)

executor 내부에서 비동기 처리가 성공적으로 수행되었을 때 resolve를, 실패했을 때 reject를 호출하여 해당 promise 객체에 .then()으로 추가된 다음 callback으로 원하는 인자와 함께 넘겨줄 수 있다. .then()과 .catch()는 모두 promise 객체를 반환하기 때문에 method chain을 통해 일련의 작업을 처리한다. .then()의 rejected callback은 생략할 수 있다. then이 없을 경우 .catch()로 추가된 rejected callback을 찾아 호출한다.

		loadImage('img/a.png')
		   .then(img => applyFilter(img))
		   .then(img => document.body.appendChild(img))
		   .catch(e => console.log('img loadFail'));

		function applyFilter(img) {
		   img.style.filter = 'grayscale(100%)';

		   return img;
		}

* 네이버 개발자 API를 활용한 이미지 검색 예제이다. ES5 버전으로 작성하면 다음과 같다. 

		const url = 'https://es6-study-dnvy0084.c9users.io?query=김연아';

		function request(url, complete, fail) {
		   const req = new XMLHttpRequest();
		   req.open('GET', url);
		   req.send(null);

		   req.onload = () => complete(req.responseText);
		   req.onerror = () => fail(e);
		}

		function loadImage(url, complete, fail, img = document.createElement('img')) {
		   img.src = url;
		   img.onload = () => complete(img);
		   img.onerror = e => fail(e);
		}

* 중첩된 callback으로 인해 코드를 한눈에 파악하기 힘들다. 

		request(url, function(response) {
		   const json = JSON.parse(response);

		   let completed = 0;

		   for(var i = 0; i < json.items.length; i++) {
		      const item = json.items[i];

		      loadImage(item.thumbnail, function(img) {
		         img.width = item.sizewidth;
		         img.height = item.sizeheight;

		         document.body.appendChild(img);

		         loadImage(item.link, function() {
		            if(++completed >= json.items.length) {
		               console.log('complete all');
		            }
		         }, null, img)
		      })
		   }
		});

* Promise를 사용해 다음과 같이 정리할 수 있다. 
		
		function requestP(url) {
		   return new Promise((resolve, rejected) => {
		      const req = new XMLHttpRequest();
		      req.open('GET', url);
		      req.send(null);

		      req.onload = () => resolve(req.responseText);
		      req.onerror = () => rejected(e);
		   });
		}

		function ready(target) {
		   return new Promise((resolve, rejected) => {
		      target.onload = () => resolve(target);
		      target.onerror = e => rejected(e);
		   });
		}

		function loadImageP(url, img = document.createElement('img')) {
		   img.src = url;

		   return ready(img);
		}

* 순서도를 작성하듯 콜백 함수들을 연결하여 유연하게 개발 가능하다. 

		function resizeAndAppend(img, w, h) {
		   img.width = w;
		   img.height = h;

		   document.body.appendChild(img);

		   return img;
		}

		function loadSingleImage(item) {
		   return loadImageP(item.thumbnail)
		      .then(img => resizeAndAppend(img, item.sizewidth, item.sizeheight))
		      .then(img => loadImageP(item.link, img));
		}

		requestP(url)
		   .then(response => JSON.parse(response))
		   .then(json => json.items.map(item => loadSingleImage(item)))
		   .then(promises => Promise.all(promises))
		   .then(images => console.log('complete all', images));

[제너레이터와 프라미스 활용](http://hacks.mozilla.or.kr/2016/02/es6-in-depth-generators-continued/)
----

##### 제너레이터 함수로 값 전달

* .next(value)를 이용해 대기중인 제너레이터 본문으로 값을 보낼 수 있다. 

		function* generator() {
		   console.log('generator start');

		   const a = yield 1
		      , b = yield 2
		      , c = yield 3;

		   console.log('generator complete', a, b, c);
		}

		const gen = generator();

		console.log(gen.next()); // {value: 1, done: false}
		console.log(gen.next('A')); // {value: 2, done: false}
		console.log(gen.next('B')); // {value: 3, done: false}
		console.log(gen.next('C')); // {value: undefined, done: true}

* .next(value)를 이용하면 비동기 로직을 동기 로직처럼 작성할 수 있다.

		function loadImage(url, complete, fail, img = document.createElement('img')) {
		   img.src = url;
		   img.onload = () => complete(img);
		   img.onerror = e => fail(e);
		}

		function* asyncload(url, complete, fail) {
		   const img = yield loadImage(url, complete, fail);
		   
		   document.body.appendChild(img);
		}

		const gen = asyncload('img/a.png', img => gen.next(img));
		gen.next();

* 프라미스를 사용하면 다음과 같다.   

		function loadImageP(url, img = document.createElement('img')) {
		   img.src = url;
		   return ready(img);
		}

		function* asyncload(url) {
		   const img = yield loadImageP(url);
		   document.body.appendChild(img);
		}

		const gen = asyncload('img/a.png');
		gen.next().value.then(img => gen.next(img));

* yield의 결과 오브젝트 value가 프라미스일 경우 result.value.then을 이용해 일괄 처리가 가능하다. 실제로 generator와 promise를 이용해 비동기 로직을 처리하는 co라는 라이브러리가 존재한다. 아래와 같이 비슷하게 흉내낼 수 있다. 

		function co(generator) {
		   const gen = generator();

		   function next(result) {
		      if(result.done) return;

		      result.value
		         .then(o => gen.next(o))
		         .then(result => next(result));
		   }

		   next(gen.next());
		}

* 앞서 작성한 예제를 co 함수를 이용해 아래와 같이 바꿀 수 있다. 

		co(function* (){
		   const img = yield loadImageP('img/a.png');

		   document.body.appendChild(img);
		});

* 네이버 개발자 센터의 이미지 검색 예제도 다음과 같이 작성 할 수 있다. 

		const url = 'https://es6-study-dnvy0084.c9users.io?query=김연아';

		co(function* (){
		   const responseText = yield requestP(url)
		      , json = JSON.parse(responseText);

		   for(let item of json.items) {
		      const img = yield loadImageP(item.thumbnail);

		      img.width = item.sizewidth;
		      img.height = item.sizeheight;

		      document.body.appendChild(img);

		      yield loadImageP(item.link, img);
		   }

		   console.log('complete all');
		});

[Proxy](http://hacks.mozilla.or.kr/2016/03/es6-in-depth-proxies-and-reflect/)
----

##### Proxy

* Proxy는 대리인이다.
* Proxy를 이용하면 javascript 내부 함수를 오버라이드 할 수 있다.
* getPrototypeOf, setPrototypeOf, get, set, call, construct등 javascript object에는 덮어씌울 수도, 지울수도 없는 빌트인(builtin 혹은 internal) 함수가 14개 있다. [여기]
(http://www.ecma-international.org/ecma-262/6.0/index.html#sec-object-internal-methods-and-internal-slots)에서 table 5, table 6을 참고
* Proxy는 다음과 같이 선언한다. 

        const proxy = new Proxy( target, handler );

* proxy 객체는 target의 대리인으로 작동한다. 
        
        let target = {}, 
            handler = {};

        const proxy = new Proxy( target, handler );

        proxy.color = 'red';

        console.log( target.color ); // red

* handler 객체를 통해 내부 함수를 오버라이드 한다. 

        handler = {
            get: function( target, key, receiver ){
                conosle.log( `getting key: ${key}` );

                Reflect.get( target, key, receiver );
            }
        };

* Proxy는 상용으로 사용하기에는 이르다. Proxy polyfill 또한 존재하지 않는다. 

[ES7](http://hacks.mozilla.or.kr/2016/07/es6-in-depth-the-future/)
----

##### ECMAScript 표준

ECMAScript는 표준을 여러 단계로 구분한다. 이 단계는 Stage 0 - Strawman, Stage 1 - Proposal, Stage 2 - Draft, Stage 3 - Candidate, Stage 4 - Finished로 나누어 지고 숫자가 적은 단계가 상위 단계를 모두 포함하고 있다. 

[https://github.com/tc39/ecma262](https://github.com/tc39/ecma262) 저장소에서 단계별로 나누어진 표준 API들을 확인할 수 있다. 

##### Array.includes

해당 원소가 있을 경우 true를 반환한다. 

		const a = [1, 2, 3, 4, 5, 6];

		console.log(a.includes(3)); // true
		console.log(a.includes(10)); // false

		// if(a.indexOf(10) == -1) {} <-- 이렇게 비교하지 않아도 된다. 


##### Exponentiation operator

지수 연산자. 둘째 피연산자의 승수로 첫째 피연산자를 거듭 제곱한다. 

		console.log(2 ** 4); // 16

##### Async function

Generator와 Promise를 통해 만든 co 함수처럼 사용할 수 있는 함수이다.  

		function loadImage(url, img = document.createElement('img')) {
		   img.src = url;

		   return new Promise((resolve, reject) => {
		      img.onload = resolve(img);
		      img.onerror = e => reject(e);
		   })
		}

		async function appendImage(url) {
		   const img = await loadImage(url);

		   document.body.appendChild(img);
		}

		window.onload = () => appendImage('img/a.png');
