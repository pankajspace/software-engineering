// The three common ways to create new objects in JavaScript are as follows:
var newObject1 = {};
var newObject2 = Object.create(Object.prototype);
var newObject3 = new Object();


// There are then four ways in which keys and values can then be assigned to an object:
// ECMAScript 3 compatible approaches

// 1. Dot syntax
// Set properties
newObject1.someKey = "Hello World";
// Get properties
var value = newObject1.someKey;

// 2. Square bracket syntax
// Set properties
newObject1["someKey"] = "Hello World";
// Get properties
var value = newObject1["someKey"];

// 3. Object.defineProperty
// Set properties
Object.defineProperty(newObject1, "someKey", {
  value: "for more control of the property's behavior",
  writable: true,
  enumerable: true,
  configurable: true
});
// If the above feels a little difficult to read, a short-hand could be written as follows:
var defineProp = function (obj, key, value) {
  var config = {
    value: value,
    writable: true,
    enumerable: true,
    configurable: true
  };
  Object.defineProperty(obj, key, config);
};
// To use, we then create a new empty "person" object
var person = Object.create(Object.prototype);
// Populate the object with properties
defineProp(person, "car", "Delorean");
defineProp(person, "dateOfBirth", "1981");
defineProp(person, "hasBeard", false);
console.log(person);
// Outputs: Object {car: "Delorean", dateOfBirth: "1981", hasBeard: false}

// 4. Object.defineProperties
// Set properties
Object.defineProperties(newObject1, {
  "someKey": {
    value: "Hello World",
    writable: true
  },
  "anotherKey": {
    value: "Foo bar",
    writable: false
  }
});

// Getting properties for 3. and 4. can be done using any of the options in 1. and 2.



// old syntax of object
let name = "Pankaj";
const person1 = {
  name: name,
  getName: function () {
    return this.name;
  }
}
console.log(person1.name);
console.log(person1.getName());


// enhanced object literal syntax
const person2 = {
  name,
  getName() {
    return this.name;
  }
}
console.log(person2.name);
console.log(person2.getName());


// getters and setters
const data = {
  locations: [],
  get location() {
    // we can format the data before returning
    return this._location.toUpperCase();
  },
  set location(value) {
    // we can sanitize or validate the data before storing
    this._location = value.trim();
    // we can perform other things also inside location setter
    this.locations.push(this._location);
  }
}
data.location = " thane ";
data.location = " pune ";
console.log(data);
console.log(data.location);


// The Object.create() method creates a new object, using an existing object as the prototype of the newly created object.
const person3 = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};
const me = Object.create(person3);
me.name = 'Matthew'; // "name" is a property set on "me", but not on "person3"
me.isHuman = true; // inherited properties can be overwritten
me.printIntroduction();
// expected output: "My name is Matthew. Am I human? true"


// Below is an example of how to use Object.create() to achieve classical inheritance. This is for a single inheritance, which is all that JavaScript supports.
// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}
// superclass method
Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};
// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}
// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);
//If you don't set Rectangle.prototype.constructor to Rectangle,
//it will take the prototype.constructor of Shape (parent).
//To avoid that, we set the prototype.constructor to Rectangle (child).
Rectangle.prototype.constructor = Rectangle;
var rect = new Rectangle();
console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?', rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'


// If you wish to inherit from multiple objects, then mixins are a possibility.
function SuperClass() {

}
function OtherSuperClass() {

}
function MyClass() {
  SuperClass.call(this);
  OtherSuperClass.call(this);
}
// inherit one class
MyClass.prototype = Object.create(SuperClass.prototype);
// mixin another
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// re-assign constructor
MyClass.prototype.constructor = MyClass;
MyClass.prototype.myMethod = function () {
  // do something
};


//--------------------------------------------------------------------------

// var Person1 = {
//   firstName: "John1",
//   lastName: "Doe1",
//   getName: function () {
//     console.log(this.firstName + " " + this.lastName);
//   },
// };
// Person1.getName();

// var Person2 = {
//   firstName: "Jane2",
//   lastName: "Doe2",
// };

// Person2.getName = Person1.getName;

// Person2.getName();
// Person1.getName.call(Person2);

// var Person3 = Object.create(Person1);
// Person3.getName();

//--------------------------------------------------------------------------

var Person4 = function () {
  this.firstName = "John4";
  this.lastName = "Doe4";
};
Person4.prototype.getName = function () {
  console.log(this.firstName + " " + this.lastName);
};

Person4.prototype.firstName = "test0";
Person4.prototype.getName();

var p4 = new Person4();
p4.getName();

p4.firstName = "John4Obj";
p4.getName();

Person4.firstName = "test";
Person4.prototype.getName = function () {
  console.log(this.firstName);
  console.log(Person4.firstName);
};
p4.getName();

var Person5 = {
  firstName: "Jane5",
  lastName: "Doe5",
};

Person5.getName = Person4.prototype.getName;
Person5.getName();

//--------------------------------------------------------------------------



