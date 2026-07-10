[<- System Design](sys-des-quick.md)

# SOLID Principles Using TypeScript

## SOLID Principles Overview:

1. **SRP**: A class should have only one reason to change, i.e., it should perform a single responsibility.
2. **OCP**: A class should be open for extension but closed for modification.
3. **LSP**: Subtypes must be substitutable for their base types without altering the correctness of the program.
4. **ISP**: A class should not be forced to implement interfaces it doesn't use.
5. **DIP**: High-level modules should not depend on low-level modules; both should depend on abstractions.

### 1. **Single Responsibility Principle (SRP)**  
**Definition**: A class should have only one reason to change, i.e., it should perform a single responsibility.

#### Bad Implementation
```typescript
class Invoice {
    generateInvoice(orderId: number): void {
        console.log(`Generating invoice for order ${orderId}`);
    }

    sendEmail(invoiceId: number): void {
        console.log(`Sending email for invoice ${invoiceId}`);
    }

    saveToDatabase(invoiceId: number): void {
        console.log(`Saving invoice ${invoiceId} to database`);
    }
}
```
Here, the `Invoice` class has multiple responsibilities: generating invoices, sending emails, and saving data to the database. If any of these functionalities changes, the class must be modified, violating SRP.

#### Fixed Implementation
```typescript
class InvoiceGenerator {
    generateInvoice(orderId: number): void {
        console.log(`Generating invoice for order ${orderId}`);
    }
}

class EmailService {
    sendEmail(invoiceId: number): void {
        console.log(`Sending email for invoice ${invoiceId}`);
    }
}

class InvoiceRepository {
    saveToDatabase(invoiceId: number): void {
        console.log(`Saving invoice ${invoiceId} to database`);
    }
}
```
Now, each class has a single responsibility, and changes in one responsibility won't affect the others.

---

### 2. **Open/Closed Principle (OCP)**  
**Definition**: A class should be open for extension but closed for modification.

#### Bad Implementation
```typescript
class Discount {
    calculate(price: number, type: string): number {
        if (type === "regular") {
            return price;
        } else if (type === "seasonal") {
            return price * 0.9;
        } else if (type === "holiday") {
            return price * 0.8;
        }
        throw new Error("Unsupported discount type");
    }
}
```
Adding new discount types requires modifying the `calculate` method, violating OCP.

#### Fixed Implementation
```typescript
interface DiscountStrategy {
    calculate(price: number): number;
}

class RegularDiscount implements DiscountStrategy {
    calculate(price: number): number {
        return price;
    }
}

class SeasonalDiscount implements DiscountStrategy {
    calculate(price: number): number {
        return price * 0.9;
    }
}

class HolidayDiscount implements DiscountStrategy {
    calculate(price: number): number {
        return price * 0.8;
    }
}

class Discount {
    private strategy: DiscountStrategy;

    constructor(strategy: DiscountStrategy) {
        this.strategy = strategy;
    }

    calculate(price: number): number {
        return this.strategy.calculate(price);
    }
}
```
Now, adding new discount types involves creating a new class that implements `DiscountStrategy`, without modifying existing code.

---

### 3. **Liskov Substitution Principle (LSP)**  
**Definition**: Subtypes must be substitutable for their base types without altering the correctness of the program.

#### Bad Implementation
```typescript
class Bird {
    fly(): void {
        console.log("Flying");
    }
}

class Penguin extends Bird {
    fly(): void {
        throw new Error("Penguins cannot fly");
    }
}
```
A `Penguin` is a `Bird`, but it violates LSP because it cannot properly substitute its parent class.

#### Fixed Implementation
```typescript
abstract class Bird {
    abstract move(): void;
}

class FlyingBird extends Bird {
    move(): void {
        console.log("Flying");
    }
}

class Penguin extends Bird {
    move(): void {
        console.log("Swimming");
    }
}
```
Now, the base class ensures that each subtype can implement its specific behavior without violating LSP.

---

### 4. **Interface Segregation Principle (ISP)**  
**Definition**: A class should not be forced to implement interfaces it doesn't use.

#### Bad Implementation
```typescript
interface Worker {
    work(): void;
    manage(): void;
}

class Developer implements Worker {
    work(): void {
        console.log("Writing code");
    }

    manage(): void {
        throw new Error("Developer cannot manage");
    }
}

class Manager implements Worker {
    work(): void {
        throw new Error("Manager does not work");
    }

    manage(): void {
        console.log("Managing team");
    }
}
```
Both `Developer` and `Manager` are forced to implement methods they do not use.

#### Fixed Implementation
```typescript
interface Workable {
    work(): void;
}

interface Manageable {
    manage(): void;
}

class Developer implements Workable {
    work(): void {
        console.log("Writing code");
    }
}

class Manager implements Manageable {
    manage(): void {
        console.log("Managing team");
    }
}
```
Now, each class implements only the interfaces relevant to its functionality.

---

### 5. **Dependency Inversion Principle (DIP)**  
**Definition**: High-level modules should not depend on low-level modules; both should depend on abstractions.

#### Bad Implementation
```typescript
class MySQLDatabase {
    connect(): void {
        console.log("Connecting to MySQL database");
    }
}

class Application {
    private database: MySQLDatabase;

    constructor() {
        this.database = new MySQLDatabase();
    }

    run(): void {
        this.database.connect();
    }
}
```
The `Application` class directly depends on the `MySQLDatabase` implementation, making it hard to switch to another database.

#### Fixed Implementation
```typescript
interface Database {
    connect(): void;
}

class MySQLDatabase implements Database {
    connect(): void {
        console.log("Connecting to MySQL database");
    }
}

class PostgreSQLDatabase implements Database {
    connect(): void {
        console.log("Connecting to PostgreSQL database");
    }
}

class Application {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    run(): void {
        this.database.connect();
    }
}

class DIPExample {
    main() {
        Database mysql = new MySQLDatabase();
        Application app = new Application(mysql);
        app.run(); // Outputs: Connecting to MySQL database

        Database postgres = new PostgreSQLDatabase();
        Application app2 = new Application(postgres);
        app2.run(); // Outputs: Connecting to PostgreSQL database
    }
}
```

Now, the `Application` depends on the abstraction `Database`, making it easy to switch to a different database implementation.

---

By applying the SOLID principles, code becomes more maintainable, extensible, and robust. Each principle addresses specific challenges in software design, ensuring long-term success.

---

[<- System Design](sys-des-quick.md)

