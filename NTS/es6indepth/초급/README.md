ES6 초급
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


[모듈](http://hacks.mozilla.or.kr/2016/05/es6-in-depth-modules/)
----

##### Module

모듈은 일정한 기능을 수행하기 위한 코드의 집합이다. 라이브러리라고 부르기도 하며 함수들의 모음 혹은 클래스들의 모음이다. 이런 모듈을 특정한 방향성과 성격등으로 합쳐 프레임워크를 만든다. 모듈은 보통 여러개의 파일로 이루어져있다. ES5까지 이렇게 분리된 파일을 가져다 사용하기 위해 스크립트 태그나 Task Runner를 통한 Concat, CommonJS, AMD 같은 모듈화 스펙을 사용해 왔다. 

ES6는 정식으로 import, export가 생겼지만 지원 브라우저가 없어 여전히 CommonJS로 트랜스파일하여 사용하고 있다. 

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

		import {default as Point} from './utils/Point';

* 아래과 같은 구문이다. 가독성을 위해 아래와 같이 사용하는게 좋다.

		import Point from './utils/Point';

* 모듈 네임스페이스 객체를 import할 수 있다.

 		import * as util from './utils/util';

		let [ ...a ] = util.range( 1, 10 );



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

##### getter/setter

accessor 라고도 부르며, 멤버 변수(인스턴스 변수)에 바로 접근하는 것 보다 getter/setter를 통해 접근하는 것이 좋다. 

* 캡슐화 할 수 있다. 

		class TodoItem1 {
			constructor() {
				this.dueDate = new Date();
			}
		}

		const todo = new TodoItem1();

		todo.dueDate = '장 보기';
		// 이후로 dueDate를 참조하는 코드는 오류가 생길 수 있다. 

		class TodoItem2 {
			constructor() {
				this._dueDate = new Date();
			}

			get dueDate() {
				return this._dueDate;
			}
			
			set dueDate(value) {
				if(!(value instanceof Date)) throw new Error('Date 객체가 아닙니다.');

				this._dueDate = value;
			}
		}

		const todo2 = new TodoItem2();

		todo2.dueDate = '장 보기';
		// 에러로 잘못된 부분을 바로 찾을 수 있다.

* getter와 setter를 서로 다른 접근 레벨로 설정할 수 있다. javascript는 read-only

		class TodoItem {
			constructor(dueDate) {
				this._dueDate = null;
				this.dueDate = dueDate;
			}

			get expired() {
				return new Date() > this.dueDate;
			}

			get dueDate() {
				return this._dueDate;
			}
			
			set dueDate(value) {
				this._dueDate = value;
			}
		}

		const todo = new TodoItem(new Date(2017, 6, 3));

		console.log(todo.expired);

* 외부 인터페이스 변환 없이 내부 동작 방식을 변경 할 수 있다. 

* 상속 받은 클래스에서 속성의 동작 방식에 대해 재정의 할 수 있다. 

		class MemoItem extends TodoItem {
			constructor(dueDate) {
				super(dueDate);
			}

			get expired() {
				if(this.dueDate == null) return false;

				return super.dueDate;
			}
		}

		const memo = new MemoItem();

		console.log(memo.expired);

* 속성이 반환하는 값을 일괄적으로 변경할 수 있다. 

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

* extends 뒤에는 prototype 속성을 갖는 올바른 생성자라면 모든 표현식이 올 수 있다.

##### Builtin 객체 상속

* javascript에 내장된 빌트인 객체를 상속하여 확장 가능하다. 
* push, pop, shift, unshift 같은 메소드에서 배열의 원소에 변화가 있을 때 마다 event로 알려주는 배열도 만들 수 있다. 

        class DataProvider extends Array{

            constructor( ...rest ){

                super( ...rest );
            }

            push( ...rest ){

                super.push( ...rest );

                if( this.onPush ){
                    this.onPush( rest );
                }
            }
        }

* 바벨같은 트랜스파일러를 사용할 경우 빌트인 객체를 상속하여 서브 클래스를 만들 수 없다. 
