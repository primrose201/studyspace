ES6 in Depth
====

[ECMAScript](https://ko.wikipedia.org/wiki/ECMA%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)
----

Ecma 인터내셔널이라는 비영리 기구에 의해 표준화된 스크립트 언어이다. 넷스케이프에서 지원하기 시작한 자바스크립트를 Ecma 인터네셔널에 표준화를 위해 제출하였고, 1997년 6월 채택되어 Ecma스크립트가 되었다. 그 후 Ecma 인터네셔널은 아래 표와 같이 지속적으로 업그레이드 하여 현재 6개의 버전이 출시되었다.

본 파트는 2015년 6월 5년만에 새롭게 발표된 6번째 버전에 대한 내용이며, 새롭게 추가된 특징과 그에 맞는 활용법 등을 알아본다.

[let, const](http://hacks.mozilla.or.kr/2016/03/es6-in-depth-let-and-const/)
----

ES5는 변수 선언을 위해 var 키워드를 사용했다. ES6 버전부터 let이라는 새로운 변수 선언 키워드가 추가되어 let 변수명 = 값의 형태로 사용할 수 있게 되었다. let은 var의 엄격한(strict mode) 버전이라고 볼 수 있다.

* 블럭을 기준으로 스코프를 결정한다.

		if(true) {
		    var a = 10;
		}

		console.log(a); //10
		// var는 블럭이 아니라 function scope를 가진다 

		if(true) {
    		let a = 10;
		}

		console.log(a); //a is not defined
		//let은 조건문이나 반복문의 블럭을 스코프로 가진다.

* 글로벌 객체에 선언한 let 변수는 속성으로 찾을 수 없다. 

		var globalVar = 'globalVar';

		console.log(window.globalVar); //globalVar


		let globalLet = 'globalLet';

		console.log(window.globalLet); //undefined

* for(let i... ) 형태의 루프는 반복할 때마다 변수 i를 새로 바인딩한다.

		for(var i = 0; i < 3; i++) {
		    setTimeout(function() {
		        console.log('setTimeout', i);
		    }, i * 200);
		}

		// setTimeout 3;
		// setTimeout 3;
		// setTimeout 3;

		for(let i = 0; i < 3; i++) {
		    setTimeout(function() {
		        console.log('setTimeout', i);
		    }, i * 200);
		}

		// setTimeout 0;
		// setTimeout 1;
		// setTimeout 2;

* let 변수는 중복 선언시 Syntax 에러가 발생한다.
		
		var a = 1;
		var a = 2;

		//var는 위와 같이 중복된 변수명으로 선언해도 에러가 나지 않는다.

		let b = 3;
		let b = 4;

		//let은 변수명이 중복될 경우 "Identifier 'b' has already been declared" 에러가 발생한다.


* let 변수는 선언 전에 참조하면 에러가 발생한다.

		console.log(b); // undefined

		var b = 'test';

		//var는 호출 시점보다 아래 선언한 변수를 호출해도 에러가 나지 않는다. 이것은 자바스크립트의 고유 특징인데 함수뿐만 아니라 변수도 선언한 블록의 가장 위로 호이스팅되기 때문이다. 위 코드는 다음과 같다.

		var b = undefined;

		console.log(b); // undefined

		b = 'test';

		console.log(a); //a is not defined
		let a = 10;
		//let은 선언전에 호출하면 에러가 발생한다.

##### 상수 선언 const
const는 상수를 선언할 때 사용한다. Const로 선언한 상수는 값을 재 할당할 수 없다. 그래서 const는 선언과 동시에 값을 할당해야 한다. 이외의 규칙은 let과 동일하다. 

* 선언과 동시에 값을 할당해야 한다.

		const n = 2;
		n++ // Error: Assignment to constant variable.
		n = 3; // Error: Assignment to constant variable.

		const empty; // SyntaxError: Missing initializer in const declaration 

##### 변수 선언 시 값을 재 할당해야 될 경우를 제외하고 모두 const로 선언하는 것이 좋다. 

* const로 선언한 객체의 내부 변수까지 변경할 수 없는 것은 아니다. 

		const o = {a: 1, b: 2, c: 3};

		o.a = 4;
		o.b = 5;
		o.c = 6;

		// const로 선언된 객체는 값을 재 할당할 수 있다 

[Rest and Default Prameter](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-rest-parameters-and-defaults/)
----

##### 레스트 파라미터

* 인자의 개수가 가변적인 함수를 variadic function이라고 한다. 
* ES6부터 `function( ...rest ){}` 형태의 가변인자를 지원하는 문법이 추가되었다. 

         /**
         * 고전 스타일로 arguments를 이용하는 형식. 
         * @param  {[type]} collection [description]
         * @return {[type]}            [description]
         */
        function containsAll( collection ){
     
            for( var i = 1; i < arguments.length; i++ ){
                
                if( collection.indexOf( arguments[i] ) == -1 ) return false;
            }
    
            return true;
        }
    
        /**
         * rest parameter와 for..of loop를 이용하여 작성. 
         * @param  {[type]}    collection [description]
         * @param  {...[type]} elements   [description]
         * @return {[type]}               [description]
         */
        function containsAll2( collection, ...elements ){
            
            for( let e of collection ){
    
                if( collection.indexOf( e ) == -1 ) return false;
            }
    
            return true;
        }

##### 디폴트 파라미터

* ES5까지 함수 인자의 default 값은 undefined 였다.
* ES6부터 함수 인자의 기본값을 지정할 수 있다. `function( a = 'a', b = 'b' ){}의 형태로 표기`
* 디폴트 값은 함수 호출 시 계산되며, 왼쪽에서 오른쪽의 순서를 가진다.

        calcDefaultValue( 1 ) // 1, 2;
        calcDefaultValue( 2 ) // 2, 3;

        function calcDefaultValue( a = 1, b = a == 1 ? 2 : 3 ){

            console.log( a, b );
        }

* 디퐅트 인자 뒤에 기본값이 없는 인자가 올 수 있으며 그럴경우 뒤 인자의 기본값은 undefined이다. 
        
        function defaultparam( a = 1, b ){ ... } // 아래와 같다. 
        function defaultparam( a = 1, b = undefined ){ ... } 

[Template String](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-template-strings-2/)
----

##### 백틱(Backtick) 문자열

* 템플릿 스트링은 `` ` `` 문자로 감싼 문자열이다. 

        let templateString = `this is template string.`;

* 일반 문자열과 똑같이 `+`로 concat 가능하며 일반 문자열과 템플릿 스트링 간의 concat도 가능하다. 

        templateString += `another templateString` + "normal string";

* `${}`을 통해 문자열을 채워넣을 수 있다. `${}`을 템플릿 대입문이라 하며 javascript의 모든 구문이 허용된다. 
* 템플릿 문자열에서 백틱문자를 `` ` `` 사용해야 할 경우 역슬래시로 `` \` `` 이스케이프 할 수 있다. 
* 템플릿 문자열에서 템플릿 대입문의 문자열을 사용할 경우에도 역슬래시로 이스케이프 (`\${` 혹은 `$\{`)가능하다. 

        let name = 'kim.jinhonn',
            age = 30;

        let t = `I\`m ${name}. and I\`m ${age} years old.`;

        console.log( t ); // I`m kim.jinhonn. and I`m 30 years old.

* 일반적인 문자열과 다르게 화이트 스페이스를 그대로 표현한다. 
        
        let paragraph = `
          <h1>Title</h1>
          <p>Unauthorized hockeying can result in penalties
          of up to ${30} minutes.</p>
        `;

##### Tagged Template

* tagged template은 template 문자열 앞에 tag를 붙여서 사용한다. 
* tag에 저장된 함수를 호출한다. tag는 변수나 객체의 속성 함수 호출의 결과일 수도 있다. 
* 대입문을 경계로 split된 배열과 대입문의 값을 ...rest 가변인자로 받는다. 

        let name = 'Kim Jin Hoon';
    
        /**
         * 언어별 문자열을 저장하고 있는 객체. 
         * @type {Object}
         */
        const words = {

            'hi' : [ '안녕 {0}', 'Hi {0}', '{0} صباح الخير.', 'Guten Morgen.  {0}' ],
            'bye': [ '잘가 {0}', 'Bye {0}', 'وداعا. {0}', 'Bye. {0}' ],
            'stop': [ '고만!', 'Stop!', 'توقف', 'Stopp' ]
        };

        /**
         * i18n 함수를 초기화 하는 함수. 
         * 1. 클로져로 구현하여 countryCode와 words에 대한 접근을 제한한다. 
         * @param  {[type]} countryCode [description]
         * @param  {[type]} words       [description]
         * @return {[type]}             [description]
         */
        function initializeI18n( countryCode, words ){

            return function( template, ...rest ){

                let key = template[0].replace( /\s+/g, '' );

                if( !words.hasOwnProperty( key ) )
                    throw new Error( 'Error' );

                let string = words[ key ][ countryCode ];

                return string.replace( /\{[0-9]+\}/g, c => rest[ c.match( /\d+/g )[0] ] );
            }
        }

        const i18n = initializeI18n( 1, words );
    
        console.log( i18n`hi ${name}` ); // Hi Kim Jin Hoon
        console.log( i18n`bye ${name}` ); // Bye Kim Jin Hoon 
        console.log( i18n`stop` ); // Stop!

        console.log( initializeI18n( 3, words )`stop` ); // Stopp

* tag 함수에서 template 인자의 raw 배열을 통해 입력된 문자가 escape 되기 전 문자열에 접근할 수 있다. 
    
        /**
         * template의 문자열 길이와 template.raw의 문자열 길이 비교 테스트
         * @param  {[type]}    template [description]
         * @param  {...[type]} rest     [description]
         * @return {[type]}             [description]
         */
        function rawTest( template, ...rest ){

            template.forEach( 
                (s, i, _) => log( '_(_), _(_)', s, s.length, template.raw[i], template.raw[i].length ) 
            );
        }

* String.raw는 ES6에 내부적으로 구현된 유일한 tag이다. 
* template의 raw 속성과 같이 escape 되기 전 string으로 반환한다. 

        String.raw `\n\t`.length; // 4

[함수 선언](http://hacks.mozilla.or.kr/2015/09/es6-in-depth-arrow-functions/)
----
##### javascript의 함수

* ES5 버전까지 javascript에서 함수 선언을 위해 function 키워드가 필요하다. 

        // function declaration
        function f( a, b ){
            return a + b;
        }

        // function expression
        var f = function( a, b ){
            return a + b;
        }

        // function constructor
        var f = new Function( 'a', 'b', 'a + b' );

* function constructor를 이용하는 방식은 function expression과 동일하다고 볼 수 있다. 
* function declaration은 javascript의 호이스팅에 의해 선언전에 사용할 수 있다. 
* function expression은 f라는 변수가 선언은 되지만 할당되지 않은 상태이기에 할당 전에 호출 할 수 없다. 
        
        sum( 1, 2 ); // 3
        add( 1, 2 ); // 에러

        function sum( a, b ){
            return a + b;
        }

        var add = function( a, b ){
            return a + b;
        }

* 리터럴 표기법을 통해 object를 만들 때 좀더 간략하게 함수를 생성하는 표현식이 추가되었다. 

		var foo = {
		    bar: function(param) {
		        console.log('call bar', param);
		    }
		}

		const foo = {
		    bar(param) {
		        console.log('call bar', param);
		    }
		}

* 1930년대 알론조 처치가 고안한 수학 모델 [람다대수](https://ko.wikipedia.org/wiki/%EB%9E%8C%EB%8B%A4_%EB%8C%80%EC%88%98)에서 유래했다. 
* 프로그램 언어에서 람다 함수는 함수의 축약 표현식이라고 볼 수 있다. 
* 함수를 일급객체로 사용하는 언어가 늘어나면서 최근에는 람다 함수가 트랜드가 됐다.

        // 6개 랭귀지의 아주 간단한 함수 표현식.
        function (a) { return a > 0; } // JS

        [](int a) { return a > 0; }  // C++

        (lambda (a) (> a 0))  ;; Lisp

        lambda a: a > 0  # Python

        a => a > 0  // C#

        a -> a > 0  // Java

##### 화살표 함수(Arrow Function)

ES6 버전부터 javascript도 함수를 한줄로 **짧게** 선언할 수 있다. ES6에서 람다 표현식은 화살표 함수(Arrow function)라고 부르며 다음과 같은 특징을 가지고 있다.

* Identifier => Expression으로 선언한다. 
        
        ( a, b ) => a + b;


* 보통은 익명 함수로 사용하나, function expression처럼 변수에 할당하여 사용할 수도 있다. 
        
        const sum = ( a, b ) => a + b;


* 한줄로 작성하고 `{}`이 없을 경우 값을 항상 return한다.(return keyword를 생략해야 한다!)
        
        const f = a => a + 1; 
        
        f(1); //2;

* 함수 인자가 1개일 경우 괄호를 생략 가능하다. 
        
        a => a * a; // square

* 함수 인자가 없거나 2개 이상일 경우 그리고 가변인자를 사용할 경우 괄호가 필요하다. 

        () => console.log( 'empty call' ); // empty call

        ( a, b, c ) => a + b + c; // addAll

        ( ...rest ) => rest.reduce( ( a, b ) => a + b, 0 ); //addAll

* 함수 본문이 2줄 이상인 경우 `{}`으로 감싸야 한다. 
    
        ( iterator, needles ) => {

            for( let o of needles ){
                if( iterator.indexOf( o ) === -1 ) return false;
            }

            return true;
        }

* `{}` 블럭으로 감싼 경우 값을 반환하려면 본문 줄 수에 상관없이 `return` keyword를 사용해야 한다.
        
        const f = a => { return a }; // f(3) -> 3;

        const f2 = a => { a }; // f2(3) -> undefined;

* Object 객체를 return할 경우 괄호가 필요하다. 

        const plus1 = p => ({ x: p.x + 1, y: p.y + 1 });

* Arrow Function에서 this는 자신을 감싸는 외부 block scope의 this 객체를 받는다. 

		const o = {
		   callback: function(caller) {
		      
		      setTimeout(function(){
		         console.log('1', this == caller);
		      }, 100);

		      setTimeout(() => console.log('2', this == caller), 200);

		      const onTime = function() {
		         console.log('3', this == caller);
		      }

		      setTimeout(onTime, 300);
		   }
		}

		o.callback(o);

* Arrow Function에서는 arguments 객체가 전달되지 않는다. 

		const args = () => console.log( arguments );

		args(); //Uncaught ReferenceError: arguments is not defined

[Arrow Function 활용](https://ko.wikipedia.org/wiki/%EA%B3%A0%EC%B0%A8_%ED%95%A8%EC%88%98)
----

##### Array util 함수들

함수의 축약 표현이 가능한 Arrow Fucntion은 ES5에서 추가된 forEach, map, filter등의 배열 유틸 함수에 사용할 수 있다.

* forEach - 배열을 순회하며 callback을 실행한다. 
        
        const array = [ 1,2,3,4,5,6,7,8,9,10 ];

        array.forEach( n => console.log(n) );

* map - 배열을 순회하며 callback의 결과값을 새로운 배열을 반환한다. 

        let squaredList = array.map( n => n * n );

* filter - 배열을 순회하며 callback 결과값이 true인 원소만 담은 새로운 배열을 반환한다. 
    
        let oddList = array.filter( n => n % 2 );

* reduce - 배열을 순회하며 callback 결과값을 반환한다. 

        let sum = array.reduce( (a, b) => a + b, 0 );

* every - 배열을 순회하며 callback의 결과 bool값이 모두 true일 경우 true를 반환한다. 

        let bool = array.every( n => n > 0 ); // true,

* some - 배열을 순회하며 callback의 결과 bool값에 하나라도 true가 있을 경우 true를 반환한다. 

        let bool = array.some( n => n > 100 ) // false;

* sort - 배열을 정렬한다. a, b 두 개 인자 중 a가 작으면 -1을 같으면 0을 b가 크면 1을 반환해야 안다. 

        [100, 6, 89, 34, 0, 1].sort((a, b) => a < b ? -1 : a > b);

##### Object util 함수

Object를 [value, key, objcct]로 순회하는 유틸 함수를 만들 수도 있다.

* each - Object를 순회하며 callback을 실행한다.
		
		function each(collection, callback) {
		   for(let key in collection) {
		      callback(collection[key], key, collection);
		   }
		}

* map - Object를 순회하며 실행한 콜백의 반환값을 원소로 하는 Object를 반환한다.
		
		function map(collection, callback) {
		   const result = {};

		   each(collection, 
		      (value, key) => result[key] = callback(value, key, collection)
		   );

		   return result;
		}

* filter - Object를 순회하며 실행한 콜백이 true인 원소들을 Object으로 반환한다.

		function filter(collection, callback) {
		   const result = {};

		   each(collection, 
		      (value, key) => callback(value, key, collection) 
		                ? result[key] = value 
		                : undefined
		   )

		   return result;
		}

* reduce - Object를 순회하여 실행한 콜백 값을 반환한다.
		
		function reduce(collection, callback, i = undefined) {
		   each(collection, (value, key) => {
		      if(i === undefined) {
		         i = value;
		         return;
		      }

		      i = callback(i, value, key, collection);
		   })

		   return i;
		}

* every - Object를 순회하여 실행한 callback이 모두 true일 경우 true를 반환한다.
		
		function every(collection, callback) {
		   return reduce(collection, (bool, value, key) => bool && callback(value, key, collection), true);
		}

* some - Object를 순회하여 실행한 callback 결과값 중 하나라도 true일 경우 true를 반환한다.

		function some(collection, callback) {
		   return reduce(collection, (bool, value, key) => bool || callback(value, key, collection), false);
		}

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

[Collections](http://hacks.mozilla.or.kr/2015/12/es6-in-depth-collections/)
----

##### Collection

* javascript에는 이미 hash-table 처럼 사용할 수 있는 Object가 있지만 몇몇의 경우 문제가 있다. 
* 완벽히 빈 객체를 생성해야 할 때 `{}` 대신 `Object.create(null)`을 사용해야 한다. 

        console.log( {} ); // __proto__ 객체를 가지고 있다. 
        console.log( Object.create( null ) ); // 빈 객체이다. 

* 속성 key는 언제나 문자열이어야 한다. 
* 객체에 얼마나 많은 속성이 존재하는지 알아내기 위해 for..in loop가 필요하다. 

        const o = Object.create( null );

        o.a = 1;
        o.b = 2;
        o.c = 3;

        let n = 0;

        for( let k in o ) ++n;

        console.log( n ); // 3

* 이터러블(iterable) 하지 않기 때문에, for..of, 비구조화 할당등을 사용할 수 없다. 

##### Set

* new Set() 구문은 비어 있는 새로운 set 을 만든다.
* new Set(iterable) 구문은 새로운 set 을 만들고 인자로 전달된 이터러블(iterable)로 데이터를 채운다.

        let set = new Set( [ 1,2,3,4,5,1,2,3,4,5 ] ); // 새로운 셋을 생성하여 배열의 데이터로 채운다.

* `set.size` 구문은 set 안에 담겨 있는 데이터의 개수를 조회한다.
        
        console.log( set.size ); // 중복 요소가 제거되어 set의 크기는 5이다. 

* `set.has(value)` 구문은 주어진 값이 set 안에 존재할 경우 true 를 반환한다.

        console.log( set.has( 4 ) ); // true;
        console.log( set.has( 6 ) ); // false;

* `set.add(value)` 구문은 주어진 값을 set 에 추가한다. 만약 그 값이 이미 set 안에 존재하면 아무 일도 일어나지 않는다.

        console.log( set.add( 5 ).size ); // 중복된 요소를 추가하여 크기는 변하지 않는다. 
        console.log( set.add( 6 ).size ); // 중복되지 않는 요소를 추가하여 크기는 6이다;

* `set.delete(value)` 구문은 set 에서 주어진 값을 제거한다. 만약 그 값이 set 안에 존재하지 않으면 아무 일도 일어나지 않는다. .add() 구문과 .delete() 구문은 모두 set 객체 자신을 리턴하니 구문을 체인(chain) 시킬 수 있다.

        console.log( set.delete( 7 ).size ); // 없는 원소를 제거하여 크기는 변하자 않는다.
        console.log( set.delete( 6 ).size ); // 마지막으로 추가된 원소를 제거하여 크기는 5이다. 

* `set[Symbol.iterator]()` 구문은 set 안의 값들을 순회할 수 있는 새로운 이터레이터를 리턴한다. 보통의 경우 이 메소드를 직접 호출할 일은 없지만 이 메소드의 존재 때문에 set 은 이터러블(iterable) 하다. 즉, for (v of set) {...} 같은 구문을 쓸 수 있다.
* set.forEach(f)는 array의 forEach와 동일하다.
* set.clear() 구문은 set 안의 모든 데이터를 제거한다.

         set.clear(); // 모든 데이터를 제거한다. 자신을 return하지 않는다.

* `set.keys(), set.values(), set.entries()` 구문은 다양한 이터레이터들을 리턴한다. 이 이터레이터들은 Map 과의 호환성을 위해 제공된다. 
* array의 map, filter, reduce 등 util 함수들이 제공되지 않는다. 직접 구현. 
        
        /**
         * f를 실행한 결과값을 원소로 가지는 새로운 set 객체 반환
         * @param  {[type]} f [description]
         * @return {[type]}   [description]
         */
        Set.prototype.map = function( f ){

            let set = new Set();

            this.forEach( ( v, k, c ) => set.add( f(v, k, c) ) );

            return set;
        }

        /**
         * f를 실행한 결과값이 true인 원소를 가지는 새로운 set 객체 반환. 
         * @param  {[type]} f [description]
         * @return {[type]}   [description]
         */
        Set.prototype.filter = function( f ){

            let set = new Set();

            this.forEach( ( v, k, c ) => {

                if( f( v, k, c ) )
                    set.add( v );
            });

            return set;
        }

        /**
         * 원소를 순회하며 f를 실행한 결과값 반환. 
         * @param  {[type]} f            [description]
         * @param  {[type]} initialvalue [description]
         * @return {[type]}              [description]
         */
        Set.prototype.reduce = function( f, initialvalue = undefined ){

            let i = initialvalue;

            this.forEach( ( v, k, c ) =>{

                if( i == undefined ){
                    i = v;
                    return;
                }

                i = f( i, v, k, c );
            });

            return i;
        }
        
##### Map

* `new Map` 구문은 비어 있는 새로운 map 을 만든다.
* `new Map(pairs)` 구문은 새로운 map 을 만들고 그 데이터를 기존의 [key, value] 페어 컬렉션으로 채운다. pairs 인자는 기존의 Map 객체일 수도 있고, 2개의 엘리먼트를 가진 배열들로 구성된 배열일 수도 있으며, 2개의 엘리먼트를 yield 하는 제너레이터일 수도 있다.
    
        let map = new Map( [ ['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5] ] );

* `map.size` 구문은 map 에 담겨진 엔트리들의 개수를 조회한다.
        
        map.size; //5

* `map.has(key)` 구문은 주어진 key 가 존재하는지 확인한다 (key in obj 구문처럼요).
    
        map.has( 'f' ); // false;
        map.has( 'a' ); // false;

* `map.get(key)` 구문은 key 와 연관된(associated) value 를 리턴한다. 만약 그런 엔트리가 존재하지 않을 경우 undefined 를 리턴한다.
        
        map.get( 'f' ); //undefined;
        map.get( 'a' ); //1;

* `map.set(key, value)` 구문은 map 에 key 와 value 엔트리를 추가한다. 같은 key 를 갖는 엔트리가 이미 존재할 경우 기존의 데이터를 덮어쓴다.

        map.set( 'f', 6 );
        map.set( 'a', 0 );

* `map.delete(key)` 구문은 엔트리를 삭제한다. 

        map.delete( 'f' );

* `map.clear()` 구문은 map 안의 모든 엔트리들을 제거한다.

        map.clear();

* `map[Symbol.iterator]()` 구문은 map 안의 엔트리들을 순회할 수 있는 이터레이터를 리턴한다. 해당 이터레이터는 엔트리 항목 각각을 [key, value] 배열로 표현한다.

* `map.forEach(f)` 구문은 다음과 같이 동작한다. 인자 순서가 이상한 것은 Array.prototype.forEach() 구문과 통일성을 유지하기 위해서이다.

        for (let [key, value] of map)
            f(value, key, map);

* `map.keys()` 구문은 map 안의 key 들을 순회할 수 있는 이터레이터를 리턴한다.

        for( let k of map.keys() )
            console.log( k );

* `map.values()` 구문은 map 안의 value 들을 순회할 수 있는 이터레이터를 리턴한다.

        for( let v of map.values() )
            console.log( v );

* `map.entries()` 구문은 map 안의 모든 엔트리들을 순회할 수 있는 이터레이터를 리턴한다. `map[Symbol.iterator]()` 구문과 똑같다. 사실 이것은 동일한 메소드에 대한 다른 명칭일 뿐이다.

##### WeakMap, WeakSet

* weakmap과 weakset은 key나 value에 대해 약한 참조를 한다. (map과 set은 [강한 참조](https://developer.mozilla.org/ko/docs/Web/JavaScript/Memory_Management)) 그래서 weakmap, weakset에 포함되어 있더라도 다른 곳에서 참조하지 않는다면( roots에서 닿지 않는다면 ) weak collection에서도 제거된다. 

* weakmap의 key와 weakset의 value는 반드시 객체여야 한다. 

        new WeakSet( [ 1,2,3,4 ] ); // Error
        new WeakMap( [ [ 'key', 3 ], [ 'key2', 4 ] ] ); // Error

* WeakMap은 new, has, set, get, delete만 지원한다. 

* WeakSet은 new, has, add, delete만 지원한다. 

* WeakMap, WeakSet 모두 iterator 함수가 없다. Iterable 객체가 아니다. 

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

[클래스](http://hacks.mozilla.or.kr/2016/03/es6-in-depth-classes/)
----

##### class 키워드

* 클래스는 미리 정해진 속성과 함수를 포함한 객체를 생성할 수 있는 청사진이다. ES5까지는 prototype 객체를 사용해 클래스를 비슷하게 구현하였다. 간단한 Todo 정보를 담고 있는 클래스를 ES5로 작성하면 다음과 같다. 

		function TodoItem(title) {
		   this._title = 'anonymous';
		   this.setTitle(title);
		}

		TodoItem.prototype = {
		   getTitle: function() {
		      return this._title;
		   },
		   setTitle: function(title) {
		      this._title = title;
		   },
		   getDueDate: function() {
		      return this._dueDate;
		   },
		   setDueDate: function(date) {
		      this._dueDate = date;
		   }
		}

		Object.defineProperties(TodoItem.prototype, {
		   title: {
		      get: function() {
		         return this._title;
		      },
		      set: function(title) {
		         this._title = title;
		      }
		   },
		   dueDate: {
		      get: function() {
		         return this._dueDate;
		      },
		      set: function(date) {
		         this._dueDate = date;
		      }
		   }
		})


* 하나의 클래스를 여러 부분으로 나눠 작성해 가독성이 떨어진다. 

* TodoItem을 ES6 클래스로 작성하면 다음과 같다. 

		class TodoItem {
		   constructor(title) {
		      this._title = 'anonymous';
		      this.setTitle(title);
		   }

		   getTitle() {
		      return this._title;
		   }

		   setTitle(title) {
		      this._title = title;
		   }

		   getDueDate() {
		      return this._dueDate;
		   }

		   setDueDate(date) {
		      this._dueDate = date;
		   }

		   get title() {
		      return this._title;
		   }
		   
		   set title(title) {
		      this._title = title;
		   }

		   get dueDate() {
		      return this._dueDate;
		   }
		   
		   set dueDate(date) {
		      this._dueDate = date;
		   }
		}

* 클래스 내 이터레이터 함수 작성은 아래와 같다.

		[Symbol.iterator]() {
		   return [this.title, this.dueDate][Symbol.iterator]();
		}

* 제너레이터 함수를 추가할 경우 아래와 같이 작성하면 된다.   

		*entries() {
		   yield* [
		      ['title', this.title],
		      ['dueDate', this.dueDate]
		   ]
		}

* 이터레이터를 제너레이터 함수로 작성하고 싶을 때는 아래와 같다. 

		*[Symbol.iterator]() {
		   yield* [this.title, this.dueDate];
		}

##### 상속

* extends 키워드를 사용하면 상속을 할 수 있다. override 키워드는 지원하지 않으며 같은 이름의 함수를 추가하면 override 할 수 있다. super 객체로 base class의 함수와 속성에 접근할 수 있다. 

		class MemoItem extends TodoItem {
		   constructor(title, dueDate = new Date()) {
		      super(title, dueDate);
		      this._priority = 0;
		   }
		   getTitle() {
		      return `Title is ${super.getTitle()}`;
		   }

		   getPriority() {
		      return this._priority;
		   }
		   setPriority(priority) {
		      this._priority = priority;
		   }

		   get expired() {
		      return +new Date() > +this.dueDate;
		   }

		   get priority() {
		      return this._priority;
		   }
		   set priority(priority) {
		      this._priority = priority;
		   }
		}

[모듈](http://hacks.mozilla.or.kr/2016/05/es6-in-depth-modules/)
----

##### Module

모듈은 일정한 기능을 수행하기 위한 코드의 집합이다. 라이브러리라고 부르기도 하며 함수들의 모음 혹은 클래스들의 모음이다. 이런 모듈을 특정한 방향성과 성격등으로 합쳐 프레임워크를 만든다. 모듈은 보통 여러개의 파일로 이루어져있다. ES5까지 이렇게 분리된 파일을 가져다 사용하기 위해 스크립트 태그나 Task Runner를 통한 Concat, CommonJS, AMD 같은 모듈화 스펙을 사용해 왔다. 
ES6는 정식으로 import, export가 생겼지만 지원 브라우저가 없어 여전헤 CommonJS로 트랜스파일하여 사용하고 있다. 

##### export

* export를 사용하면 특정 파일(모듈 스코프)에서 외부 접근이 가능한 변수 및 함수, 클래스를 지정할 수 있다. export 목록은 모듈 파일의 어디에나 올 수 있다. 다만 톱-레벨(top-level) 스코프여야 한다. export 목록이 여러개 올 수도 있으며 목록과 선언을 함께 사용할 수도 있다. 단 어떤 심볼도 한번만 export 되어야 한다.

		export const RADIAN = Math.PI / 180;
		
		export function* range(a, b){
		    for(; a < b; a++) yield a;
		}

		export class TodoItem {
		    constructor(title) {
		        this._title = title;
		    }
		}

* 공개할 항목마다 export 를 덧붙이지 않고, 중괄호를 이용해서 공개할 항목들의 목록을 한번에 선언할 수 있다.

		export { RADIAN, range, Point };

* default로 export할 심볼을 정할 수도 있다. CommonJS에서 module.exports = Point를 한것과 같은 효과이다.

		export {TodoItem as default};

* 아래와 같이 축약하여 사용할 수 있다.

		export default class TodoItem {
		    constructor(title) {
		        this._title = title;
		    }
		}

##### Import

import를 사용하여 export한 함수, 클래스등을 가져올 수 있다. import 구문도 top level이라면 모듈 파일 어디에 위치해도 상관없다. hoisting 된다. 하지만 가독성을 위해 소스 맨 위에 위치하는게 좋다.

* default로 export되지 않은 심볼은 {}로 감싸야 한다.

		import { range, Point, RADIAN } from './utils/util';

* import 하는 모듈과 겹치는 이름이 있을 경우 이름을 변경 가능하다.

		import { RADIAN as RAD } from './utils/util';

* default로 export한 모듈일 경우 다음과 같이 import 가능하다.

		import default as Point from './utils/Point';

* 아래과 같은 구문이다. 가독성을 위해 아래와 같이 사용하는게 좋다.

		import Point from './utils/Point';

* 모듈 네임스페이스 객체를 import할 수 있다.

 		import * as util from './utils/util';

		let [ ...a ] = util.range( 1, 10 );

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
