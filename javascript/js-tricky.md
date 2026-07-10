[<- JavaScript](js-quick.md)

# JavaScript Tricky Questions

## return vs break vs continue in javascript.
```js
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    return;
  }
  console.log(i); // 0 1 2 3 4
}

for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i); // 0 1 2 3 4
}

for (let i = 0; i < 10; i++) {
  if (i === 5) {
    continue;
  }
  console.log(i); // 0 1 2 3 4 6 7 8 9
}
```

## Why console.log(.1 + .2) = 0.30000000000000004
Because of the way floating point numbers are stored in memory, it is not possible to store all floating point numbers accurately in memory. This is why you get the rounding error when you add .1 and .2 together. 

## When we use anything as the key of an object it will be converted to the string representation.
```js
let a = {};
let b = { key: 'b' };
let c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]); // 456
```

## What is the output
```js
"1" + 2 + 3	  //123
"1" + 2 + "3"	//123
"1" -2 + "3"  //-13
"1" -2 - 3	  //-4
```

## What will happen?
```js
var x = 1; 
let x = 1; 
const x = 1;

// Uncaught SyntaxError: Identifier 'x' has already been declared
```

## Can we use a variable across two files in javascript?
No, we can't use a variable across two files in javascript. But we can use a variable across two files in javascript using the window object.

## What will be the Output of the following?
```js
console.log(0 == false);// true
console.log(0 === false);// false, because they are of a different type
console.log(1 == "1");// true, auto type coercion
console.log(1 === "1");// false, because they are of a different type
console.log(null == undefined);// true
console.log(null === undefined);// false
console.log('0' == false);// true
console.log('0' === false);// false
console.log('false' === "false");// true
console.log(false == "false");// false
```

## I'm iterating through this array I defined, it has 3 numbers in it. The numbers 1 2 and 3. Why on earth is jack showing up?
```js
Object.prototype.jack = {};

let a = [1,2,3];
for ( let number in a ) {
  console.log( number ) // 0 1 2 jack
}

// To fix this
for ( let number of a ) {
  console.log( number ) // 1 2 3
}
```

## Why does it console.log undefined when I declared the jack variable to be 'Jack'?
```js
(function() {
  var jack = 'Jack';
})();
console.log(typeof jack) // undefined
```

## Why isn't it logging 2?
```html
<script src="file.js">console.log(2);</script>
```

## Why does it say object and not array? How would I detect if its an array?
```js
let array = [1, 2]; console.log(typeof array); // object
```

## Why does the second console.log say undefined?
```html
<a id="clickme">click me!</a>
<script>
  let a = document.getElementById('clickme');
  a.onclick = function() {
    console.log(this.innerHTML) // click me!
    setTimeout( function() {
      console.log( this.innerHTML ); // undefined
    }, 1000);
  };

  // To fix this we can use that variable
  a.onclick = function() {
    console.log(this.innerHTML) // click me!
    let that = this;
    setTimeout( function() {
      console.log( that.innerHTML ); // click me!
    }, 1000);
  };

  // Another way is to use arrow function
  a.onclick = function() {
    console.log(this.innerHTML) // click me!
    setTimeout( () => {
      console.log( this.innerHTML ); // click me!
    }, 1000);
  };
</script>
```

## How come it doesn't replace the text with FOOBAR??
```html
<p id="test">original</p>
<script>
  let test = document.getElementById('test');
  test.innerHTML.replace('original', 'FOOBAR'); // original

  // To fix this
  test.innerHTML = test.innerHTML.replace('original', 'FOOBAR');
</script>
```

## Why does it first console.log Jack, then undefined?
```js
function identity() {
  var name = 'Jack';
  console.log(name);
  return
  name
};
var who = identity();
console.log(who) // undefined
```

## The console.log should give me 8. why doesn't it give me 8?
```js
var number = '08', parsed = parseInt(number);
console.log(parsed); // 0
```

## How come I can't retrieve Google's homepage text with XHR[6] from my localhost?
```js
let xhr = new XMLHttpRequest();
xhr.open("GET", "http://www.google.com", true);
xhr.onreadystatechange = function(){
  if ( xhr.readyState == 4 ) {
    if ( xhr.status == 200 ) {
      console.log( xhr.responseText )
    } else {
      console.log( xhr.status )
    }
  }
};
xhr.send(null);
```

## I have two strings, but the second evaluation doesn't become true. Is this a potential bug? How come it's not true?
```js
console.log([typeof 'hi' === 'string', typeof new String('hi') === 'string' ]); // [true, false]

// To fix this
console.log([typeof 'hi' === 'string', typeof new String('hi') === 'object' ]); // [true, true]
```

## Write sum function such that it will work when called like sum(2,3) or sum(2)(3).
```js
function sum(a, b) {
  if (arguments.length == 2) {
    return a + b;
  }
  return function(b) {
    return a + b;
  }
}
console.log(sum(1, 2));
console.log(sum(1)(2));
```

## Output?
```js
var a = 1;
(function b() {
  console.log(a); // undefined
  var a = 2;
  console.log(a); // 2
  if (true) {
    console.log(a); // 2
    var a = 3;
    console.log(a); // 3
  }
  console.log(a); // 3
})();
console.log(a); // 1
```

```js
(function() {
  try {
    throw new Error();
  } catch (x) {
    var x = 1, y = 2;
    console.log("catch x", x);
  }
  console.log("x", x);
  console.log("y", y);
})();

console.log("-------------------------------------");

var x = 21;
var girl = function() {
  console.log(x);
  var x = 20;
};
girl();

console.log("-------------------------------------");

function Point() { 
  this.x = 20;
  this.getX = function() { return this.x; }
}
var a = new Point();
var f = a.getX;
console.log(f()); // undefined

// To fix this
var f = a.getX.bind(a);
console.log(f()); // 20

console.log("-------------------------------------");

function print20to30() {
  for (x = 20; x <= 30; x++) {
    console.log(x);
  }
}

function print1to10() {
  for (x = 1; x <= 10; x++) {
    print20to30();
    console.log(x);
  }
}
print1to10(); // 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31

console.log("-------------------------------------");

parent();
function parent() {
  console.log("parent start...");
  child();

  function child() {
    console.log("child start...");
    outer();
    console.log("child ends...");
  }
  console.log("parent ends...");
}

function outer() {
  console.log("outer start...");
  child();
  console.log("outer ends...");
}

console.log("-------------------------------------");

let a = { a: 1 };
let b = { a: 1 };
console.log("a == b", a == b);
console.log("a === b", a === b);
let c = a;
console.log("a == c", a == c);
console.log("a === c", a === c);

console.log("-------------------------------------");

console.log("null == undefined", null == undefined);
console.log("null == NaN", null == NaN);
console.log("undefined == NaN", undefined == NaN);
console.log("NaN == NaN", NaN == NaN);

console.log("-------------------------------------");

console.log("null === undefined", null === undefined);
console.log("null === NaN", null === NaN);
console.log("undefined === NaN", undefined === NaN);
console.log("NaN == NaN", NaN == NaN);

console.log("-------------------------------------");

console.log("false % 1", false % 1);
console.log("'' % 1", '' % 1);
console.log("[] == true", [] == true);

console.log("-------------------------------------");

function isTwoPassed() {
  let args = Array.prototype.slice.call(arguments);
  return args.indexOf(2) != -1;
}
isTwoPassed(1, 4) //false 
isTwoPassed(5, 3, 1, 2) //true 

console.log("-------------------------------------");

console.log("typeof []", typeof []);
console.log("typeof NaN", typeof NaN);
console.log("typeof null", typeof null);
console.log("2 + true", 2 + true);
console.log("'6' + 9", '6' + 9);
console.log("4 + 3 + 2 + '1'", 4 + 3 + 2 + '1');
console.log("'1' + 2 + 4", '1' + 2 + 4);
console.log("-'34' + 10", -'34' + 10);
console.log("+ 'dude'", + 'dude');

console.log("-------------------------------------");

let y = 1, x = y = typeof x;
console.log("x", x);

console.log("-------------------------------------");

let d = (2, 3, 5);
console.log("d", d);

console.log("-------------------------------------");

let e = (1, 5 - 1) * 2;
console.log("e", e);

console.log("-------------------------------------");

console.log("!'bang'", !'bang');
console.log("parseFloat('12.3.4')", parseFloat('12.3.4'));
console.log("Math.max([2, 3, 4, 5])", Math.max([2, 3, 4, 5]));
console.log("3 instanceof Number", 3 instanceof Number);
console.log("!!function() { }", !!function () { });
console.log("typeof bar", typeof bar);
console.log("typeof null", typeof null);

console.log("-------------------------------------");

let f = 2, g = 3;
console.log("f && g", f && g);

console.log("-------------------------------------");

var foo = 'outside';
function logIt() { console.log("foo", foo); var foo = 'inside'; }
logIt();

console.log("-------------------------------------");

console.log("-5 % 2", -5 % 2);
console.log(".1 + .2 != .3", .1 + .2 != .3);
// console.log("42.toString()", 42.toString());  //SyntaxError
console.log("42..toString()", 42..toString());
// console.log("4.2..toString", 4.2..toString);  //SyntaxError
console.log("2 in [1, 2]", 2 in [1, 2]);

console.log("-------------------------------------");

function log() {
  let args = Array.prototype.slice.call(arguments);
  args.unshift('(app)');
  console.log.apply(console, args);
}
log('my message'); //(app) my message 
log('my message', 'your message'); //(app) my message your message 

console.log("-------------------------------------");

var h = 1;
function i() {
  h = 10;
  return;
  function h() { }
}
i();
console.log("h", h);

console.log("-------------------------------------");

var myObject = {
  price: 20.99,
  get_price: function () {
    return this.price;
  }
};
var customObject = Object.create(myObject);
customObject.price = 19.99;
delete customObject.price;
console.log("customObject.get_price()", customObject.get_price());

console.log("-------------------------------------");

var num = 10;
var name = "Addy Osmani";
var obj1 = {
  value: "first value"
};
var obj2 = {
  value: "second value"
};
var obj3 = obj2;
function change(num, name, obj1, obj2) {
  num = num * 10;
  name = "Paul Irish";
  obj1 = obj2;
  obj2.value = "new value";
}
change(num, name, obj1, obj2);
console.log("num", num);
console.log("name", name);
console.log("obj1.value", obj1.value);
console.log("obj2.value", obj2.value);
console.log("obj3.value", obj3.value);

console.log("-------------------------------------");

// In JavaScript isNaN(undefined) returns true.how could you fix it ? 
function isReallyNaN(x) { return x !== x; }
console.log("isReallyNaN(undefined)", isReallyNaN(undefined));

console.log("-------------------------------------");

(function () {
  var j = k = 3; // Silently assigns 3 to a global variable k
})();
console.log("typeof j", typeof j);
console.log("k", k);

console.log("-------------------------------------");

let company = "HCL";
console.log("typeof company", typeof company);

console.log("-------------------------------------");

let hcl = new Array(4).toString()
console.log("hcl", hcl);

console.log("-------------------------------------");

console.log("[]+[]+'HCL'.split('')", [] + [] + 'HCL'.split(''));

console.log("-------------------------------------");

let hclArr = [];
hclArr[0] = "HTML";
hclArr[1] = "CSS";
hclArr.script = "JavaScript";
console.log("hclArr.length", hclArr.length);

console.log("-------------------------------------");

let hcl2 = "Schools";
let hcl3 = hcl2.lastIndexOf("s");
console.log("hcl3", hcl3);

console.log("-------------------------------------");

if (String('Hello') === 'Hello') {
  console.log("Welcome HCL");
}

console.log("-------------------------------------");

function* increment() {
  var counter = 0;
  for (let i = 0; i < 10; i++) {
    yield counter++;
  }
}
var counterIncrement = increment();
counterIncrement.next();
counterIncrement.next();
console.log("counterIncrement.next().value", counterIncrement.next().value)

console.log("-------------------------------------");

function aaa() {
  return {
    test: 1
  }
}
console.log("typeof aaa()", typeof aaa());

console.log("-------------------------------------");

function bbb() {
  return aasd = 10;
}
console.log("bbb()", bbb())

console.log("-------------------------------------");

let t1 = "bangalore";
console.log("t1.substring(4, 6)", t1.substring(4, 6))

console.log("-------------------------------------");

let fruits = ["a", "o", "g", "m"];
let [hcl4, ...hcl5] = fruits;
console.log("hcl4, hcl5", hcl4, hcl5)

console.log("-------------------------------------");

if (9 > 7 > 3) {
  console.log("9 > 7 > 3", true)
} else {
  console.log("9 > 7 > 3", false)
}

console.log("-------------------------------------");

let t1 = 3;
let t2 = 3;
let result = eval("t1*t2")
console.log("result", result)

console.log("-------------------------------------");

let hcl6 = [];
for (let { x = 2, y } of [{ x: 1 }, 2, { y }]) {
  hcl6.push(x, y)
}
console.log("hcl6", hcl6)

console.log("-------------------------------------");

let myarr = ["h", "c", "j"]
myarr[2]
console.log("2 in myarr", 2 in myarr)

console.log("-------------------------------------");

console.log("3" - -"3");

console.log("-------------------------------------");

var x = 10;
var level1 = {
  x: 20,
  level2: {
    x: 30,
    level3: function () {
      return this.x;
    }
  }
}
var fun = level1.level2.level3;
console.log("fun()", fun());
console.log("level1.level2.level3()", level1.level2.level3());

console.log("-------------------------------------");
```

```js
"1" + 2 + 3	  //123
"1" + 2 + "3"	//123
"1" -2 + "3"  //-13
```

```js
var x = 1;
let x = 1;
// Uncaught SyntaxError: Identifier 'x' has already been declared
```

```js
(function(){
  var a = b = 3;
})();
console.log("a defined? " + (typeof a !== 'undefined')); // a defined? false
console.log("b defined? " + (typeof b !== 'undefined')); // b defined? true
```

```js
const KEY = 'white_rabbit';
if (true) {
  const KEY = 'ginger_rabbit';
}
console.log(KEY); //  'white_rabbit'
```

```js
let x = 42;
if (true) {
  console.log(x);
  let x = 1337;
}
// ReferenceError: Cannot access 'x' before initialization
```

```js
const obj = {
  outer: function() {
    const self1 = this;
    function inner1() {
      const self2 = this;
      function inner2() {
        const self3 = this;
      }
    }
  }
}  
console.log(self1 !== self3) // true
console.log(self2 !== self3) // true
console.log(self1 === self2) // false
console.log(self2 !== self3) // true
```

```js
var b = 1;
function outer() {
  var b = 2
  function inner() {
    b++;
    console.log(b)
    var b = 3;
  }
  inner();
}
outer();

let b = 1;
function outer() {
  let b = 2
  function inner() {
    b++;
    console.log(b)
    let b = 3;
  }
  inner();
}
outer();
```

---

[<- JavaScript](js-quick.md)