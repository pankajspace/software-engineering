// class based inheritance simple example
class Car {
  constructor({ title }) {
    this.title = title;
  }
  drive() {
    console.log('vroom');
  }
  honk() {
    console.log("pom");
  }
}
const car = new Car({ title: "Toyota" });
console.log("car", car);
car.drive();
car.honk();

class Toyota extends Car {
  constructor(options) {
    super(options);
    this.color = options.color;
  }
  honk() {
    super.honk(); //calling superclass honk()
    console.log("beep");
  }
}
const toyota = new Toyota({ color: "Red", title: "Toyota" });
console.log("toyota", toyota);
toyota.drive();
toyota.honk();


// Prototypal Inheritance AND getters and setters
// myPerson --> Person.prototype --> Object.prototype --> null
class Person {
  constructor(firstName, lastName, age, likes = []) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    this.likes = likes
  }
  getBio() {
    let bio = `${this.firstName} is ${this.age}.`
    this.likes.forEach((like) => {
      bio += ` ${this.firstName} likes ${like}.`
    })
    return bio
  }
  set fullName(fullName) {
    const names = fullName.split(' ')
    this.firstName = names[0]
    this.lastName = names[1]
  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

class Employee extends Person {
  constructor(firstName, lastName, age, position, likes) {
    super(firstName, lastName, age, likes)
    this.position = position
  }
  getBio() {
    return `${this.fullName} is a ${this.position}.`
  }
  getYearsLeft() {
    return 65 - this.age
  }
}

class Student extends Person {
  constructor(firstName, lastName, age, grade, likes) {
    super(firstName, lastName, age, likes)
    this.grade = grade
  }
  updateGrade(change) {
    this.grade += change
  }
  getBio() {
    const status = this.grade >= 70 ? 'passing' : 'failing'
    return `${this.firstName} is ${status} the class.`
  }
}
const me = new Employee('Andrew', 'Mead', 27, 'Teacher', [])
me.fullName = 'Clancey Turner'
console.log(me.getBio())


// Static methods and properties
// The static keyword defines a static method or property for a class. Static members (properties and methods) are called without instantiating their class and cannot be called through a class instance. Static methods are often used to create utility functions for an application, whereas static properties are useful for caches, fixed-configuration, or any other data you don't need to be replicated across instances.
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static displayName = "Point";
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}
const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.displayName; // undefined
p1.distance;    // undefined
p2.displayName; // undefined
p2.distance;    // undefined
console.log(Point.displayName);      // "Point"
console.log(Point.distance(p1, p2)); // 7.0710678118654755


// Binding this with prototype and static methods
class Animal {
  speak() {
    return this;
  }
  static eat() {
    return this;
  }
}
let obj = new Animal();
obj.speak(); // the Animal object
let speak = obj.speak;
speak(); // undefined
Animal.eat() // class Animal
let eat = Animal.eat;
eat(); // undefined


// Instance properties must be defined inside of class methods:
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
// Static (class-side) data properties and prototype data properties must be defined outside of the ClassBody declaration:
Rectangle.staticWidth = 20;
Rectangle.prototype.prototypeWidth = 25;
console.log("Rectangle", Rectangle);
console.log("Rectangle.staticWidth", Rectangle.staticWidth);
console.log("Rectangle.prototypeWidth", Rectangle.prototypeWidth);
const r = new Rectangle(10, 10);
console.log("r", r);
console.log("r.prototypeWidth", r.prototypeWidth);


// static fields and methods inheritance
class ClassWithStaticField {
  static baseStaticField = 'base static field'
  static anotherBaseStaticField = this.baseStaticField

  static baseStaticMethod() { return 'base static method output' }
}
class SubClassWithStaticField extends ClassWithStaticField {
  static subStaticField1 = "sub static field"
  static subStaticField2 = super.baseStaticMethod()
  static subStaticField3 = super.baseStaticField
}
console.log(ClassWithStaticField.anotherBaseStaticField)  // expected output: "base static field"
console.log(SubClassWithStaticField.subStaticField1)  // expected output: "sub static field"
console.log(SubClassWithStaticField.subStaticField2)  // expected output: "base static method output"
console.log(SubClassWithStaticField.subStaticField3)  // expected output: "base static field"


// Mix-ins
let calculatorMixin = Base => class extends Base {
  calc() { }
};
let randomizerMixin = Base => class extends Base {
  randomize() { }
};
class Foo { }
class Bar extends calculatorMixin(randomizerMixin(Foo)) { }


// Like properties, field names may be computed.
const PREFIX = 'prefix'
class ClassWithComputedFieldName {
    [`${PREFIX}Field`] = 'prefixed field'
}
const instance = new ClassWithComputedFieldName()
console.log(instance.prefixField) // expected output: "prefixed field"


// private fields
class ClassWithGetSet {
  #msg = 'hello world'
  get msg() {
    return this.#msg
  }
  set msg(x) {
    this.#msg = `hello ${x}`
  }
}
const instance1 = new ClassWithGetSet()
console.log(instance1.msg) // expected output: "hello worl​d"
instance1.msg = 'cake'
console.log(instance1.msg)  // expected output: "hello cake"