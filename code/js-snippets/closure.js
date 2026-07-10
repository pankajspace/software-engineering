//closure example
var makeAdder = function (first) {
  return function (second) {
    return first + second;
  };
};
var addTwo = makeAdder(2);
console.log(addTwo(1));
var addThree = makeAdder(3);
console.log(addThree(1));

//Advanced closure
function bind2(fn, obj) {
  return function () {
    return fn.apply(obj, arguments);
  };
}
var obj = {
  a: 3,
};
function addOne(b) {
  // console.log(this.a, b, arguments);
  return this.a + b + 1;
}
var result = bind2(addOne, obj);
var final = result(2);
console.log(final);
//Advanced closure

//
var rollCall = (names) => {
  //complete this function
  var i = -1;
  return function () {
    i += 1;
    if (i >= names.length) {
      return "Everyone accounted for";
    }
    console.log("names[i]", names[i]);
    return names[i];
  };
}
var rollCaller = rollCall(['Valan', 'Ezhil', 'Nila'])
rollCaller() // -> Should log 'Valan'
rollCaller() // -> Should log 'Ezhil'
rollCaller() // -> Should log 'Nila'
rollCaller() // -> Should log 'Everyone accounted for'

console.log("------------------------------------------")

// following code prints wrong output
var persons = [{ name: "Amit" }, { name: "Pankaj" }];
var addGetters = function (persons) {
  for (var i = 0; i < persons.length; i++) {
    persons[i].getName = function () {
      console.log("i", i);
    }
  }
}
addGetters(persons);
console.log("persons[0].getName()", persons[0].getName());
console.log("persons[1].getName()", persons[1].getName());
// solution
var persons = [{ name: "Amit" }, { name: "Pankaj" }];
var addGetters = function (persons) {
  var helper = function (i) {
    return function (e) {
      console.log("i", i);
    }
  }
  for (var i = 0; i < persons.length; i++) {
    persons[i].getName = helper(i);
  }
}
addGetters(persons);
console.log("persons[0].getName()", persons[0].getName());
console.log("persons[1].getName()", persons[1].getName());

console.log("------------------------------------------")

//question correct the output to 1 2 3 4 5
for (var j = 1; j < 5; j++) {
  setTimeout(function () {
    console.log("j", j);
  }, 10);
}
// answer 1
for (let j = 1; j < 5; j++) {
  setTimeout(function () {
    console.log("j", j);
  }, 10);
}
// answer 2
for (var j = 1; j < 5; j++) {
  setTimeout(() => {
    console.log("j", j);
  }, 10);
}

console.log("------------------------------------------")

//write add function in such a way that add(5, 10); add(5)(10)
function add(a, b) {
  if (arguments.length === 2) {
    return a + b;
  }
  return function (b) {
    return a + b;
  }
}
console.log("add(5, 10)", add(5, 10));
console.log("add(5)(10)", add(5)(10));

console.log("------------------------------------------")

var once = () => {
  var flag = true;
  return function () {
    if (flag) {
      console.log('once');
    }
    flag = false;
    return 22;
  }
}
var initialize = once();
console.log("initialize()", initialize());
console.log("initialize()", initialize());
//expected output as follows
//once
//22
//22

console.log("------------------------------------------")
