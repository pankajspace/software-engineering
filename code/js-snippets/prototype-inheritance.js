"use strict";

// New way

// Shape - superclass
function Shape() {
  this.name = "Shape";
  this.shape = "Any";
}

// superclass method
Shape.prototype.getShape = function () {
  console.log("this.shape: ", this.shape);
  return this.shape;
};
Shape.prototype.getName = function () {
  console.log("this.name: ", this.name);
  return this.name;
};
console.log("Shape.prototype", Shape.prototype);

// Rectangle - subclass
function Rectangle(shape) {
  Shape.call(this); // call super constructor.
  this.shape = shape;  //comment - uncomment this line to see different behaviour
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

console.log("Rectangle.prototype: ", Rectangle.prototype);

var rect = new Rectangle("Rectangle");
console.log("Is rect an instance of Rectangle?: ", rect instanceof Rectangle); // true
console.log("Is rect an instance of Shape?: ", rect instanceof Shape); // true
console.log("rect.getName(): ", rect.getName());
console.log("rect.getShape(): ", rect.getShape());
// New way

// Old way
// function Parent() {
//   this.name = "Parent";
// }
// Parent.prototype.breathes = function () {
//   console.log("Parent breathes");
// };
// var p = new Parent();
// p.breathes();

// function Child() {
//   Parent.call(this); // call super constructor.
//   this.name = "Child";
// }
// Child.prototype = new Parent();
// Child.prototype.constructor = Child;
// Child.prototype.getsBored = function () {
//   console.log("Child getsBored");
// };
// var c = new Child();
// c.getsBored();
// c.breathes();
// Old way