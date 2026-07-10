[<- Java Quick](java-quick.md)

# Core Java
Below is a comprehensive overview of Core Java concepts, organized into major sections. Each concept includes a brief explanation and a concise code example. You can copy these snippets into a Java IDE or compile/run them via `javac` and `java` to see them in action.

---

## 1. Java Basics

### 1.1. Java Platform Editions

* **Java SE (Standard Edition)**: Core language and libraries (collections, I/O, concurrency, JDBC, etc.).
* **Java EE (Enterprise Edition)**: Adds APIs for web services, servlets, EJBs, JMS, etc.
* **Java ME (Micro Edition)**: For constrained devices (embedded/mobile), not covered here.

### 1.2. Hello World & Structure

Every Java program (standalone application) starts with a class containing a `public static void main(String[] args)` method:

```java
// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Core Java!");
    }
}
```

* **Compile**: `javac HelloWorld.java`
* **Run**: `java HelloWorld`

---

## 2. Data Types, Variables, and Operators

### 2.1. Primitive Data Types

Java has eight primitive types:

1. **byte**: 8-bit signed integer (−128 to 127)
2. **short**: 16-bit signed integer (−32,768 to 32,767)
3. **int**: 32-bit signed integer (−2³¹ to 2³¹−1)
4. **long**: 64-bit signed integer (−2⁶³ to 2⁶³−1) — literal suffix `L` or `l` required.
5. **float**: 32-bit IEEE 754 floating point — suffix `f` or `F`.
6. **double**: 64-bit IEEE 754 floating point.
7. **char**: 16-bit Unicode character.
8. **boolean**: true or false.

```java
public class PrimitivesDemo {
    public static void main(String[] args) {
        byte b = 100;
        short s = 10000;
        int i = 1_000_000;
        long l = 1_000_000_000L;

        float f = 3.14f;
        double d = 3.141592653589793;

        char c = 'J';
        boolean flag = true;

        System.out.println("byte: " + b);
        System.out.println("short: " + s);
        System.out.println("int: " + i);
        System.out.println("long: " + l);
        System.out.println("float: " + f);
        System.out.println("double: " + d);
        System.out.println("char: " + c);
        System.out.println("boolean: " + flag);
    }
}
```

### 2.2. Type Conversion and Casting

* **Widening (implicit)**: `byte → short → int → long → float → double`
* **Narrowing (explicit)**: e.g., `double → float → long → int → short → byte`

```java
public class CastingDemo {
    public static void main(String[] args) {
        int x = 100;
        double y = x; // implicit widening
        System.out.println("double y: " + y); // 100.0

        double pi = 3.14159;
        int truncatedPi = (int) pi; // explicit narrowing
        System.out.println("int truncatedPi: " + truncatedPi); // 3

        char letter = 'A'; // Unicode 65
        int codePoint = letter; // char → int implicitly
        System.out.println("Code of 'A': " + codePoint); // 65

        int z = 90;
        char zChar = (char) z; // int → char
        System.out.println("Char for 90: " + zChar); // 'Z'
    }
}
```

### 2.3. Reference (Non-Primitive) Types

* Any class, interface, array, or enum is a reference type (stored on the heap).
* Example: `String`, `Integer`, `CustomClass`, `int[]`, etc.

```java
public class ReferenceDemo {
    public static void main(String[] args) {
        String str = "Core Java";
        Integer num = 42;         // Autoboxing: int → Integer
        int primitiveNum = num;   // Unboxing: Integer → int

        int[] array = {1, 2, 3};
        System.out.println("String: " + str);
        System.out.println("Integer object: " + num);
        System.out.println("Primitive from Integer: " + primitiveNum);
        System.out.print("Array elements: ");
        for (int v : array) {
            System.out.print(v + " ");
        }
    }
}
```

### 2.4. Operators

#### 2.4.1. Arithmetic Operators

```java
public class ArithmeticOps {
    public static void main(String[] args) {
        int a = 10, b = 3;
        System.out.println("a + b = " + (a + b)); // 13
        System.out.println("a - b = " + (a - b)); // 7
        System.out.println("a * b = " + (a * b)); // 30
        System.out.println("a / b = " + (a / b)); // 3 (integer division)
        System.out.println("a % b = " + (a % b)); // 1
        System.out.println("a++ = " + (a++));     // 10, then a becomes 11
        System.out.println("++b = " + (++b));     // 4
    }
}
```

#### 2.4.2. Relational & Logical Operators

```java
public class RelationalLogical {
    public static void main(String[] args) {
        int x = 5, y = 10;
        System.out.println("x < y: " + (x < y));   // true
        System.out.println("x == y: " + (x == y)); // false

        boolean cond1 = (x < y); // true
        boolean cond2 = (y > 5); // true
        System.out.println("cond1 && cond2: " + (cond1 && cond2)); // true
        System.out.println("cond1 || (y < 5): " + (cond1 || (y < 5))); // true
        System.out.println("!(x > y): " + !(x > y)); // true
    }
}
```

#### 2.4.3. Assignment & Compound Assignment

```java
public class AssignmentOps {
    public static void main(String[] args) {
        int n = 10;
        n += 5; // n = n + 5 → 15
        System.out.println("n after += 5: " + n);

        n *= 2; // n = n * 2 → 30
        System.out.println("n after *= 2: " + n);

        n %= 7; // n = n % 7 → 2
        System.out.println("n after %= 7: " + n);
    }
}
```

#### 2.4.4. Ternary Operator

```java
public class TernaryDemo {
    public static void main(String[] args) {
        int val = 20;
        String result = (val % 2 == 0) ? "Even" : "Odd";
        System.out.println(val + " is " + result); // "20 is Even"
    }
}
```

---

## 3. Control Flow

### 3.1. Conditional Statements

#### 3.1.1. `if` / `else if` / `else`

```java
public class IfElseDemo {
    public static void main(String[] args) {
        int age = 17;
        if (age < 13) {
            System.out.println("Child");
        } else if (age < 18) {
            System.out.println("Teenager");
        } else {
            System.out.println("Adult");
        }
    }
}
```

#### 3.1.2. `switch` (Statement and Expression, Java 14+)

```java
public class SwitchDemo {
    public static void main(String[] args) {
        int day = 3;
        // Traditional switch statement
        String dayName;
        switch (day) {
            case 1:
                dayName = "Sunday";
                break;
            case 2:
                dayName = "Monday";
                break;
            case 3:
                dayName = "Tuesday";
                break;
            default:
                dayName = "Invalid day";
        }
        System.out.println("Day " + day + " is " + dayName);

        // Java 14+ switch expression
        dayName = switch (day) {
            case 1 -> "Sunday";
            case 2 -> "Monday";
            case 3 -> "Tuesday";
            default -> "Invalid day";
        };
        System.out.println("Switch Expression: " + dayName);
    }
}
```

### 3.2. Loops

#### 3.2.1. `for` Loop

```java
public class ForLoopDemo {
    public static void main(String[] args) {
        // Traditional C-style for loop
        for (int i = 0; i < 5; i++) {
            System.out.println("i = " + i);
        }

        // Enhanced for-each loop (arrays/collections)
        int[] arr = {10, 20, 30};
        for (int num : arr) {
            System.out.println("num = " + num);
        }
    }
}
```

#### 3.2.2. `while` and `do-while`

```java
public class WhileDoWhileDemo {
    public static void main(String[] args) {
        int count = 0;
        while (count < 3) {
            System.out.println("while count: " + count);
            count++;
        }

        int j = 0;
        do {
            System.out.println("do-while j: " + j);
            j++;
        } while (j < 3);
    }
}
```

#### 3.2.3. `break` and `continue`

```java
public class BreakContinueDemo {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            if (i == 3) {
                continue; // skip printing 3
            }
            if (i == 5) {
                break; // exit loop when i == 5
            }
            System.out.println("i = " + i);
        }
        // Output: i = 1, i = 2, i = 4
    }
}
```

---

## 4. Object-Oriented Programming (OOP)

### 4.1. Classes and Objects

#### 4.1.1. Defining a Class and Creating Objects

```java
// Person.java
public class Person {
    // Fields (instance variables)
    String name;
    int age;

    // Constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Instance method
    public void introduce() {
        System.out.println("Hello, I'm " + name + " and I'm " + age + " years old.");
    }
}

// MainApp.java
public class MainApp {
    public static void main(String[] args) {
        Person alice = new Person("Alice", 30);
        alice.introduce(); // "Hello, I'm Alice and I'm 30 years old."
    }
}
```

#### 4.1.2. `static` Members vs. Instance Members

* **Instance members** (fields/methods) belong to each object.
* **Static members** belong to the class itself (one copy shared by all instances).

```java
public class Counter {
    private int count = 0;              // instance field
    private static int totalCount = 0;  // static field

    public void increment() {
        count++;
        totalCount++;
    }

    public int getCount() {
        return count;
    }

    public static int getTotalCount() {
        return totalCount;
    }

    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();

        c1.increment();
        c1.increment();
        c2.increment();

        System.out.println("c1 count: " + c1.getCount());           // 2
        System.out.println("c2 count: " + c2.getCount());           // 1
        System.out.println("Total count: " + Counter.getTotalCount()); // 3
    }
}
```

### 4.2. Encapsulation

* Use **private** fields and **public** getters/setters to control access.
* Protects internal state and allows validation.

```java
public class BankAccount {
    private String accountNumber;
    private double balance;

    public BankAccount(String acctNum, double initialBalance) {
        this.accountNumber = acctNum;
        this.balance = initialBalance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        } else {
            System.out.println("Deposit amount must be positive.");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        } else {
            System.out.println("Invalid withdraw amount or insufficient funds.");
        }
    }

    public static void main(String[] args) {
        BankAccount acct = new BankAccount("ACC1001", 500.0);
        System.out.println("Balance: " + acct.getBalance()); // 500.0
        acct.deposit(200);
        System.out.println("Balance: " + acct.getBalance()); // 700.0
        acct.withdraw(800); // prints error message
    }
}
```

### 4.3. Inheritance

#### 4.3.1. Single Inheritance

```java
// Animal.java (superclass)
public class Animal {
    public void eat() {
        System.out.println("Animal is eating.");
    }
}

// Dog.java (subclass)
public class Dog extends Animal {
    public void bark() {
        System.out.println("Dog is barking.");
    }
}

// MainApp.java
public class MainApp {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat();  // inherited from Animal
        dog.bark(); // defined in Dog
    }
}
```

#### 4.3.2. Method Overriding and `super`

```java
// Vehicle.java (base class)
public class Vehicle {
    public void startEngine() {
        System.out.println("Starting generic vehicle engine.");
    }
}

// Car.java (subclass)
public class Car extends Vehicle {
    @Override
    public void startEngine() {
        // Call superclass method (optional)
        super.startEngine();
        System.out.println("Starting car-specific engine.");
    }
}

// MainApp.java
public class MainApp {
    public static void main(String[] args) {
        Vehicle v = new Car();
        v.startEngine();
        // Output:
        // Starting generic vehicle engine.
        // Starting car-specific engine.
    }
}
```

### 4.4. Abstract Classes and Methods

* An **abstract class** cannot be instantiated directly. It may contain abstract methods (no body) and/or concrete methods.
* **Subclasses** must implement all abstract methods or be declared abstract themselves.

```java
// Shape.java (abstract)
public abstract class Shape {
    String color;

    public Shape(String color) {
        this.color = color;
    }

    // Abstract method (no implementation)
    public abstract double area();

    // Concrete method
    public void describe() {
        System.out.println("This is a " + color + " shape.");
    }
}

// Rectangle.java (concrete subclass)
public class Rectangle extends Shape {
    private double width, height;

    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() {
        return width * height;
    }
}

// MainApp.java
public class MainApp {
    public static void main(String[] args) {
        // Shape s = new Shape("red"); // ❌ Cannot instantiate abstract class
        Rectangle rect = new Rectangle("blue", 5.0, 3.0);
        rect.describe();                      // "This is a blue shape."
        System.out.println("Area = " + rect.area()); // 15.0
    }
}
```

### 4.5. Interfaces

* An **interface** declares method signatures (Java 8+ allows default and static methods).
* A class **implements** one or more interfaces and provides method bodies.

```java
// Drivable.java
public interface Drivable {
    void startEngine();
    void stopEngine();

    // Java 8+ default method
    default void honk() {
        System.out.println("Generic honk!");
    }
}

// Car.java
public class Car implements Drivable {
    @Override
    public void startEngine() {
        System.out.println("Car engine started.");
    }

    @Override
    public void stopEngine() {
        System.out.println("Car engine stopped.");
    }
}

// MainApp.java
public class MainApp {
    public static void main(String[] args) {
        Drivable d = new Car();
        d.startEngine(); // "Car engine started."
        d.honk();        // "Generic honk!" (from default method)
        d.stopEngine();  // "Car engine stopped."
    }
}
```

* **Multiple inheritance of type**: A class can implement multiple interfaces.

```java
public interface Flyable {
    void fly();
}

public class Bird implements Drivable, Flyable {
    @Override
    public void startEngine() {
        System.out.println("Bird doesn't have engine!");
    }

    @Override
    public void stopEngine() {
        System.out.println("Bird doesn't have engine!");
    }

    @Override
    public void fly() {
        System.out.println("Bird is flying.");
    }

    public static void main(String[] args) {
        Bird b = new Bird();
        b.fly();
        b.startEngine(); // awkward, but compiles
    }
}
```

---

## 5. Packages and Access Modifiers

### 5.1. Packaging

* Use `package` declarations to group related classes.
* Directory structure must match package hierarchy.

```
src/
  com/
    example/
      util/
        Utils.java
      app/
        MainApp.java
```

```java
// Utils.java (in src/com/example/util/Utils.java)
package com.example.util;

public class Utils {
    public static void printHello() {
        System.out.println("Hello from Utils!");
    }
}
```

```java
// MainApp.java (in src/com/example/app/MainApp.java)
package com.example.app;

import com.example.util.Utils;

public class MainApp {
    public static void main(String[] args) {
        Utils.printHello(); // "Hello from Utils!"
    }
}
```

* **Compile** from `src` folder:

  ```
  javac com/example/util/Utils.java com/example/app/MainApp.java
  ```
* **Run** from `src` folder:

  ```
  java com.example.app.MainApp
  ```

### 5.2. Access Modifiers

1. **`public`**: Visible anywhere.
2. **`protected`**: Visible in the same package and subclasses (even if in different packages).
3. **(default/package-private)**: No modifier → visible within the same package only.
4. **`private`**: Visible only within the same class.

```java
// In package com.example.access:
package com.example.access;

public class Person {
    public String publicField = "public";
    protected String protectedField = "protected";
    String defaultField = "package-private";
    private String privateField = "private";

    public void showFields() {
        System.out.println(publicField);
        System.out.println(protectedField);
        System.out.println(defaultField);
        System.out.println(privateField);
    }
}

// In the same package (com.example.access):
package com.example.access;

public class TestAccess {
    public static void main(String[] args) {
        Person p = new Person();
        System.out.println(p.publicField);      // OK
        System.out.println(p.protectedField);   // OK (same package)
        System.out.println(p.defaultField);     // OK (same package)
        // System.out.println(p.privateField);  // ❌ Compile error
    }
}

// In a different package (com.example.other):
package com.example.other;

import com.example.access.Person;

public class OtherAccess {
    public static void main(String[] args) {
        Person p = new Person();
        System.out.println(p.publicField);    // OK
        // System.out.println(p.protectedField); // ❌ Not visible (different package, not subclass)
        // System.out.println(p.defaultField);   // ❌ Not visible (different package)
        // System.out.println(p.privateField);   // ❌ Not visible
    }
}
```

---

## 6. Exception Handling

### 6.1. Checked vs. Unchecked Exceptions

* **Checked exceptions**: Must be declared (`throws`) or caught. Subclasses of `Exception` excluding `RuntimeException`.
* **Unchecked exceptions**: Subclasses of `RuntimeException` or `Error`. Not required to be declared or caught.

### 6.2. `try` / `catch` / `finally`

```java
public class ExceptionDemo {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[5]); // ArrayIndexOutOfBoundsException (unchecked)
            FileReader fr = new FileReader("nonexistent.txt"); // FileNotFoundException (checked)
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Index error: " + e.getMessage());
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("I/O error: " + e.getMessage());
        } finally {
            System.out.println("Finally block executes regardless.");
        }
    }
}
```

### 6.3. `throw` and Custom Exceptions

```java
// Custom exception (checked)
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

public class Account {
    private double balance;

    public Account(double initialBalance) {
        this.balance = initialBalance;
    }

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(
                "Attempted to withdraw " + amount + ", but balance is " + balance);
        }
        balance -= amount;
    }

    public double getBalance() {
        return balance;
    }

    public static void main(String[] args) {
        Account acct = new Account(500.0);
        try {
            acct.withdraw(600); // throws InsufficientFundsException
        } catch (InsufficientFundsException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

### 6.4. `throws` Clause

* Methods that can throw checked exceptions must declare them with `throws`.

```java
import java.io.FileReader;
import java.io.IOException;

public class ThrowsDemo {
    // readFile must declare IOException or handle it internally
    public static void readFile(String filename) throws IOException {
        FileReader fr = new FileReader(filename);
        fr.close();
    }

    public static void main(String[] args) {
        try {
            readFile("nonexistent.txt");
        } catch (IOException e) {
            System.out.println("Caught IOException: " + e.getMessage());
        }
    }
}
```

---

## 7. Core APIs: Object, String, Wrapper Classes

### 7.1. `java.lang.Object`

* Every class implicitly extends `Object`. Key methods to override:

  * `toString()`
  * `equals(Object)`
  * `hashCode()`
  * `clone()` (if implementing `Cloneable`)
  * `finalize()` (deprecated in newer Java)

```java
public class Point {
    private int x, y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    // Override toString()
    @Override
    public String toString() {
        return "Point(" + x + ", " + y + ")";
    }

    // Override equals() and hashCode()
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Point)) return false;
        Point other = (Point) obj;
        return this.x == other.x && this.y == other.y;
    }

    @Override
    public int hashCode() {
        return 31 * x + y;
    }

    public static void main(String[] args) {
        Point p1 = new Point(2, 3);
        Point p2 = new Point(2, 3);
        System.out.println(p1);                     // "Point(2, 3)"
        System.out.println(p1.equals(p2));         // true
        System.out.println(p1.hashCode() == p2.hashCode()); // true
    }
}
```

### 7.2. `String` and `StringBuilder`

* **String** is immutable; operations create new objects.
* **StringBuilder** (or **StringBuffer**) is mutable and more efficient for repeated modifications.

```java
public class StringDemo {
    public static void main(String[] args) {
        // String (immutable)
        String s = "Hello";
        s += ", World!"; // new String object created
        System.out.println(s); // "Hello, World!"

        // StringBuilder (mutable)
        StringBuilder sb = new StringBuilder();
        sb.append("Core");
        sb.append(" ");
        sb.append("Java");
        System.out.println(sb.toString()); // "Core Java"
    }
}
```

### 7.3. Wrapper Classes & Autoboxing

* Primitive types have corresponding wrapper classes: `Integer`, `Long`, `Double`, `Boolean`, `Character`, `Byte`, `Short`, `Float`.
* **Autoboxing**: automatic conversion from primitive → wrapper.
* **Unboxing**: wrapper → primitive.

```java
public class WrapperDemo {
    public static void main(String[] args) {
        // Autoboxing
        Integer iObj = 100;    // primitive int → Integer
        Double dObj = 3.14;    // primitive double → Double

        // Unboxing
        int iPrim = iObj;      // Integer → int
        double dPrim = dObj;   // Double → double

        System.out.println("Integer object: " + iObj);
        System.out.println("Unboxed int: " + iPrim);
        System.out.println("Double object: " + dObj);
        System.out.println("Unboxed double: " + dPrim);
    }
}
```

### 7.4. Common `java.lang.Math` Methods

```java
public class MathDemo {
    public static void main(String[] args) {
        System.out.println("abs(-10): " + Math.abs(-10));      // 10
        System.out.println("max(5, 9): " + Math.max(5, 9));    // 9
        System.out.println("min(5, 9): " + Math.min(5, 9));    // 5
        System.out.println("pow(2, 3): " + Math.pow(2, 3));    // 8.0
        System.out.println("sqrt(16): " + Math.sqrt(16));      // 4.0
        System.out.println("random [0.0,1.0): " + Math.random());
    }
}
```

---

## 8. Core Collections Framework (java.util.*)

### 8.1. Collections Overview

* **List**: Ordered, allows duplicates (`ArrayList`, `LinkedList`, `Vector`).
* **Set**: Unordered, no duplicates (`HashSet`, `LinkedHashSet`, `TreeSet`).
* **Queue**: FIFO (`LinkedList`, `PriorityQueue`, `ArrayDeque`).
* **Map**: Key-value pairs, keys unique (`HashMap`, `LinkedHashMap`, `TreeMap`, `Hashtable`).

### 8.2. List (`ArrayList`, `LinkedList`)

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class ListDemo {
    public static void main(String[] args) {
        // ArrayList: dynamic array, fast random access
        List<String> arrayList = new ArrayList<>();
        arrayList.add("Apple");
        arrayList.add("Banana");
        arrayList.add("Cherry");
        arrayList.add(1, "Blueberry"); // insert at index 1
        System.out.println("ArrayList: " + arrayList);
        arrayList.remove("Banana");
        System.out.println("After removal: " + arrayList);

        // LinkedList: doubly-linked list, fast insert/delete at ends
        LinkedList<Integer> linkedList = new LinkedList<>();
        linkedList.add(10);
        linkedList.add(20);
        linkedList.addFirst(5);
        linkedList.addLast(25);
        System.out.println("LinkedList: " + linkedList);
        linkedList.removeFirst();
        linkedList.removeLast();
        System.out.println("After removal: " + linkedList);
    }
}
```

### 8.3. Set (`HashSet`, `LinkedHashSet`, `TreeSet`)

```java
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;

public class SetDemo {
    public static void main(String[] args) {
        // HashSet: unordered, no duplicates
        Set<String> hashSet = new HashSet<>();
        hashSet.add("Apple");
        hashSet.add("Banana");
        hashSet.add("Apple"); // duplicate, ignored
        System.out.println("HashSet: " + hashSet);

        // LinkedHashSet: insertion-order preserved
        Set<String> linkedHashSet = new LinkedHashSet<>();
        linkedHashSet.add("Apple");
        linkedHashSet.add("Banana");
        linkedHashSet.add("Apple");
        System.out.println("LinkedHashSet: " + linkedHashSet);

        // TreeSet: sorted order (natural ordering)
        Set<Integer> treeSet = new TreeSet<>();
        treeSet.add(30);
        treeSet.add(10);
        treeSet.add(20);
        System.out.println("TreeSet: " + treeSet); // [10, 20, 30]
    }
}
```

### 8.4. Map (`HashMap`, `LinkedHashMap`, `TreeMap`)

```java
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;

public class MapDemo {
    public static void main(String[] args) {
        // HashMap: no ordering, allows one null key
        Map<String, Integer> hashMap = new HashMap<>();
        hashMap.put("Alice", 30);
        hashMap.put("Bob", 25);
        hashMap.put("Charlie", 28);
        System.out.println("HashMap: " + hashMap);
        System.out.println("Alice's age: " + hashMap.get("Alice"));
        hashMap.remove("Bob");
        System.out.println("After removal: " + hashMap);

        // LinkedHashMap: insertion-order
        Map<String, Integer> linkedHashMap = new LinkedHashMap<>();
        linkedHashMap.put("Alice", 30);
        linkedHashMap.put("Bob", 25);
        linkedHashMap.put("Charlie", 28);
        System.out.println("LinkedHashMap: " + linkedHashMap);

        // TreeMap: sorted by key (natural order or custom Comparator)
        Map<String, Integer> treeMap = new TreeMap<>();
        treeMap.put("Alice", 30);
        treeMap.put("Bob", 25);
        treeMap.put("Charlie", 28);
        System.out.println("TreeMap: " + treeMap);
    }
}
```

### 8.5. Iterating Collections

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class IterateDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("One", "Two", "Three"));
        // 1. Traditional for loop with index
        for (int i = 0; i < list.size(); i++) {
            System.out.println("Index " + i + ": " + list.get(i));
        }
        // 2. Enhanced for-each loop
        for (String s : list) {
            System.out.println("Value: " + s);
        }
        // 3. Iterator
        var iter = list.iterator();
        while (iter.hasNext()) {
            System.out.println("Iterator value: " + iter.next());
        }

        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);
        // 1. Iterate keys
        for (String key : map.keySet()) {
            System.out.println("Key: " + key);
        }
        // 2. Iterate values
        for (Integer val : map.values()) {
            System.out.println("Value: " + val);
        }
        // 3. Iterate entries (key-value pairs)
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " → " + entry.getValue());
        }
    }
}
```

---

## 9. Generics

* Enable type-safe collections and methods without casting.
* Use angle brackets `<T>`, `<K, V>`, etc.

### 9.1. Generic Class

```java
public class Box<T> {
    private T value;

    public Box(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }

    public void set(T value) {
        this.value = value;
    }

    public static void main(String[] args) {
        Box<Integer> intBox = new Box<>(123);
        System.out.println("Integer box: " + intBox.get());

        Box<String> strBox = new Box<>("Core Java");
        System.out.println("String box: " + strBox.get());
    }
}
```

### 9.2. Generic Method

```java
public class GenericMethodDemo {
    // Generic method to swap two elements in an array
    public static <T> void swap(T[] arr, int i, int j) {
        T temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static void main(String[] args) {
        Integer[] nums = {1, 2, 3, 4};
        swap(nums, 1, 3);
        System.out.print("After swap: ");
        for (var n : nums) System.out.print(n + " "); // 1 4 3 2

        String[] words = {"apple", "banana", "cherry"};
        swap(words, 0, 2);
        System.out.print("\nAfter swap: ");
        for (var w : words) System.out.print(w + " "); // cherry banana apple
    }
}
```

---

## 10. Inner Classes and Nested Types

### 10.1. Static Nested Class

* Declared with `static` inside another class. Behaves like a top-level class but scoped within the outer class.

```java
public class Outer {
    private static String outerName = "OuterClass";

    public static class Nested {
        public void show() {
            System.out.println("Nested class can access: " + outerName);
        }
    }

    public static void main(String[] args) {
        Outer.Nested nestedObj = new Outer.Nested();
        nestedObj.show(); // "Nested class can access: OuterClass"
    }
}
```

### 10.2. Inner (Non-Static) Class

* Associated with an instance of the outer class. Can access instance members of the outer class.

```java
public class Outer {
    private String name = "OuterInstance";

    public class Inner {
        public void display() {
            System.out.println("Inner class accessing: " + name);
        }
    }

    public static void main(String[] args) {
        Outer outerObj = new Outer();
        Outer.Inner innerObj = outerObj.new Inner();
        innerObj.display(); // "Inner class accessing: OuterInstance"
    }
}
```

### 10.3. Local Inner Class

* Defined inside a method. Scope limited to that method.

```java
public class Outer {
    public void greet() {
        class Local {
            public void sayHello() {
                System.out.println("Hello from Local Inner Class");
            }
        }
        Local localObj = new Local();
        localObj.sayHello();
    }

    public static void main(String[] args) {
        new Outer().greet();
    }
}
```

### 10.4. Anonymous Inner Class

* An unnamed class declared and instantiated in a single expression, typically used to implement interfaces or extend classes for a one-off use.

```java
public class Button {
    interface OnClickListener {
        void onClick();
    }

    private OnClickListener listener;

    public void setOnClickListener(OnClickListener l) {
        listener = l;
    }

    public void click() {
        if (listener != null) {
            listener.onClick();
        }
    }

    public static void main(String[] args) {
        Button btn = new Button();
        btn.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick() {
                System.out.println("Button clicked!");
            }
        });
        btn.click(); // "Button clicked!"
    }
}
```

---

## 11. Enumerations (`enum`)

* Special data type to define a set of constants. Can have fields, methods, constructors.

```java
public enum Day {
    SUNDAY("Weekend"),
    MONDAY("Weekday"),
    TUESDAY("Weekday"),
    WEDNESDAY("Weekday"),
    THURSDAY("Weekday"),
    FRIDAY("Weekday"),
    SATURDAY("Weekend");

    private final String type;

    // Constructor (private by default)
    Day(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}

public class EnumDemo {
    public static void main(String[] args) {
        Day today = Day.FRIDAY;
        System.out.println(today);                // FRIDAY
        System.out.println("Type: " + today.getType()); // "Type: Weekday"

        // Iterate all constants
        for (Day d : Day.values()) {
            System.out.println(d + " → " + d.getType());
        }
    }
}
```

---

## 12. Annotations

* Metadata you can attach to classes, methods, fields, parameters, etc.
* Common built-in annotations:

  * `@Override` – indicates a method overrides a superclass method.
  * `@Deprecated` – marks an element as deprecated.
  * `@SuppressWarnings("unchecked")` – suppress specific compiler warnings.
  * `@SafeVarargs`, `@FunctionalInterface`, etc.

```java
public class AnnotationDemo {
    @Deprecated
    public static void oldMethod() {
        System.out.println("This method is deprecated.");
    }

    public static void main(String[] args) {
        @SuppressWarnings("deprecation")
        // calling deprecated method
        oldMethod(); // no compile warning because suppressed
    }
}
```

* You can define **custom annotations**:

  ```java
  import java.lang.annotation.Retention;
  import java.lang.annotation.RetentionPolicy;

  @Retention(RetentionPolicy.RUNTIME) // available at runtime via reflection
  public @interface Author {
      String name();
      String date();
  }

  @Author(name = "Alice", date = "2025-06-01")
  public class MyClass {
      // ...
  }
  ```

---

## 13. Java I/O

### 13.1. `java.io` (Streams)

#### 13.1.1. FileReader / BufferedReader (Reading Text)

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class FileReadDemo {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("input.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Read: " + line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

#### 13.1.2. FileWriter / BufferedWriter (Writing Text)

```java
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class FileWriteDemo {
    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
            writer.write("Line 1\n");
            writer.write("Line 2\n");
            writer.write("Line 3");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

#### 13.1.3. FileInputStream / FileOutputStream (Reading/Writing Bytes)

```java
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class ByteStreamDemo {
    public static void main(String[] args) {
        try (FileInputStream fis = new FileInputStream("image.png");
             FileOutputStream fos = new FileOutputStream("copy.png")) {
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                fos.write(buffer, 0, bytesRead);
            }
            System.out.println("Copy completed.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 13.2. `java.nio.file` (NIO.2, Java 7+)

#### 13.2.1. Writing/Reading All Lines

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class NIO2Demo {
    public static void main(String[] args) {
        Path filePath = Path.of("nio2.txt");

        // Write all lines in one shot
        List<String> linesToWrite = List.of("Line 1", "Line 2", "Line 3");
        try {
            Files.write(filePath, linesToWrite);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Read all lines in one shot
        try {
            List<String> linesRead = Files.readAllLines(filePath);
            linesRead.forEach(line -> System.out.println("Read: " + line));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

#### 13.2.2. Walking Directory Trees

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.FileVisitResult;

public class DirectoryWalkDemo {
    public static void main(String[] args) {
        Path startDir = Paths.get("some_directory");
        try {
            Files.walkFileTree(startDir, new SimpleFileVisitor<>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
                    System.out.println("Visited file: " + file);
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult visitFileFailed(Path file, IOException exc) {
                    System.err.println("Failed to visit file: " + file + " (" + exc + ")");
                    return FileVisitResult.CONTINUE;
                }
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

---

## 14. Concurrency and Multithreading

### 14.1. Creating Threads

#### 14.1.1. Extending `Thread`

```java
public class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println("MyThread: " + i);
            try {
                Thread.sleep(500); // 500 ms
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        MyThread t = new MyThread();
        t.start(); // runs run() in a new thread

        for (int i = 1; i <= 5; i++) {
            System.out.println("Main thread: " + i);
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

#### 14.1.2. Implementing `Runnable`

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println("MyRunnable: " + i);
            try {
                Thread.sleep(400);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        Thread t = new Thread(new MyRunnable());
        t.start();

        for (int i = 1; i <= 5; i++) {
            System.out.println("Main thread: " + i);
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### 14.2. Synchronization

#### 14.2.1. `synchronized` Methods / Blocks

```java
public class Counter {
    private int count = 0;

    // Synchronized method: only one thread at a time can execute this
    public synchronized void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }

    public static void main(String[] args) {
        Counter counter = new Counter();

        Runnable r = () -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        };

        Thread t1 = new Thread(r);
        Thread t2 = new Thread(r);
        t1.start();
        t2.start();

        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // If synchronized properly, count = 2000
        System.out.println("Final count: " + counter.getCount());
    }
}
```

#### 14.2.2. `volatile` Keyword

* Ensures visibility of changes to a variable across threads.
* Does **not** guarantee atomicity for compound operations (`count++`).

```java
public class VolatileDemo {
    private static volatile boolean flag = false;

    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            System.out.println("Thread 1 started, waiting for flag...");
            while (!flag) {
                // busy-wait until flag becomes true
            }
            System.out.println("Thread 1 detected flag = true");
        });

        Thread t2 = new Thread(() -> {
            System.out.println("Thread 2 sleeping for 2 seconds...");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            flag = true;
            System.out.println("Thread 2 set flag = true");
        });

        t1.start();
        t2.start();
    }
}
```

### 14.3. High-Level Concurrency (`java.util.concurrent`)

#### 14.3.1. ExecutorService

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorDemo {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        Runnable task = () -> {
            System.out.println("Task run by " + Thread.currentThread().getName());
        };

        for (int i = 0; i < 5; i++) {
            executor.execute(task);
        }

        executor.shutdown(); // no new tasks, but completes submitted tasks
    }
}
```

#### 14.3.2. `Callable`, `Future`

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class CallableFutureDemo {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newSingleThreadExecutor();

        Callable<Integer> callableTask = () -> {
            Thread.sleep(1000);
            return 42;
        };

        Future<Integer> future = executor.submit(callableTask);

        try {
            System.out.println("Result from callable: " + future.get()); // waits if necessary
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        executor.shutdown();
    }
}
```

---

## 15. JDBC (Java Database Connectivity)

* Core Java API to connect to relational databases via drivers (e.g., MySQL, PostgreSQL, SQLite).
* Steps: load driver, establish connection, create statement, execute query, process `ResultSet`, close resources.

> **Note:** Ensure the JDBC driver JAR (e.g., `mysql-connector-java.jar`) is on the classpath.

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class JDBCDemo {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/testdb";
        String user = "root";
        String password = "password";

        // 1. Load driver (optional for modern JDBC)
        // Class.forName("com.mysql.cj.jdbc.Driver");

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            // 2. Create a table (if not exists)
            String createTableSQL = """
                CREATE TABLE IF NOT EXISTS employees (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(50) NOT NULL,
                    salary DOUBLE
                )
                """;
            conn.createStatement().execute(createTableSQL);

            // 3. Insert a row using PreparedStatement
            String insertSQL = "INSERT INTO employees (name, salary) VALUES (?, ?)";
            try (PreparedStatement pstmt = conn.prepareStatement(insertSQL)) {
                pstmt.setString(1, "Alice");
                pstmt.setDouble(2, 75000.0);
                pstmt.executeUpdate();
            }

            // 4. Query data
            String selectSQL = "SELECT id, name, salary FROM employees";
            try (PreparedStatement pstmt = conn.prepareStatement(selectSQL);
                 ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    int id = rs.getInt("id");
                    String name = rs.getString("name");
                    double sal = rs.getDouble("salary");
                    System.out.println("ID: " + id + ", Name: " + name + ", Salary: " + sal);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

---

## 16. Java 8+ Features: Lambdas, Streams, Date/Time API

### 16.1. Lambda Expressions and Functional Interfaces

* A **functional interface** has exactly one abstract method (e.g., `Runnable`, `Comparator`, custom interfaces annotated `@FunctionalInterface`).
* Lambda syntax: `(parameters) -> expression` or `(parameters) -> { statements; }`.

```java
import java.util.Arrays;
import java.util.List;

public class LambdaDemo {
    public static void main(String[] args) {
        // Runnable with traditional anonymous class
        Runnable r1 = new Runnable() {
            @Override
            public void run() {
                System.out.println("Hello from anonymous Runnable!");
            }
        };
        r1.run();

        // Runnable with lambda (no parameters, single statement)
        Runnable r2 = () -> System.out.println("Hello from lambda Runnable!");
        r2.run();

        // Comparator for sorting
        List<String> fruits = Arrays.asList("Banana", "Apple", "Cherry", "Date");
        fruits.sort((a, b) -> a.compareTo(b)); // ascending lex order
        System.out.println("Sorted fruits: " + fruits);
    }
}
```

### 16.2. Stream API

* Supports functional-style operations on collections: `stream()`, `filter()`, `map()`, `collect()`, etc.

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

        // Filter names starting with 'C', convert to uppercase, collect as list
        List<String> result = names.stream()
                                   .filter(name -> name.startsWith("C"))
                                   .map(String::toUpperCase)
                                   .collect(Collectors.toList());

        System.out.println("Result: " + result); // [CHARLIE]
    }
}
```

### 16.3. java.time (Date/Time API, Java 8+)

```java
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class DateTimeDemo {
    public static void main(String[] args) {
        LocalDate date = LocalDate.now();          // e.g., 2025-06-01
        LocalTime time = LocalTime.now();          // e.g., 14:30:15.123
        LocalDateTime dateTime = LocalDateTime.now();

        System.out.println("Current date: " + date);
        System.out.println("Current time: " + time);
        System.out.println("Current dateTime: " + dateTime);

        // Formatting
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
        String formatted = dateTime.format(fmt);
        System.out.println("Formatted: " + formatted);

        // Parsing
        String dateStr = "15-08-2025 10:30";
        LocalDateTime parsedDT = LocalDateTime.parse(dateStr, fmt);
        System.out.println("Parsed LocalDateTime: " + parsedDT);
    }
}
```

---

## 17. Generics Deep Dive and Wildcards

### 17.1. Bounded Type Parameters

```java
public class NumberBox<T extends Number> {
    private T num;

    public NumberBox(T num) {
        this.num = num;
    }

    public double doubleValue() {
        return num.doubleValue();
    }

    public static void main(String[] args) {
        NumberBox<Integer> intBox = new NumberBox<>(10);
        NumberBox<Double> dblBox = new NumberBox<>(3.14);
        System.out.println(intBox.doubleValue()); // 10.0
        System.out.println(dblBox.doubleValue()); // 3.14
    }
}
```

### 17.2. Wildcards (`?`, `? extends T`, `? super T`)

```java
import java.util.Arrays;
import java.util.List;

public class WildcardDemo {
    // Accepts a list of any subtype of Number (Integer, Double, etc.)
    public static double sumNumbers(List<? extends Number> list) {
        double sum = 0.0;
        for (Number n : list) {
            sum += n.doubleValue();
        }
        return sum;
    }

    // Accepts a list of any supertype of Integer (Integer, Number, Object)
    public static void addInteger(List<? super Integer> list) {
        list.add(100);
        // Cannot retrieve as Integer directly (would require cast)
    }

    public static void main(String[] args) {
        List<Integer> intList = Arrays.asList(1, 2, 3);
        List<Double> dblList = Arrays.asList(1.5, 2.5, 3.5);

        System.out.println("Sum ints: " + sumNumbers(intList)); // 6.0
        System.out.println("Sum doubles: " + sumNumbers(dblList)); // 7.5

        // Wildcard super example
        List<Number> numList = Arrays.asList(1, 2, 3);
        // addInteger(numList); // UnsupportedOperationException (Arrays.asList returns fixed-size)
        // For demo, use ArrayList:
        var arrList = new java.util.ArrayList<Number>(numList);
        addInteger(arrList);
        System.out.println("After addInteger: " + arrList); // [1, 2, 3, 100]
    }
}
```

---

## 18. Advanced I/O: Serialization

### 18.1. Java Object Serialization

* Implement `Serializable` (marker interface) to allow object persistence or network transfer.
* Use `ObjectOutputStream` / `ObjectInputStream`.

```java
import java.io.*;

class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;

    // transient fields are not serialized
    private transient String password;

    public Student(String name, int age, String pwd) {
        this.name = name;
        this.age = age;
        this.password = pwd;
    }

    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + ", password='" + password + "'}";
    }
}

public class SerializationDemo {
    public static void main(String[] args) {
        Student st = new Student("Alice", 20, "secretPwd");

        // Serialize object to file
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("student.ser"))) {
            oos.writeObject(st);
            System.out.println("Serialization complete.");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize object from file
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("student.ser"))) {
            Student deserialized = (Student) ois.readObject();
            System.out.println("Deserialized object: " + deserialized);
            // password is null because it was transient
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

---

## 19. Java Memory Management & Garbage Collection

### 19.1. Stack vs. Heap

* **Stack**: stores primitive local variables and object references; LIFO.
* **Heap**: stores actual objects (instances). Garbage-collected when no references remain.

### 19.2. Garbage Collection (GC)

* JVM automatically reclaims memory of objects with no live references.
* You can suggest GC with `System.gc()`, but it’s only a hint.

```java
public class GCDemo {
    public static void main(String[] args) {
        GCDemo obj1 = new GCDemo();
        GCDemo obj2 = new GCDemo();
        obj1 = null; // eligible for GC
        obj2 = null; // eligible for GC

        // Suggest GC
        System.gc();
        System.out.println("GC suggested. Actual collection is nondeterministic.");
    }

    @Override
    protected void finalize() throws Throwable {
        // Deprecated in newer Java—might not be called reliably
        System.out.println("GCDemo finalize called.");
    }
}
```

---

## 20. Class Loading & Reflection

### 20.1. Class Loaders

* **Bootstrap ClassLoader**: loads JRE core classes.
* **Extension ClassLoader**: loads classes from `jre/lib/ext`.
* **Application (System) ClassLoader**: loads classes from the application’s classpath.

Generally, you don’t interact directly, but you can inspect a class’s loader:

```java
public class ClassLoaderDemo {
    public static void main(String[] args) {
        ClassLoader loader = ClassLoaderDemo.class.getClassLoader();
        System.out.println("ClassLoader: " + loader);

        // The bootstrap loader returns null
        ClassLoader parent = loader.getParent();
        System.out.println("Parent ClassLoader: " + parent);
    }
}
```

### 20.2. Reflection API (`java.lang.reflect`)

* Allows inspecting classes, methods, fields at runtime and invoking them dynamically.

```java
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class ReflectionDemo {
    private String secret = "hidden";

    public void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }

    public static void main(String[] args) {
        try {
            Class<?> cls = Class.forName("ReflectionDemo");
            // Create instance via default constructor
            Object instance = cls.getDeclaredConstructor().newInstance();

            // Invoke method greet(String)
            Method greetMethod = cls.getMethod("greet", String.class);
            greetMethod.invoke(instance, "Alice"); // "Hello, Alice!"

            // Access private field 'secret'
            Field secretField = cls.getDeclaredField("secret");
            secretField.setAccessible(true); // override private access
            String fieldValue = (String) secretField.get(instance);
            System.out.println("Secret: " + fieldValue);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

---

## 21. Classpath and Module System (Java 9+)

### 21.1. Classpath

* The classpath tells the JVM where to find compiled classes (`.class`) and JARs.
* Set via `-cp` or `CLASSPATH` environment variable:

  ```bash
  javac -cp lib/some.jar:. MyApp.java
  java -cp lib/some.jar:. MyApp
  ```

### 21.2. Java Platform Module System (JPMS, Java 9+)

* Allows grouping packages into **modules** and declaring dependencies via `module-info.java`.

```
project/
  src/
    com.example.app/
      module-info.java
      com/
        example/
          app/
            MainApp.java
          util/
            Utils.java
```

```java
// module-info.java in com.example.app
module com.example.app {
    requires com.example.util; // depends on another module
}

// module-info.java in com.example.util
module com.example.util {
    exports com.example.util; // makes package public to other modules
}
```

* **Compile**:

  ```bash
  javac -d mods/com.example.util src/com.example.util/module-info.java src/com.example.util/com/example/util/Utils.java
  javac --module-path mods -d mods/com.example.app src/com.example.app/module-info.java src/com.example.app/com/example/app/MainApp.java
  ```
* **Run**:

  ```bash
  java --module-path mods -m com.example.app/com.example.app.MainApp
  ```

---

## 22. Design Patterns (Core Examples)

### 22.1. Singleton Pattern

Ensure only one instance of a class exists.

```java
public class Singleton {
    // Private constructor prevents instantiation
    private Singleton() {}

    // Static inner helper class—initialized on first call to getInstance()
    private static class Holder {
        private static final Singleton INSTANCE = new Singleton();
    }

    public static Singleton getInstance() {
        return Holder.INSTANCE;
    }

    public void show() {
        System.out.println("Singleton instance: " + this);
    }

    public static void main(String[] args) {
        Singleton s1 = Singleton.getInstance();
        Singleton s2 = Singleton.getInstance();
        System.out.println(s1 == s2); // true
        s1.show();
    }
}
```

### 22.2. Factory Method Pattern

Define an interface for creating objects but let subclasses decide which class to instantiate.

```java
// Product interface
interface Animal {
    void speak();
}

// Concrete products
class Dog implements Animal {
    @Override
    public void speak() {
        System.out.println("Dog says: Woof!");
    }
}

class Cat implements Animal {
    @Override
    public void speak() {
        System.out.println("Cat says: Meow!");
    }
}

// Factory class
class AnimalFactory {
    public static Animal createAnimal(String type) {
        return switch (type.toLowerCase()) {
            case "dog" → new Dog();
            case "cat" → new Cat();
            default → throw new IllegalArgumentException("Unknown animal: " + type);
        };
    }
}

public class FactoryDemo {
    public static void main(String[] args) {
        Animal a1 = AnimalFactory.createAnimal("dog");
        a1.speak(); // "Dog says: Woof!"
        Animal a2 = AnimalFactory.createAnimal("cat");
        a2.speak(); // "Cat says: Meow!"
    }
}
```

---

## 23. Miscellaneous Core Concepts

### 23.1. `final` Keyword

* `final` variable: value cannot be changed once assigned.
* `final` method: cannot be overridden by subclasses.
* `final` class: cannot be subclassed.

```java
public final class FinalDemo {
    public final int MAX = 100;

    public final void display() {
        System.out.println("Display in final class.");
    }

    // Cannot subclass FinalDemo
}

// Attempting to extend FinalDemo will cause a compile error:
// class SubDemo extends FinalDemo { … } // ❌ Not allowed
```

### 23.2. `abstract` vs. `final`

* `abstract` class/method: cannot instantiate or method has no implementation.
* `final` class/method/variable: cannot be overridden/subclassed or reassigned.

### 23.3. Garbage Collection Tuning (JVM Flags)

* Common flags:

  * `-Xmx` to set max heap size (e.g., `-Xmx512m`).
  * `-Xms` to set initial heap size.
  * `-XX:+UseG1GC` to enable G1 garbage collector (Java 9+ default in many cases).
* Example:

  ```bash
  java -Xms256m -Xmx1024m -XX:+UseG1GC MyApp
  ```

### 23.4. Serialization UID

* Always define `private static final long serialVersionUID` in `Serializable` classes to maintain version consistency.

```java
public class Data implements Serializable {
    private static final long serialVersionUID = 1L;
    // fields, methods...
}
```

---

## 24. Putting It All Together: Sample “Employee Management” CLI

Below is a simplified console-based application that demonstrates many Core Java concepts: packages, classes, collections, I/O, exception handling, and JDBC (commented out if no DB is available). You can remove or mock the JDBC parts if you don’t have a database set up.

```java
// src/com/example/app/Employee.java
package com.example.app;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.concurrent.atomic.AtomicInteger;
import com.example.util.ValidationUtil;

// Employee model
public class Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    private static final AtomicInteger ID_GENERATOR = new AtomicInteger(1000);

    private final int id;
    private String name;
    private double salary;
    private LocalDate joinedDate;

    public Employee(String name, double salary) {
        this.id = ID_GENERATOR.getAndIncrement();
        this.name = name;
        this.salary = salary;
        this.joinedDate = LocalDate.now();
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (!ValidationUtil.isValidName(name)) {
            throw new IllegalArgumentException("Invalid name.");
        }
        this.name = name;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        if (!ValidationUtil.isPositive(salary)) {
            throw new IllegalArgumentException("Salary must be positive.");
        }
        this.salary = salary;
    }

    public LocalDate getJoinedDate() {
        return joinedDate;
    }

    @Override
    public String toString() {
        return "Employee { " +
               "id=" + id +
               ", name='" + name + '\'' +
               ", salary=" + salary +
               ", joinedDate=" + joinedDate +
               " }";
    }
}
```

```java
// src/com/example/util/ValidationUtil.java
package com.example.util;

public class ValidationUtil {
    public static boolean isValidName(String name) {
        return name != null && !name.trim().isEmpty();
    }

    public static boolean isPositive(double value) {
        return value > 0;
    }
}
```

```java
// src/com/example/app/EmployeeManager.java
package com.example.app;

import java.io.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class EmployeeManager {
    private static final Scanner SCANNER = new Scanner(System.in);
    // Thread-safe collection in case of concurrent access
    private final ConcurrentMap<Integer, Employee> employees = new ConcurrentHashMap<>();

    private static final String DATA_FILE = "employees.ser";

    public EmployeeManager() {
        loadData();
    }

    public void listEmployees() {
        if (employees.isEmpty()) {
            System.out.println("No employees found.");
            return;
        }
        employees.values().forEach(System.out::println);
    }

    public void addEmployee() {
        System.out.print("Enter name: ");
        String name = SCANNER.nextLine().trim();
        System.out.print("Enter salary: ");
        double salary;
        try {
            salary = Double.parseDouble(SCANNER.nextLine().trim());
        } catch (NumberFormatException e) {
            System.out.println("Invalid salary format.");
            return;
        }

        try {
            Employee emp = new Employee(name, salary);
            employees.put(emp.getId(), emp);
            saveData();
            System.out.println("Employee added: " + emp);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public void updateEmployee() {
        System.out.print("Enter employee ID to update: ");
        int id;
        try {
            id = Integer.parseInt(SCANNER.nextLine().trim());
        } catch (NumberFormatException e) {
            System.out.println("Invalid ID format.");
            return;
        }
        Employee emp = employees.get(id);
        if (emp == null) {
            System.out.println("Employee not found.");
            return;
        }

        System.out.print("Enter new name (leave blank to skip): ");
        String newName = SCANNER.nextLine().trim();
        if (!newName.isEmpty()) {
            try {
                emp.setName(newName);
            } catch (IllegalArgumentException e) {
                System.out.println("Invalid name: " + e.getMessage());
            }
        }

        System.out.print("Enter new salary (leave blank to skip): ");
        String salaryInput = SCANNER.nextLine().trim();
        if (!salaryInput.isEmpty()) {
            try {
                double newSalary = Double.parseDouble(salaryInput);
                emp.setSalary(newSalary);
            } catch (NumberFormatException e) {
                System.out.println("Invalid salary format.");
            } catch (IllegalArgumentException e) {
                System.out.println("Invalid salary: " + e.getMessage());
            }
        }

        saveData();
        System.out.println("Employee updated: " + emp);
    }

    public void deleteEmployee() {
        System.out.print("Enter employee ID to delete: ");
        int id;
        try {
            id = Integer.parseInt(SCANNER.nextLine().trim());
        } catch (NumberFormatException e) {
            System.out.println("Invalid ID format.");
            return;
        }
        Employee removed = employees.remove(id);
        if (removed != null) {
            saveData();
            System.out.println("Deleted: " + removed);
        } else {
            System.out.println("Employee not found.");
        }
    }

    private void saveData() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(DATA_FILE))) {
            oos.writeObject(new ArrayList<>(employees.values()));
        } catch (IOException e) {
            System.out.println("Error saving data: " + e.getMessage());
        }
    }

    @SuppressWarnings("unchecked")
    private void loadData() {
        File file = new File(DATA_FILE);
        if (!file.exists()) {
            return;
        }
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
            var list = (List<Employee>) ois.readObject();
            for (Employee e : list) {
                employees.put(e.getId(), e);
            }
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error loading data: " + e.getMessage());
        }
    }

    public void run() {
        String menu = """
            ===== Employee Manager =====
            1) List all employees
            2) Add new employee
            3) Update existing employee
            4) Delete employee
            5) Exit
            ==============================
            Choose (1-5):
            """;

        while (true) {
            System.out.print(menu);
            String choice = SCANNER.nextLine().trim();
            switch (choice) {
                case "1" -> listEmployees();
                case "2" -> addEmployee();
                case "3" -> updateEmployee();
                case "4" -> deleteEmployee();
                case "5" -> {
                    System.out.println("Exiting...");
                    return;
                }
                default -> System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    public static void main(String[] args) {
        new EmployeeManager().run();
    }
}
```

* **Features Demonstrated**:

  1. **Packages**: `com.example.app` and `com.example.util`.
  2. **Classes & Objects**: `Employee`, `EmployeeManager`, `ValidationUtil`.
  3. **Collections**: `ConcurrentHashMap<Integer, Employee>`.
  4. **I/O & Serialization**: `ObjectInputStream` / `ObjectOutputStream` for persistence.
  5. **Exception Handling**: Try-catch blocks for parsing and I/O.
  6. **Static and Final**: `ID_GENERATOR`, `serialVersionUID`.
  7. **Enums / Date API**: `LocalDate` (sets joined date).
  8. **AtomicInteger**: Thread-safe ID generator (though not really multi-threaded here).
  9. **Basic Validation**: via utility methods in `ValidationUtil`.

> If you wish to use JDBC instead of serialization, you could replace the `saveData()` and `loadData()` methods with database operations similar to the JDBC demo above.

---

## 25. Summary Checklist

Below is a checklist of Core Java topics covered. You can refer back to this list to ensure you’ve understood and practiced each area.

1. **Basics**

   * [ ] Java editions (SE, EE, ME)
   * [ ] “Hello, World!” structure
   * [ ] `javac` and `java` commands
2. **Data Types & Variables**

   * [ ] Primitives (`byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`)
   * [ ] Reference types (classes, arrays, interfaces)
   * [ ] Type conversion & casting (widening, narrowing)
   * [ ] Wrapper classes & autoboxing/unboxing
3. **Operators**

   * [ ] Arithmetic, relational, logical, assignment, ternary
   * [ ] `++`, `--`, and precedence rules
4. **Control Flow**

   * [ ] `if` / `else if` / `else`
   * [ ] `switch` statement & expression (Java 14+)
   * [ ] `for`, enhanced `for` (for-each), `while`, `do-while` loops
   * [ ] `break`, `continue`
5. **OOP Fundamentals**

   * [ ] Classes, objects, fields, methods, constructors
   * [ ] `static` vs. instance members
   * [ ] Encapsulation: private fields, getters/setters
   * [ ] Inheritance: `extends`, method overriding, `super`
   * [ ] Polymorphism: compile-time vs. runtime
6. **Abstract & Interfaces**

   * [ ] Abstract classes & methods
   * [ ] Interfaces, default & static methods (Java 8+)
   * [ ] Multiple interface implementation
7. **Packages & Access Control**

   * [ ] `package` declaration, directory structure
   * [ ] `import` statements
   * [ ] Access modifiers: `public`, `protected`, (default), `private`
8. **Exception Handling**

   * [ ] Checked vs. unchecked exceptions
   * [ ] `try` / `catch` / `finally`
   * [ ] `throw`, `throws` clause
   * [ ] Custom exception classes
9. **Core APIs**

   * [ ] `Object` methods: `toString()`, `equals()`, `hashCode()`, `clone()`
   * [ ] `String` operations vs. `StringBuilder` / `StringBuffer`
   * [ ] `Math` utility methods
   * [ ] Wrapper classes (`Integer`, `Double`, etc.)
10. **Collections Framework**

    * [ ] `List`: `ArrayList`, `LinkedList`
    * [ ] `Set`: `HashSet`, `LinkedHashSet`, `TreeSet`
    * [ ] `Map`: `HashMap`, `LinkedHashMap`, `TreeMap`
    * [ ] Iteration: for-each, `Iterator`, `Map.Entry`
11. **Generics**

    * [ ] Generic classes & methods (`<T>`, `<K, V>`)
    * [ ] Bounded type parameters (`<? extends T>`, `<? super T>`)
    * [ ] Wildcards and type safety
12. **Inner Classes & Enums**

    * [ ] Static nested classes
    * [ ] Inner (non-static) classes
    * [ ] Local inner classes
    * [ ] Anonymous inner classes
    * [ ] `enum` types with fields, methods, constructors
13. **Annotations**

    * [ ] Built-in: `@Override`, `@Deprecated`, `@SuppressWarnings`, `@FunctionalInterface`
    * [ ] Custom annotation with `@Retention` and usage
14. **I/O (java.io & java.nio.file)**

    * [ ] `FileReader` / `BufferedReader`, `FileWriter` / `BufferedWriter`
    * [ ] `FileInputStream` / `FileOutputStream`
    * [ ] `ObjectInputStream` / `ObjectOutputStream` (Serialization)
    * [ ] NIO.2 (`Files`, `Path`, `Files.walkFileTree`)
15. **Concurrency & Multithreading**

    * [ ] Creating threads: extending `Thread`, implementing `Runnable`
    * [ ] Synchronization: `synchronized` methods/blocks
    * [ ] Volatile variables (`volatile`)
    * [ ] High-level APIs: `ExecutorService`, `Callable` / `Future`
    * [ ] Atomic classes (`AtomicInteger`, etc.)
16. **JDBC (Database Connectivity)**

    * [ ] Loading drivers (optional), `DriverManager.getConnection()`
    * [ ] `Connection`, `PreparedStatement`, `ResultSet`
    * [ ] CRUD operations (CREATE, READ, UPDATE, DELETE)
    * [ ] Proper resource cleanup (`try-with-resources`)
17. **Java 8+ Enhancements**

    * [ ] Lambdas & functional interfaces (`Runnable`, `Comparator`, custom)
    * [ ] Stream API: `stream()`, `filter()`, `map()`, `collect()`
    * [ ] java.time API (`LocalDate`, `LocalTime`, `LocalDateTime`, `DateTimeFormatter`)
18. **Advanced Topics**

    * [ ] Reflection (`Class.forName()`, `Method.invoke()`, `Field.get()`)
    * [ ] Class loaders & module system (Java 9+)
    * [ ] Design patterns: Singleton, Factory, etc.
    * [ ] Serialization UID and versioning
    * [ ] Garbage collector tuning (`-Xms`, `-Xmx`, GC algorithms)

---

### Tips for Learning and Practice

1. **Hands-On Coding**

   * For each concept, type out the example code, compile, and run it. Modify it to see variations.
   * Build small “toy” projects: a CLI to-do list, a mini chat server, a file scanner, a student record management system, etc.

2. **Use an IDE**

   * IntelliJ IDEA, Eclipse, or VS Code with Java extensions can help auto-complete, highlight errors, and navigate code.

3. **Read the Official Documentation**

   * [Oracle’s Java SE Documentation](https://docs.oracle.com/javase/8/docs/) for core Java 8 (still widely used).
   * [Java 11+ Documentation](https://docs.oracle.com/en/java/) for newer language features.

4. **Explore Javadocs**

   * When you encounter a package (e.g., `java.util`), open its Javadoc to see classes, methods, and examples.

5. **Practice Data Structures & Algorithms**

   * Implement common structures (stack, queue, linked list, trees) and algorithms (sorting, searching) in Java to solidify OOP and generics understanding.

6. **Work with Real-World APIs**

   * Experiment with JSON processing (`Jackson`, `Gson`), HTTP clients (`java.net.http.HttpClient` in Java 11), and dependency management tools (`Maven`, `Gradle`).

7. **Version Control**

   * Use Git and host code on GitHub. Track changes, write clear commit messages, and collaborate on small projects.

8. **Unit Testing**

   * Learn JUnit (Java’s unit-testing framework). Write tests for your classes and use test-driven development (TDD) practices.

---

By systematically working through the sections above—typing and running examples, experimenting with variations, and building small projects—you’ll gain a solid grasp of Core Java and be well prepared for more advanced Java SE and enterprise development. Good luck on your Java journey!

---

[<- Java Quick](java-quick.md)