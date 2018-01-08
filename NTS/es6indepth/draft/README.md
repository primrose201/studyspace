ES6 in Depth
====


[let, const](http://hacks.mozilla.or.kr/2016/03/es6-in-depth-let-and-const/)
----
##### var의 문제점. 
* 블럭이 Scope를 결정하지 않는다. 
* 루프안의 변수가 과도하게 공유된다. 

##### let
* 새로운 변수 선언 키워드이다. 
* 블럭을 기준으로 스코프를 결정한다.
* 글로벌 let 변수는 글로벌 객체의 속성이 아니다. 
* for(let i... ) 형태의 루프는 반복할 때마다 변수 i를 새로 바인딩한다. 
* let 변수는 선언 전에 참조하면 에러를 발생한다. 
* let 변수는 중복 선언시 Syntax 에러를 발생한다. 

> 변수 호이스팅으로 인한 문제 

        /**
         * var 로 선언한 변수는 전역이나 선언된 함수 scope의 최상단으로 끌어올려(hoist) 집니다. 
         * @return {[type]} [description]
         */
        function hoistingProblem(){
    
            let t = 'test';
    
            setTimeout( function(){
    
                console.log( t ); // 'test'
    
                let a = 'a';
    
                if( true ){
    
                    let t = 'complete'; 
    
                    console.log( a ); // a
                }
    
                console.log( t ); // 'test'
                
            }, 1000 )
        }

> loop안에서 하나로 바인딩 된 index 문제. 

        /**
         * var로 선언한 i는 for loop가 종료되는 시점의 값으로 참조되어 
         * 아래와 같은 code 실행시 undefined가 출력된다. 
         * @return {[type]} [description]
         */
        function loopIndexProblem(){
    
            let messages = [ 'Hi', 'This is', 'console!' ];
    
            for( let i = 0; i < messages.length; i++ ){
    
                setTimeout( function(){
    
                    console.log( messages[i] );
    
                }, i * 300 );
            }
        }

##### const

* 상수 선언 키워드이다. 
* let과 동일하게 블록 스코프를 가진다. 
* 선언과 동시에 할당을 해야한다. 
* const 상수에 값을 할당하면 에러이다. 
* 값을 할당하지 않는 const 선언은 에러이다. 

        const NUM = 'test'; // 'test';
    
        NUM = 'complete'; // Error: Assignment to constant variable.
        NUM += 'ing'; // Error: Assignment to constant variable.
    
        const EMPTY; // SyntaxError: Missing initializer in const declaration

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

[Arrow Functions](http://hacks.mozilla.or.kr/2015/09/es6-in-depth-arrow-functions/)
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

##### 람다함수

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

* ES6 버전부터 javascript도 함수를 한줄로 **짧게** 선언할 수 있다. 
* Identifier => Expression으로 선언한다. 
        
        ( a, b ) => a + b;

* 한줄로 작성하고 `{}`이 없을 경우 값을 항상 return한다.(return keyword를 생략해야 한다!)
        
        const f = a => a; 
        
        f(3); //3;

* 보통은 익명 함수로 사용하나, function expression처럼 변수에 할당하여 사용할 수도 있다. 
        
        const sum = ( a, b ) => a + b;

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

* Arrow Function에서 this는 자신을 감싸는 외부 block scope의 this 객체를 받는다. 

        const caller = {

            f: function( o ){

                const call = () => {
                    console.log( this, this === o );
                }

                function call2(){
                    console.log( this, this === o );
                }

                this.call3 = call2;

                call(); // caller, true
                call2(); // window, false
                this.call3(); // caller, true;
            }
        }

* Arrow Function에서는 arguments 객체가 전달되지 않는다. 
    
        const args = () => console.log( arguments );
        
        args(); //Uncaught ReferenceError: arguments is not defined

* Object 객체를 return할 경우 괄호가 필요하다. 

        const plus1 = p => ({ x: p.x + 1, y: p.y + 1 });


[HigherOrder Functions](https://ko.wikipedia.org/wiki/%EA%B3%A0%EC%B0%A8_%ED%95%A8%EC%88%98)
----

##### 정의

* 함수를 인자로 받거나 결과로 반환하는 함수를 고차 함수라 한다. 
* 함수를 일급 객체로 취급하는 JS는 고차함수를 사용할 수 있다. 

##### Array에 구현된 고차함수

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

        array.sort( (a,b) => a < b ? -1 : a > b );

##### Object용 고차함수

* each - map을 순회하며 callback을 실행한다.
    
        /**
         * map을 순회하며 callback을 실행한다. 
         * @param  {[type]}   collection [description]
         * @param  {Function} callback   [description]
         * @return {[type]}              [description]
         */
        function each( collection, callback ){

            if( collection instanceof Array ){

                collection.forEach( callback );
            }
            else{

                for( var key in collection ){

                    callback( collection[key], key, collection );
                }
            }
        }

* map - 맵을 순회하며 실행한 콜백의 반환값을 원소로 하는 맵을 반환한다. 

        /**
         * 맵을 순회하며 실행한 콜백의 반환값을 원소로 하는 맵을 반환한다. 
         * @param  {[type]}   collection [description]
         * @param  {Function} callback   [description]
         * @return {[type]}              [description]
         */
        function map( collection, callback ){

            if( collection instanceof Array )
                return collection.map( callback );

            let o = {};

            each( collection, ( v, k, c ) => o[k] = callback( v, k, c ) );

            return o;
        }

* filter - 맵을 순회하며 실행한 콜백이 true인 원소들을 맵으로 반환한다. 
    
        /**
         * 맵을 순회하며 실행한 콜백이 true인 원소들을 맵으로 반환한다. 
         * @param  {[type]}   collection [description]
         * @param  {Function} callback   [description]
         * @return {[type]}              [description]
         */
        function filter( collection, callback ){

            if( collection instanceof Array )
                return collection.filter( callback );

            let o = {};

            each( collection, ( v, k, _ ) => {

                if( callback( v, k, _ ) ) o[k] = v;
            });

            return o;
        }

* reduce - 맵을 순회하여 실행한 콜백 값을 반환한다.

        /**
         * 맵을 순회하여 실행한 콜백 값을 반환한다. 
         * @param  {[type]}   collection   [description]
         * @param  {Function} callback     [description]
         * @param  {[type]}   initialValue [description]
         * @return {[type]}                [description]
         */
        function reduce( collection, callback, initialValue = undefined ){

            if( collection instanceof Array )
                return collection.reduce( callback, initialValue );

            let i = initialValue;

            each( collection, ( v, k, _ ) => {

                if( i == undefined ) {
                    i = v;
                    return;
                }

                i = callback( i, v, k, _ );
            });

            return i;
        }

* every - 맵을 순회하여 실행한 callback이 모두 true일 경우 true를 반환한다. 
    
        /**
         * 맵을 순회하여 실행한 callback이 모두 true일 경우 true를 반환한다. 
         * @param  {[type]}   collection [description]
         * @param  {Function} callback   [description]
         * @return {[type]}              [description]
         */
        function every( collection, callback ){

            if( collection instanceof Array )
                return collection.every( callback );

            return reduce( collection, (a, b, k, _) => a && callback( b, k, _ ), true );
        }

* some - 맵을 순회하여 실행한 callback 결과값 중 하나라도 true일 경우 true를 반환한다. 

        /**
         * 맵을 순회하여 실행한 callback 결과값 중 하나라도 true일 경우 true를 반환한다. 
         * @param  {[type]}   collection [description]
         * @param  {Function} callback   [description]
         * @return {[type]}              [description]
         */
        function some( collection, callback ){

            if( collection instanceof Array )
                return collection.some( callback );

            return reduce( collection, (a, b, k, _) => a || callback( b, k, _ ), false );
        }

[Symbol](http://hacks.mozilla.or.kr/2015/09/es6-in-depth-symbols/)
----

##### Symbol

* Symbol은 ES6에서 javascript에 추가된 7번째 type이다. 
* 기존의 타입은 다음과 같다. 
    
        const types = [ 1, 'type', true, {}, null, undefined ];

        for( let v of types ) 
            console.log( v, typeof v );
        /*
            1 "number"
            type string
            true "boolean"
            Object {} "object"
            null "object"
            undefined "undefined"
        */

* Symbol은 객체 속성의 key 값으로 사용하기 위한 새로운 type이다. 
* `object[ 'key' ] = value;`로 속성을 추가하듯이 `object[Symbol()] = value;` 처럼 사용할 수 있다. 
* `Symbol()` 메소드로 심볼을 생성할 경우 항상 고유의 값을 가진다. 

##### Symbol 객체 생성

* `Symbol()`을 호출한다. 이 메소드는 항상 고유의 심볼을 반환한다. 

        console.log( Symbol() ); // Symbol()
        console.log( Symbol( 'test' ) ); // Symbol(test)

        // 인자인 string은 toString시 알아보기 위한 주석의 의미이다. 
        console.log( Symbol( 'test' ) === Symbol( 'test' ) ); // false

* `Symbol.for( string )`을 호출한다. 이 메소드는 심볼 레지스트리를 참조하여 같은 string의 심볼을 반환한다. 

        console.log( Symbol.for( 'test' ) === Symbol.for( 'test' ) ) // true;

* `Symbol.keyFor( symbol )`로 symbol 생성에 사용된 string을 가져올 수 있다. 다만 이 메소드는 `Symbol.for`를 통해 생성된 전역 심볼 객체에 한한다. 

        const globalSym = Symbol.for( 'test' );
        
        console.log( Symbol.keyFor( globalSym ) ); // test        

* Symbol.iterator 처럼 표준에 의해 정의된 심볼을 사용할 수 있다. 표준에 의해 정의된 심볼들은 나름의 특별한 용도가 있다.

* 다음과 같이 대괄호 연산자를 통해 속성을 추가한다. 

        const key = Symbol( 'key' );
        const call = Symbol( 'call' );
        const o = {};

        o[ key ] = 10;

        let o2 = {
            x: 10, 
            y: 20,
            [ key ]: 30
        }

        function Point( x = 0, y = 0 ){

            this.x = x;
            this.y = y;

            this[key] = 'test';
        }

        Point.prototype = {
            [ call ]: function(){
                console.log( 'call point[Symbol] method' );

                return this;
            }
        }

        console.log( o[key], o2[key], new Point()[key], new Point()[ call ]() );

[Iterator and for..of loop](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-iterators-and-the-for-of-loop/)
----

##### for..of 반복문

* 기존 반복문의 종류는 다음과 같다. 
        
        // 전통적인 for loop
        let a = [ 1,2,3,4,5 ];

        for( var i = 0; i < a.length; i++ ){
            console.log( a[i] );
        }
        
        // es5의 array 고차함수. 
        a.forEach( n => console.log(n) );
    
        // for..in 반복문. 
        for( var key in a ) console.log( a[key] );

* ES6에서 for..of 반복문이 추가되었다. 
* for..of 반복문은 배열의 요소, 즉 data를 순회하기 위한 구문이다. 
* forEach문과 달리 continue, break 를 지원하며 반복문을 감싸고 있는 함수를 return할 수도 있다.

        const a = [ 1,2,3,4,5,6,7,8 ];

        for( let n of a ){

            if( n % 2 ) continue;

            console.log( n );
            
            if( n > 6 ) break;
        }
        // 2, 4, 6, 8

* for..of 반복문은 문자열도 다룰 수 있다. 
    
        const string = 'abcdef';

        for( let c of string ){

            console.log( c );
        }
        // a, b, c, d, e, f

* for..of 반복문은 Map, Set 객체도 다룰 수 있다. 
* 언급한 Array, String, Map, Set 객체는 모두 Iterable 객체이기 때문이다. 

##### Iterable Object 

* 약속된 함수로 반복자(iterator)를 반환하는 객체를 말한다. 
* Array, String, Map, Set 모두 Symbol.iterator 함수가 선언되어 있고, `[Symbol.iterator]()` 호출 시 `{ next: function(){} }` 형식의 iterator 객체를 반환한다. 

        console.log( [][Symbol.iterator]() ); // Array Iterator {}
        console.log( new Map()[Symbol.iterator]() ); // MapIterator {}
        console.log( new Set()[Symbol.iterator]() ); // SetIterator {}
        console.log( 'test'[Symbol.iterator]() ); // StringIterator {}

* iterator 객체는 next 함수를 가지고 있으며 `.next()` 호출 시 `{ value: , done: }` 형태의 객체를 반환한다. 

        let iter = [1,2,3,4,5][Symbol.iterator]();

        console.log( iter.next() ); //{value: 1, done: false}

* for..of 반복문을 구현하면 다음과 같다. 
    
        let iter = [1,2,3,4,5][Symbol.iterator]();

        for( let result = iter.next(); !result.done; result = iter.next() ){
            
            console.log( iter.value );
        }

* 객체에 custom iterator 함수를 추가할 수도 있다. 
* 1씩 증가하는 무한 길이의 배열을 만들 수도 있다. 

        function infinity(){

            let n = 0;

            return {
                [Symbol.iterator]: function(){
                    return {
                        next: function(){
                            return { value: n++, done: false };     
                        }
                    };
                }
            }
        }

        for( let n of infinity() ){
            
            console.log(n);

            if( n > 10 ) break;
        }

* python의 range 함수도 만들 수 있다. 
        
        function range( a, b, n = 1 ){

            return {

                [ Symbol.iterator ]: function(){
                    return this;
                },

                next: function(){

                    if( a > b ) return { done: true };

                    let t = a;
                    a += n;

                    return { value: t, done: false };
                }
            }
        }

        for( let n of range( 2, 10, 3 ) ){
            console.log(n);
        }
        


[Destructuring](http://hacks.mozilla.or.kr/2015/09/es6-in-depth-destructuring/)
----

##### 비구조화 할당(destructuring)

* destructuring은 배열 형태와 object 형태 두 가지가 있다.
* ES6 import 구문에서 이미 객체 형태의 비구조화 할당을 사용하고 있다. `import { rotate, distance } from 'path/to/module';`  

###### 배열, Iterable 디스트럭쳐링

* `const a = [ 1,2,3,4,5 ];`의 처음 3개 요소를 변수에 할당하려면 다음과 같다. 
    
        const array = [ 1,2,3,4,5 ];

        let a = array[0],
            b = array[1],
            c = array[2];

* 비구조화 할당을 이용하면 다음과 같이 할 수 있다. 

        [ a, b, c ] = array;

* 새롭게 선언하는 변수의 경우 let이나 var, const를 붙여준다. 

        let [ d, e ] = array;

* 다음과 같이 중첩된 배열안의 요소도 비구조화 할당 할 수 있다. 

        let [ f, [ g, h ], i ] = [ 1, [ 10, 11 ], 2 ];

* 순서를 건너뛰어 배열에 뒤에 있는 요소도 할당 할 수 있다. 

        [ , , , d, e ] = array;

* 없는 인덱스의 요소를 접근하면 undefined가 반환된다. 

        [ , , a ] = [ 1, 2 ];

* default 값이 있다면 값이 undefined일 경우 default 값으로 대체한다. 

        [ a = 1, b = 2 ] = [];

* 배열 형태의 비구조화 할당에는 iterable 객체가 필요하다. 
* custom iterable 객체도 비구조화 할당 할 수 있다. 

        function fibonaci(){

            let [ a, b, t ] = [ 0, 1 ];

            return {

                [Symbol.iterator](){
                    return this;
                },

                next(){

                    t = a + b;
                    [ a, b ] = [ b, t ]; 

                    return { value: t, done: false };
                }
            }
        }

        for( let n of fibonaci() ){

            if( n > 200 ) break;
            console.log( n );
        }

##### 객체 디스트럭처링

* 할당할 속성을 지정하고 할당할 변수를 지정한다. 

        const ordered = {
            a: 1, b: 2, c: 3, d: 4, e: 5
        };

        let { a: varA } = ordered;
        let { b: varB, c: varC } = ordered;

* 객체의 속성과 이름이 동일할 경우 약식 구문으로 사용할 수 있다. 

        let { a, b, c, d, e } = ordered;

* 기존에 선언된 변수에 할당할 경우 괄호가 필요하다. 객체 비구조화 할당은 `{`으로 시작하여 괄호가 없을 경우 syntax error 이다.  
    
        ( { a, b, c } = ordered );

* 배열과 똑같이 패턴을 중첩시켜 사용할 수 있다. 

        const complicated = { array: [ 1, { second: 2 } ] };
        
        let { array: [ a, { second } ] } = complicated;

* 배열과 같이 없는 값에 접근할 경우 undefined이다. 
    
        let { b } = { a: 1, c: 2 };

* 배열의 경우와 같이 default 값을 지정할 수 있다. 
    
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

        console.log( rotate( Math.PI, {x: 20, y: 0} ) );

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

* 여러개의 값을 반환하거나 객체를 반환하는 경우 속성에 저장된 값을 바로 할당 가능하다. 

        let { x, y } = rotate( Math.PI / 2, point );

[Spread Operator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_operator)
-----

##### 전개 연산자

* Iterable 객체 앞에 `...`을 사용하여 함수 인자나 배열 요소, 비구조화 할당 등에 사용할 수 있다. 
* Function.apply를 대신하여 "읽기 쉽게" 쓸 수 있다. 

        function multiParam( a, b, c, d ){
            console.log( a, b, c, d );
        };

        let array = [ 1, 2, 3, 4 ];
    
        multiParam.apply( null, array ); // function.apply 사용. 
        multiParam( ...array ); // 전개 연산자를 이용해 함수의 인자를 호출. 


* 배열 리터럴 구문에 사용 가능하다. 

        let a = [ 3, 4 ];
        let b = [ 1, 2, ...a, 5, 6 ];

        console.log(b) // [1,2,3,4,5,6];

* 비구조화 할당에 사용 가능하다. 

        let [ a, b, ...c ] = [ 1, 2, 3, 4, 5 ];

        a // 1,
        b // 2,
        c // [ 3, 4, 5 ];

* new 연산자에서도 사용할 수 있다. 
        
        function Point( x = 0, y = 0 ){
            this.x = x;
            this.y = y;
        }

        const position = [ 10, 20 ];
        let p = new Point( ...position );

        p // { x: 10, y: 20 };

* Iterable 객체를 배열로 변환 가능하다. 

        function range( a, b ){

            return {
                [Symbol.iterator](){

                    return {
                        next(){
                            if( a > b ) return { done: true };

                            return { value: a++, done: false };
                        }
                    }
                }
            }
        }

        let [ ...list ] = range( 1, 5 );

        list // [ 1,2,3,4,5 ];

* 활용

        function Point( x = 0, y = 0 ){
            this.x = x;
            this.y = y;
        }

        Point.prototype = {

            [Symbol.iterator](){
                return [ this.x, this.y ][Symbol.iterator]();
            }
        }

        function rotate( x, y ){

            return [ x + 1, y + 1 ];
        }

        function transform( mat, x, y ){

            return [ x + 1, y + 1 ];
        }

        let p = new Point( 2, 4 );
        let mat = null;

        let transformedPoint = new Point( ...transform( mat, ...rotate( ...p ) ) );


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

[Generator](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/)
----

##### 정의

* 문법은 다음과 같다. 
        
        function* functionName( param ){

            let returnValue = 10;

            yield returnValue;
        }

* `function*` 키워드로 시작하며 `yield` 구문이 존재한다.
* `yield`는 일반 함수의 `return`과 비슷한 역할을 한다. 
* 제너레이터 함수의 `yield`는 `return`과 달리 여러번 실행할 수 있다. 
* `yield`가 호출되면 함수를 멈췄다가 다시 시작할 수 있게 만든다. 
* **generator는 실행을 멈췄다가 재시작할 수 있는 함수이다.**

##### 제너레이터 함수

* generator 함수는 iterable 객체와 같이 iterator를 반환한다. 

        function* hello( name ){

            yield 'a';
            yield 'b';
            yield 'c';
            yield `hello ${name}!`;
        }

        let gen = hello( 'kim' );

        gen.next(); // {value: "a", done: false}
        gen.next(); // {value: "b", done: false}
        gen.next(); // {value: "c", done: false} 
        gen.next(); // {value: "hello Kim", done: false}
        gen.next(); // {value: undefined, done: true}

* **generator는 thread가 아니다.**

##### 이터레이터로서 제너레이터

* 제너레이터는 `[Symbol.iterator]` 함수와 `next()`를 내장하고 있다. 
* 제너레이터 함수를 Iterable 객체로서 사용 가능하다. 
    
        function range( a, b ){

            return {
                [Symbol.iterator](){

                    return {
                        next(){
                            if( a > b ) return { done: true };

                            return { value: a++, done: false };
                        }
                    }
                }
            }
        }

        function* range( a, b ){

            for( ; a <= b; a++ ) yield a;
        }

        let [ ...a ] = range( 1, 5 );

        a // [ 1, 2, 3, 4, 5 ];

* `[Symbol.iterator]()` 함수를 이용해서 만든 fibonaci 수열도 generator로 다시 만들 수 있다.

        function fibonaci( len = 10 ){

            let a = 0, b = 1, t;

            return {

                [Symbol.iterator](){

                    return{

                        next(){

                            if( --len < 0 ) return { done: true };

                            t = a + b;
                            [a, b] = [b, t];

                            return { done: false, value: t };
                        }
                    }
                }
            }
        }

        function* fibonaci( len = 10 ){

            let a = 0, b = 1, t;

            for( ; len--; ){

                t = a + b;
                [a, b] = [b, t];

                yield t;
            }
        }

        let [ ...a ] = fibonaci();

        a // [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

* 무한 시퀀스를 만들 수 있다. 
* lazy evaluation을 구현할 수 있다. 
* iterable helper 함수를 만들 수 있다. 

        function* map( iterable, f ){

            for( let value of iterable ){

                yield f( value );
            }
        }

        function* filter( iterable, f ){

            for( let value of iterable ){

                if( !f( value, iterable ) ) continue;

                yield value;
            }
        }

[Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)
----

##### 정의 

* Promise는 비동기 작업을 위해 사용한다. 그러나 일련의 순서가 있는 동기 작업들이나 비동기, 동기 작업이 섞여있는 상황에서도 용이하다. 
* 지금은 아니지만 나중에 완료될 것으로 기대되는 작업을 위해 성공과 실패 두 상황에 대한 callback chain을 걸거나 단일 에러처리가 쉽도록 되어있다. 
* 대기중(pending), 완료됨(settled){ 이행됨(fulfiled), 거부됨(rejected) 두 가지중 하나로 수행 완료} 두 가지 상태를 가진다. 

##### 기본 형태

* Promise의 기본적인 형태는 다음과 같다. 

        let p = new Promise( executor );

        p.then( resolved, rejected );
        p.then( resolved, rejected );
        p.catch( rejected );

        function executor( resolve, reject ){
            // code..
        }

* Image를 load하는 기본적인 promise의 형태이다.
        
        const url = 'path/to/img';

        let p = new Promise( ( resolve, reject ) =>{

            let img = document.createElement( 'img' );

            img.src = url;

            img.onload = () => resolve( img );
            img.onerror = e => reject( e );

        }).then( img => document.body.appendChild( img ) );

* executor 내부에서 비동기 처리가 성공적으로 수행되었을 때 resolve를, 실패했을 때 reject를 호출하여 해당 promise 객체에 `.then()`으로 추가된 다음 callback으로 원하는 인자와 함께 넘겨줄 수 있다. 
* `.then()`과 `.catch()`는 모두 promise 객체를 반환하기 때문에 method chain을 통해 일련의 작업을 처리한다. 
* `.then()`의 rejected callback은 생략할 수 있다. 없을 경우 `.catch()`로 추가된 rejected callback을 찾아 호출한다. 

##### 활용

* src 폴더안에서 node server.js로 테스트 용 server를 실행한다. 
* 테스트용 서버는 "localhost:8080/api/id" 라는 api를 호출 할 경우 다음에 호출해야 할 url를 json으로 내려준다. 4단계의 api 호출을 통해 최종적으로 image url을 가져올 수 있다. 
* promise없이 코딩하면 다음과 같다. 

        function load( url, onResponse ){

            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function(e){

                if( e.target.readyState == 4 ){

                    let data = JSON.parse( e.target.responseText );

                    console.log( data );

                    onResponse( data.url )
                }
            }

            xhr.open( 'GET', 'http://localhost:8080' + url );
            xhr.send();
        }

        load( '/api/id', ( url ) =>{

            console.log( url );

            load( url, ( url ) =>{

                console.log( url );

                load( url, ( url )=>{

                    console.log( url );

                    load( url, ( url ) =>{

                        console.log( url );
                    });
                })
            });
        });

* Promise를 활용하면 다음과 같이 간략하고 읽기 쉽게 쓸 수 있다. 또한 함수를 조합(composite)하여 원하는 flow를 만들기 쉬워진다. 

        function loadPromise( url ){

            console.log( 'request', url );

            return new Promise( ( resolve, reject ) =>{

                let xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function(e){

                    if( e.target.readyState != 4 ) return;

                    let data = JSON.parse( e.target.responseText );

                    if( data.success ){

                        resolve( data );
                    }
                    else{

                        reject( data.message );
                    }
                }

                xhr.onerror = function(e){

                    reject( e );
                }

                xhr.open( 'GET', 'http://localhost:8080' + url );
                xhr.send();
            });
        }

        
        loadPromise( '/api/id' )
            .then( data => loadPromise( data.url ) )
            .then( data => loadPromise( data.url ) )
            .then( data => loadPromise( data.url ) )
            .then( data => loadImage( data.url ) )
            .catch( e => console.log( `[ERROR] ${e}` ) );

[Generator2](http://hacks.mozilla.or.kr/2016/02/es6-in-depth-generators-continued/)
----

##### `.next( param )`

* Generator 함수를 호출하여 생성한 iterator 객체는 next를 통해 Generator 함수 본문으로 값을 전달 할 수 있다. 

        function* abc(){

            console.log( 'generator started' );

            let index = 0;

            let a = yield index++,
                b = yield index++,
                c = yield index++;

            console.log( 'generator completed', a, b, c );
        }

        let iter = abc();

        iter.next(); // 첫 yield 반환값 까지 호출.
        iter.next( 'value-a'); // 'value-a'를 변수 a에 담고 다음 yield 반환값 까지 호출. 
        iter.next( 'value-b'); // 'value-a'를 변수 a에 담고 다음 yield 반환값 까지 호출. 
        iter.next( 'value-c'); // 'value-a'를 변수 a에 담고 함수 마지막까지 호출.  

* 비동기 로직에서 `.next( param )`을 이용하면 동기 로직과 같이 작성할 수 있다. 

        let img = yield loadImage( url );

* 기존 callback function을 이용하면 다음과 같이 작성할 수 있다. 다만 `iter.next( img )`가 loadImageCallback 함수의 complete와 함께 호출되어야 하기 때문에 유연한 구조라 할 수 없다. 

        const iter = asyncFunction();
        iter.next();

        function* asyncFunction(){

            let img = yield loadImageCallback( 'img/line.png' );

            document.body.appendChild( img );
        }

        function loadImageCallback( url ){

            let img = new Image();

            img.src = url;
            img.onload = () => iter.next(img);
        }

        iter = asyncFunction();

* Promise를 반환하는 비동기 함수를 호출하면 좀 더 유연한 구조로 바꿀 수 있다. 
    
        function loadImage( url ){

            return new Promise( (resolve, reject)=>{

                let img = document.createElement( 'img' );

                img.src = url;
                img.onload = () => resolve( img );
                img.onerror = e => reject(e);
            });
        }

        function* asyncFunction(){

            let img = yield loadImage( 'img/line.png' );

            document.body.appendChild( img );
        }

        const iter = asyncFunction();

        let promise = iter.next().value;

        promise.then( img => iter.next( img ) );

* `Promise.catch()`에서 잡은 에러를 `iter.throw();`를 통해 generator 본문으로 error throw가 가능하다. 

        promise.then( img => iter.next( img ) )
               .catch( e => iter.throw( e ) );

* yield 반환값이 promise일 경우 `.then( result => iter.next( result ) )` 등으로 재귀함수 처럼 호출 가능하다. 

        function co( async ){

            function next( iterResult ){

                if( iterResult.done ) return;

                const promise = iterResult.value;

                if( promise instanceof Promise ){

                    promise.then( result => next( iter.next( result ) ) );
                }
                else{

                    next( iter.next() );
                }
            }

            const iter = async();

            next( iter.next() );
        }

        co( function* (){

            let url = yield request( '/api/id' );

            url = yield request( url );
            url = yield request( url );
            url = yield request( url );

            let img = yield loadImage( url );

            document.body.appendChild( img );
        })

* generator와 promise를 사용해 비동기 코드를 동기처럼 작성 가능하도록 도와주는 library에 [co](https://github.com/tj/co)가 있다.

##### yield*

* yield는 하나의 값을 반환하지만 yield*은 iterator를 전부 구동시켜 모든 값들을 yield합니다. 
    
        function* range( a, b ){

            for( ; a <= b; a++ ) yield a;
        }

        function* yieldAll( iterA, iterB ){

            yield* iterA;
            yield* iterB;
        }

        for( let n of yieldAll( range(1,10), range(11,20) ) ){
            console.log( n );
        }

* 이를 이용해 iterator를 합치는 함수나 커다란 for loop를 refactoring 할 수 있다. 

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

[Class](http://hacks.mozilla.or.kr/2016/03/es6-in-depth-classes/)
----

##### Class

* ES6부터 class 키워드가 추가되어 클래스가 사용가능하게 되었다. 
* ES5에서는 prototype 객체를 이용해 class와 상속을 구현하였다.
        
        function Point( x, y ){
            this.x = x || 0;
            this.y = y || 0;
        }

        Point.prototype = {

            scale: function( value ){

                this.x *= value;
                this.y *= value;
            },

            rotate: function( t ){

                var cos = Math.cos(t),
                    sin = Math.sin(t),
                    x = this.x,
                    y = this.y;

                this.x = cos * x - sin * y;
                this.y = sin * x + cos * y;
            },

            normalize: function(){

                var len = this.length;

                this.x /= len;
                this.y /= len;

                return this;
            }
        }

        Object.defineProperties( Point.prototype, {

            length: {

                get: function(){
                    return Math.sqrt( this.x * this.x + this.y * this.y );
                },

                set: function( value ){
                    
                    this.normalize()
                        .scale( value );
                }
            }
        });

* ES6 class 선언은 다음과 같다. 

        // 클래스 선언
        class Point{


            // 극 좌표를 직교 좌표로 변환.
            static polar( len, t ){

                return new Point( 

                    len * Math.cos(t), 
                    len * Math.sin(t) 
                );
            }

            // 생성자
            constructor( x = 0, y = 0 ){

                this.x = x;
                this.y = y;
            }

            // iterator 함수 선언. 
            [Symbol.iterator](){

                return [ this.x, this.y ][ Symbol.iterator ]();
            }

            // generator 함수 선언. 
            *entries(){

                yield [ 'x', this.x ];
                yield [ 'y', this.y ];
            }


            scale( value ){

                this.x *= value;
                this.y *= value;
            }

            normalize(){

                let len = this.length;

                this.x /= len;
                this.y /= len;
            }

            rotate( value ){

                const   cos = Math.cos( value ),
                        sin = Math.sin( value );

                [ this.x, this.y ] =[

                    cos * this.x - sin * this.y,
                    sin * this.x + cos * this.y
                ];
            }

            // getter 선언. 
            get length(){
                return Math.sqrt( this.x * this.x + this.y * this.y );
            }

            // setter 선언. 
            set length( value ){

                this.normalize();
                this.scale( value );
            }
        }

* 생성자는 생략 가능하다. 없을 경우 `constructor(){}` 구문이 디폴트 생성자로 사용된다. 
* constructor를 generator로 만들 수는 없다. 
* 함수 뒤 세미콜론은 생략할 수 있다.
* 클래스 내부 어디에서건 this 객체에 속성을 추가하여 인스턴스 변수를 만들 수 있다. 

[SubClassing](http://hacks.mozilla.or.kr/2016/04/es6-in-depth-subclassing/)
----

##### inheritance

* ES5에서 상속은 prototype chain을 이용한다. 

        function Vector( x, y ){

            Point.apply( this, [ x, y ] );
        }

        const p = Vector.prototype = Object.create( Point.prototype );

        p.add = function(b){

            this.x += b.x;
            this.y += b.y;

            return this;
        }

        p.sub = function(b){

            this.x -= b.x;
            this.y -= b.y;

            return this;
        }

        p.rotate = function(t){

            Point.prototype.rotate.call( this, t );

            console.log( this.x, this.y );
        }

* ES6에서는 `extends` 키워드를 제공한다. 

        class Vector extends Point{

            constructor( x = 0, y = 0 ){
                // 상속할 경우 this binding을 위해 반드시 호출하여야 한다. 
                super( x, y );
            }

            // iterator 함수는 super 객체의 iterator 함수를 바로 return할 수 있다. 
            [Symbol.iterator](){

                return super[Symbol.iterator]();
            }

            // generator 함수는 바로 return할 경우 { done: true, value: super의 iterator 객체 } 
            // 형태로 반환되어 제대로 동작하지 않는다. 
            // super의 generator 함수 호출 반환값인 iterator를 모두 반환하면 된다. yield* 
            *entries(){

                yield* super.entries();
            }

            add( b ){

                this.x += b.x;
                this.y += b.y;

                return this;
            }

            sub( b ){

                this.x -= b.x;
                this.y -= b.y;

                return this;
            }

            rotate( t ){

                super.rotate(t);

                console.log( ...this );
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

Project Setting
----

##### Transpile

* 모든 브라우저가 ES6 기능을 지원하는 것은 아니기 때문에 하위 버전 script로 변환할 필요가 있다. 
* ES6 -> ES5 or ES3 변환을 transpile이라고 한다. 
* 대표적인 transpile tool로 [babel](http://babeljs.io/)이 있다. 
* import, export등 모듈화 문법은 commonjs로 변환한다. 

##### Bundle

* CommonJS, AMD 형식으로 Module화한 파일들을 하나의 파일로 연결하는 작업을 Bundle이라고 한다. 
* 대표적인 bundle tool로 [webpack](https://webpack.js.org/)이 있다. 

##### make.js

* node.js를 이용해 npm init부터 es6 개발에 필요한 모듈 설치 및 template 파일들을 생성한다. 
* `npm run webpack`으로 transpile및 bundling할 수 있다. 
* `npm run dev`로 `webpack-dev-server`를 실행하여 개발할 수 있다. 


[Module](http://hacks.mozilla.or.kr/2016/05/es6-in-depth-modules/)
----

##### 모듈 기초

* 모듈은 JS 코드를 담고 있는 파일이다. 
* 모듈은 따로 'use strict'라고 적지 않아도 자동적으로 strict 모드로 처리된다. 
* 모듈 안에서 export, import 키워드를 사용할 수 있다. 
* 모듈은 따로 모듈 스코프를 갖는다. export하지 않은 변수나 함수등은 모듈 밖에서 참조가 불가능하다. 

##### export

* export 키워드는 모든 톱-레벨(top-level) `function, class, var, let, const` 항목에 덧붙일 수 있다.

        export const RADIAN = Math.PI / 180;

        export function* range( a, b ){

            for( ; a < b; a++ ) yield a;
        }

        export class Point{

            constructor( x = 0, y = 0){
                this.x = x;
                this.y = y;
            }
        }

* 공개할 항목마다 export 를 덧붙이지 않고, 중괄호를 이용해서 공개할 항목들의 목록을 한번에 선언할 수 있다. 

        export { RADIAN, range, Point };

* export 목록은 모듈 파일의 어디에나 올 수 있다. 다만 톱-레벨(top-level) 스코프여야 한다. export 목록이 여러개 올 수도 있다. 또 export 목록과 export 선언을 함께 사용할 수도 있다. 단 어떤 심볼도 한번만 export 되어야 한다.

* default로 export할 심볼을 정할 수도 있다. CommonJS에서 `module.exports = Point`를 한것과 같은 효과이다. 
    
        class Point{

            constructor( x = 0, y = 0){
                this.x = x;
                this.y = y;
            }
        }

        export { Point as default };

* 아래와 같이 축약하여 사용할 수 있다. 

        export default class Point{

            constructor( x = 0, y = 0){
                this.x = x;
                this.y = y;
            }
        }

##### import 

* import 구문도 top level이라면 모듈 파일 어디에 위치해도 상관없다. hoisting 된다. 
* 가독성을 위해 소스 맨 위에 위치하는게 좋다. 
* default로 export되지 않은 심볼은 `{}`로 감싸야 한다. 

        import { range, Point, RADIAN } from './utils/util';

* import 하는 모듈과 겹치는 이름이 있을 경우 이름을 변경 가능하다. 

        import { RADIAN as RAD } from './utils/util';

* default로 export한 모듈일 경우 다음과 같이 import 가능하다. 

        import Point from './utils/Point';

* 아래과 같은 구문이다. 가독성을 위해 위와 같이 사용하는게 좋다. 

        import default as Point from './utils/Point';

* 모듈 네임스페이스 객체를 import할 수 있다. 

        import * as util from './utils/util';
        
        let [ ...a ] = util.range( 1, 10 );

[ES7](http://hacks.mozilla.or.kr/2016/07/es6-in-depth-the-future/)
----

##### ES7을 위한 제안

* 지수 연산자 2 ** 8 // 256 
* Array.prototype.include(value) -1 대신 true || false를 반환한다. 
* SIMD(single instruction multiple data) 최신 CPU가 제공하는 128-bit SIMD 명령어를 노출, 고성능의 대규모 연산이 필요한 경우 사용한다. 
* async await : generator + promise로 구현한 co 함수를 대신할 키워드이다. await를 통해 함수 진행을 멈추고 promise의 resolve를 기다린다. 
* TypedObject : TypedArray의 후속편. 메모리 사용과 속도에 이점이 있다. 
        
        // 새로운 struct 타입을 만듭니다.
        // 모든 Point는 x와 y라는 이름의 2개 필드를 갖습니다.
        var Point = new TypedObject.StructType({
          x: TypedObject.int32,
          y: TypedObject.int32
        });

        // 이제 정의한 타입의 인스턴스를 만듭니다.
        var p = new Point({x: 800, y: 600});
        console.log(p.x); // 800
