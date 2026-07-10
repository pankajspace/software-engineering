[<- Database](database-quick.md)

# Database Normalization

Database normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. The main goal of normalization is to separate data into distinct tables while ensuring that relationships between them are well-defined. The process is divided into several stages, called normal forms (NF).

## Why Normalize a Database?
- Eliminate redundancy: Avoid storing duplicate data.
- Ensure data integrity: Keep the data consistent and reduce anomalies when inserting, updating, or deleting records.
- Simplify queries: Structured data reduces complexity in querying.
- Save storage space: Reduce unnecessary data duplication.

## Types of Anomalies in Unnormalized Databases
1. Update Anomaly: When updating information in one place, it may not be reflected elsewhere, leading to inconsistent data.
2. Insert Anomaly: Occurs when you can't add data to the database due to the absence of other data.
3. Delete Anomaly: Deleting data unintentionally causes loss of other vital data.

## Normal Forms
Normalization is typically divided into different levels of normal forms (NF), each with specific rules for organizing data.

### 1. First Normal Form (1NF)
A table is in the first normal form (1NF) if:
- All columns contain atomic (indivisible) values.
- Each record (row) is unique.

#### Steps to Achieve 1NF:
- Remove repeating groups.
- Ensure that each field contains only one value.

#### Example:
Consider the following unnormalized table:

| OrderID | CustomerName | Product   |
| ------- | ------------ | --------- |
| 1       | Alice        | Pen, Book |
| 2       | Bob          | Notebook  |

In 1NF, it would be broken down as:

| OrderID | CustomerName | Product  |
| ------- | ------------ | -------- |
| 1       | Alice        | Pen      |
| 1       | Alice        | Book     |
| 2       | Bob          | Notebook |

### 2. Second Normal Form (2NF)
A table is in the second normal form (2NF) if:
- It is in 1NF.
- All non-key attributes are fully dependent on the primary key (i.e., no partial dependencies).

#### Steps to Achieve 2NF:
- Identify the primary key (usually a composite key in the case of many-to-many relationships).
- Move partial dependencies to separate tables.

#### Example:
Consider the following table (already in 1NF):

| OrderID | ProductID | CustomerName | Product  |
| ------- | --------- | ------------ | -------- |
| 1       | P1        | Alice        | Pen      |
| 1       | P2        | Alice        | Book     |
| 2       | P3        | Bob          | Notebook |

Here, `CustomerName` depends only on `OrderID`, not on `ProductID`. To normalize it to 2NF, we split it into two tables:

Customers Table:

| OrderID | CustomerName |
| ------- | ------------ |
| 1       | Alice        |
| 2       | Bob          |

Orders Table:

| OrderID | ProductID | Product  |
| ------- | --------- | -------- |
| 1       | P1        | Pen      |
| 1       | P2        | Book     |
| 2       | P3        | Notebook |

### 3. Third Normal Form (3NF)
A table is in the third normal form (3NF) if:
- It is in 2NF.
- There are no transitive dependencies (i.e., non-key columns should not depend on other non-key columns).

#### Steps to Achieve 3NF:
- Identify transitive dependencies.
- Move these dependencies to separate tables.

#### Example:
Consider the following table (already in 2NF):

| OrderID | CustomerID | CustomerName | Product  |
| ------- | ---------- | ------------ | -------- |
| 1       | C1         | Alice        | Pen      |
| 1       | C1         | Alice        | Book     |
| 2       | C2         | Bob          | Notebook |

Here, `CustomerName` depends on `CustomerID`, which is not part of the primary key. To normalize it to 3NF, we split it into two tables:

Customers Table:

| CustomerID | CustomerName |
| ---------- | ------------ |
| C1         | Alice        |
| C2         | Bob          |

Orders Table:

| OrderID | CustomerID | Product  |
| ------- | ---------- | -------- |
| 1       | C1         | Pen      |
| 1       | C1         | Book     |
| 2       | C2         | Notebook |

### 4. Boyce-Codd Normal Form (BCNF)
A table is in Boyce-Codd Normal Form (BCNF) if:
- It is in 3NF.
- Every determinant is a candidate key (i.e., there are no anomalies that 3NF doesn't cover).

### 5. Fourth Normal Form (4NF)
A table is in the fourth normal form (4NF) if:
- It is in BCNF.
- There are no multi-valued dependencies (i.e., a column cannot have multiple independent values related to the primary key).

### 6. Fifth Normal Form (5NF)
A table is in fifth normal form (5NF) if:
- It is in 4NF.
- It cannot be further decomposed into smaller tables without losing data or introducing redundancy.

## Denormalization
While normalization improves data consistency and reduces redundancy, it may cause performance overhead for complex queries. Denormalization is the process of reintroducing some redundancy by merging related tables to improve read performance.

---

Database normalization is a crucial aspect of database design to ensure that the data is structured efficiently. While normalization offers many benefits, it’s essential to balance it with the needs of the application and performance requirements.

---

[<- Database](database-quick.md)
