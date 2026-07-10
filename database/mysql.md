[<- Database](database-quick.md)

# Basics of SQL

## DDL - Data Definition Language

CREATE, ALTER, DROP, TRUNCATE, COMMENT, RENAME

## DML - Data Manipulation Language

SELECT, INSERT, UPDATE, DELETE

## DCL - Data Control Language

GRANT, REVOKE

## DQL - Data Query Language

SELECT, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT

## TCL - Transaction Control Language

COMMIT, ROLLBACK, SAVEPOINT


# MYSQL Database

## 1. Show Databases
```sql
SHOW DATABASES;
```

## 2. Create a Database
```sql
CREATE DATABASE record_company;

CREATE DATABASE test;
```

## 3. Use the Database
```sql
USE record_company;
```

## 4. Delete a Database
```sql
DROP DATABASE test;
```

## 5. Create a Table
```sql
CREATE TABLE test (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
);
```

## 6. delete a Table
```sql
DROP TABLE test;
```

## 7. Create a Bands Table
```sql
CREATE TABLE bands (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
);
```

## 8. Create an Albums Table
```sql
CREATE TABLE albums (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  release_year INT,
  band_id INT,
  FOREIGN KEY (band_id) REFERENCES bands(id)
);
```

## 9. Show Tables
```sql
SHOW TABLES;
```

## 10. Update a Table Column
```sql
ALTER TABLE bands ADD name VARCHAR(255) NOT NULL;
ALTER TABLE bands MODIFY name VARCHAR(255) NOT NULL;
```

## 11. Insert Data into a Table
```sql
INSERT INTO bands (name) VALUES ('Iron Maiden');
INSERT INTO bands (name) VALUES ('Deuce'), ('Avenged'), ('Ankor');
```

## 12. Select Data from a Table
```sql
SELECT * FROM bands;

-- LIMIT 2 will only return the first 2 rows of the table
SELECT * FROM bands LIMIT 2; 

--- SELECT specific columns
SELECT name FROM bands;

--- SELECT specific columns with alias
SELECT name AS 'Band Name' FROM bands;
```

## 13. Select Data in a Table with a WHERE Clause
```sql
--- SELECT specific columns with alias and using WHERE clause to filter the results based on a condition 
SELECT name AS 'Band Name' FROM bands WHERE id = 1;

--- SELECT specific columns with alias and using WHERE clause to filter the results based on a condition using IN
SELECT name AS 'Band Name' FROM bands WHERE id IN (1, 2);

--- SELECT specific columns with alias and using WHERE clause to filter the results based on a condition using LIKE
SELECT name AS 'Band Name' FROM bands WHERE name LIKE '%A%';
```

## 14. Select Data in a Table with a WHERE Clause and ORDER BY
```sql
--- SELECT specific columns with alias and using WHERE clause to filter the results based on a condition using ORDER BY
SELECT name AS 'Band Name' FROM bands WHERE id IN (1, 2) ORDER BY name;

--- SELECT specific columns with alias and using WHERE clause to filter the results based on a condition using ORDER BY DESC
SELECT name AS 'Band Name' FROM bands WHERE id IN (1, 2) ORDER BY name DESC;
```

## 15. Select Data in a Table with a WHERE Clause and LIMIT
```sql
--- SELECT specific columns with alias and using WHERE clause to filter the results based on a condition using LIMIT
SELECT name AS 'Band Name' FROM bands WHERE id IN (1, 2) LIMIT 1;
```

## 16. Insert Data into a Table with Multiple Columns
```sql
INSERT INTO albums (name, release_year, band_id) 
VALUES ('The Number of the Beast', 1985, 1), 
       ('Powerslave', 1984, 1), 
       ('Nightmare', 2018, 2),
       ('Nightmare', 2010, 3),
       ('Test', NULL, 4);

SELECT * FROM albums;       
```

## 17. Select Data to get unique values
```sql
--- SELECT DISTINCT to get unique values from a column  
SELECT DISTINCT name FROM albums;
```

## 18. Select Data to get unique values with COUNT
```sql
--- SELECT DISTINCT to get unique values from a column with COUNT to get the number of occurrences of each unique value 
SELECT name, COUNT(*) FROM albums GROUP BY name;
```

## 19. Update Data in a Table
```sql
--- UPDATE to change the value of a column in a table based on a condition 
UPDATE albums SET release_year = 1982 WHERE id = 1;
```

## 20. Select Data in a Table with a WHERE Clause and AND
```sql
--- SELECT specific columns with alias and using WHERE clause to filter the results based on a condition using AND
SELECT name AS 'Album Name' FROM albums WHERE name LIKE '%er%' AND id = 1;
```

## 21. Select Data in a Table with a WHERE Clause and BETWEEN
```sql
--- SELECT specific columns with alias and using WHERE clause to filter the results based on a condition using BETWEEN
SELECT name AS 'Album Name', release_year AS 'Release Year' FROM albums WHERE release_year BETWEEN 1980 AND 1990;
```

## 22. Select Data in a Table with a WHERE Clause and NULL
```sql
--- SELECT specific columns with alias and using WHERE clause to filter the results based on a condition using NULL
SELECT name AS 'Album Name' FROM albums WHERE release_year IS NULL;
```

## 23. Delete a NULL Data from a Table with a WHERE Clause 
```sql
-- first check the data for NULL
SELECT id FROM albums WHERE release_year IS NULL;

--- DELETE to remove rows from a table based on a condition 
DELETE FROM albums WHERE id = 5;
```

## 24. Join Two Tables : INNER JOIN
INNER JOIN is used to combine rows from two or more tables based on a related column between them. It returns rows when there is at least one match in both tables. 

```sql
--- Select all bands with their albums
SELECT b.name AS 'Band Name', a.name AS 'Album Name'
FROM bands AS b
JOIN albums AS a ON b.id = a.band_id;
```

## 25. Join Two Tables : LEFT JOIN
LEFT JOIN is used to combine rows from two or more tables based on a related column between them. It returns all rows from the left table and the matched rows from the right table. The result is NULL from the right side if there is no match.

```sql
--- Select all bands with their albums including bands with no albums
SELECT b.name AS 'Band Name', a.name AS 'Album Name'
FROM bands AS b
LEFT JOIN albums AS a ON b.id = a.band_id;
```

## 26. Join Two Tables : RIGHT JOIN
RIGHT JOIN is used to combine rows from two or more tables based on a related column between them. It returns all rows from the right table and the matched rows from the left table. The result is NULL from the left side when there is no match.

```sql
--- Select all albums with their bands including albums with no bands
SELECT b.name AS 'Band Name', a.name AS 'Album Name'
FROM bands AS b
RIGHT JOIN albums AS a ON b.id = a.band_id;
```

## 27. Join Two Tables : FULL JOIN
FULL JOIN is used to combine rows from two or more tables based on a related column between them. It returns rows when there is a match in one of the tables. 

```sql
--- Select all bands with their albums including bands with no albums and albums with no bands
SELECT b.name AS 'Band Name', a.name AS 'Album Name'
FROM bands AS b
FULL JOIN albums AS a ON b.id = a.band_id;
```

## 28. Join Two Tables : CROSS JOIN
CROSS JOIN is used to combine rows from two or more tables based on a related column between them. It returns the Cartesian product of the two tables, i.e., all possible combinations of rows.

```sql
--- Select all possible combinations of bands with their albums
SELECT b.name AS 'Band Name', a.name AS 'Album Name'
FROM bands AS b
CROSS JOIN albums AS a;
```

## 29. Join Two Tables : SELF JOIN
SELF JOIN is used to join a table to itself as if the table were two tables, temporarily renaming at least one table in the SQL statement.

```sql
--- Employee Table
CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  manager_id INT,
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);

--- Insert Data into the Employee Table
INSERT INTO employees (name, manager_id) VALUES ('John', NULL), ('Alice', 1), ('Bob', 1);

--- Select Employee and Manager
SELECT e1.name AS Employee, e2.name AS Manager
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id;
```

## 30. Summary of SQL Joins
- INNER JOIN: Returns rows when there is a match in both tables.
- LEFT JOIN: Returns all rows from the left table, and matched rows from the right table (NULL if no match).
- RIGHT JOIN: Returns all rows from the right table, and matched rows from the left table (NULL if no match).
- FULL JOIN: Returns rows when there is a match in either left or right table, or both (NULLs for no match).
- CROSS JOIN: Returns the Cartesian product of both tables.
- SELF JOIN: A join of a table to itself.

## 31. Aggregate Functions
Aggregate functions perform a calculation on a set of values and return a single value. The most common aggregate functions are:
- COUNT(): Returns the number of rows.
- SUM(): Returns the sum of a numeric column.
- AVG(): Returns the average of a numeric column.
- MIN(): Returns the minimum value of a column.
- MAX(): Returns the maximum value of a column.

```sql
--- Count the number of albums
SELECT COUNT(*) AS 'Number of Albums' FROM albums;

--- Sum of release years
SELECT SUM(release_year) AS 'Total Release Years' FROM albums;

--- Average release year
SELECT AVG(release_year) AS 'Average Release Year' FROM albums;

--- Minimum release year
SELECT MIN(release_year) AS 'Minimum Release Year' FROM albums;

--- Maximum release year
SELECT MAX(release_year) AS 'Maximum Release Year' FROM albums;
```

## 32. Group By
GROUP BY is used to arrange identical data into groups. It is often used with aggregate functions to group the result-set by one or more columns.

```sql
--- Count the number of albums for each band 
SELECT b.name AS 'Band Name', COUNT(*) AS 'Number of Albums' 
FROM bands AS b
JOIN albums AS a ON b.id = a.band_id
GROUP BY b.name;
```

## 33. Having
HAVING is used to filter the results of aggregate functions applied to groups. It is often used with GROUP BY to filter the groups based on a specified condition.

```sql
--- Count the number of albums for each band and filter the results to show only bands with more than 1 album
SELECT b.name AS 'Band Name', COUNT(*) AS 'Number of Albums'
FROM bands AS b
JOIN albums AS a ON b.id = a.band_id
GROUP BY b.name
HAVING COUNT(*) > 1;
```

## 34. Order By with Aggregate Functions
ORDER BY is used to sort the result-set in ascending or descending order. It can be used with aggregate functions to sort the result based on the aggregate value.

```sql
--- Count the number of albums for each band and order the results by the number of albums in descending order
SELECT b.name AS 'Band Name', COUNT(*) AS 'Number of Albums'
FROM bands AS b
JOIN albums AS a ON b.id = a.band_id
GROUP BY b.name
ORDER BY COUNT(*) DESC;
```

## 35. Subqueries
A subquery is a query within another query. It can be used to return data that will be used in the main query as a condition or to retrieve data from multiple tables.

```sql
--- Select all bands with their albums where the band has more than 1 album
SELECT b.name AS 'Band Name', a.name AS 'Album Name'
FROM bands AS b
JOIN albums AS a ON b.id = a.band_id
WHERE b.id IN (SELECT band_id FROM albums GROUP BY band_id HAVING COUNT(*) > 1);
```

## 36. Union
UNION is used to combine the result-set of two or more SELECT statements. It removes duplicate rows between the various SELECT statements.

```sql
--- Select all bands and albums
SELECT name AS 'Band Name' FROM bands
UNION
SELECT name AS 'Album Name' FROM albums;
```

## 37. Intersect
INTERSECT is used to combine the result-set of two or more SELECT statements. It returns only the rows that appear in all the result sets.

```sql
--- Select bands that are also album names
SELECT name AS 'Band Name' FROM bands
INTERSECT
SELECT name AS 'Album Name' FROM albums;
```

## 38. Except
EXCEPT is used to combine the result-set of two SELECT statements. It returns only the rows that appear in the first result set but not in the second.

```sql
--- Select bands that are not album names
SELECT name AS 'Band Name' FROM bands
EXCEPT
SELECT name AS 'Album Name' FROM albums;
```

## 39. Indexes
Indexes are used to improve the performance of queries by allowing the database to quickly find the rows in a table. They are created on columns in a table and are used to speed up searches and queries.

```sql
--- Create an index on the name column of the bands table
CREATE INDEX band_name_index ON bands (name);
```

## 40. Transactions
Transactions are used to ensure the integrity of the database by grouping multiple SQL queries into a single unit of work. They can be committed to save the changes or rolled back to undo the changes.

```sql
--- Start a transaction
START TRANSACTION;

--- Insert data into the bands table
INSERT INTO bands (name) VALUES ('Led Zeppelin');

--- Insert data into the albums table
INSERT INTO albums (name, release_year, band_id) VALUES ('Led Zeppelin IV', 1971, 5);

--- Commit the transaction
COMMIT;
```

## 41. Views
Views are virtual tables created by a query. They can be used to simplify complex queries, restrict access to specific columns, or provide a summarized view of the data.

```sql
--- Create a view to show all bands with their albums
CREATE VIEW band_albums AS
SELECT b.name AS 'Band Name', a.name AS 'Album Name'
FROM bands AS b
JOIN albums AS a ON b.id = a.band_id;

--- Select data from the view
SELECT * FROM band_albums;
```

## 42. Stored Procedures
Stored procedures are a set of SQL statements that are stored in the database and can be called to perform a specific task. They can accept input parameters and return output parameters.

```sql
--- Create a stored procedure to get the number of albums for a band
DELIMITER //
CREATE PROCEDURE get_album_count(IN band_name VARCHAR(255), OUT album_count INT)
BEGIN
  SELECT COUNT(*) INTO album_count
  FROM bands AS b
  JOIN albums AS a ON b.id = a.band_id
  WHERE b.name = band_name;
END //
DELIMITER ;

--- Call the stored procedure
CALL get_album_count('Iron Maiden', @album_count);
SELECT @album_count;
```

## 43. Triggers
Triggers are database objects that are automatically executed in response to specific events on a table. They can be used to enforce business rules, audit changes, or maintain data integrity.

```sql
--- Create a trigger to update the release year of an album when the band name is updated
DELIMITER //
CREATE TRIGGER update_release_year
AFTER UPDATE ON bands
FOR EACH ROW
BEGIN
  UPDATE albums
  SET release_year = NEW.release_year
  WHERE band_id = NEW.id;
END //
DELIMITER ;
```

---

# Sql Questions and Solutions

## Return all the employees name and total number of projects allocated to that employee

### Table: employees

| Column Name | Data Type    | Constraints                 |
| ----------- | ------------ | --------------------------- |
| id          | INT          | AUTO_INCREMENT, PRIMARY KEY |
| name        | VARCHAR(255) | NOT NULL                    |

Data after insert:

| id  | name   |
| --- | ------ |
| 1   | Amit   |
| 2   | Pankaj |
| 3   | Sanjay |

### Table: projects

| Column Name | Data Type    | Constraints                 |
| ----------- | ------------ | --------------------------- |
| id          | INT          | AUTO_INCREMENT, PRIMARY KEY |
| name        | VARCHAR(255) |                             |

Data after insert:

| id  | name  |
| --- | ----- |
| 1   | proj1 |
| 2   | proj2 |
| 3   | proj3 |
| 4   | proj4 |
| 5   | proj5 |

### Table: allocations

| Column Name | Data Type | Constraints                 |
| ----------- | --------- | --------------------------- |
| id          | INT       | AUTO_INCREMENT, PRIMARY KEY |
| eid         | INT       | NOT NULL                    |
| pid         | INT       | NOT NULL                    |

Data after insert:

| id  | eid | pid |
| --- | --- | --- |
| 1   | 1   | 1   |
| 2   | 1   | 2   |
| 3   | 2   | 3   |
| 4   | 2   | 4   |
| 5   | 3   | 5   |

In this table:
- `eid` refers to the **employee ID** (likely from the `employees` table).
- `pid` refers to the **project ID** (likely from the `projects` table).

### Solution

```sql
create database company;

use company;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
insert into employees (name) values ('Amit'), ('Pankaj'), ('Sanjay');
select * from employees;

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);
insert into projects (name) values ('proj1'), ('proj2'), ('proj3'), ('proj4'), ('proj5');
select * from projects;

create table allocations (
	id int auto_increment primary key,
    eid int not null,
    pid int not null
);
insert into allocations (eid, pid) values (1, 1), (1, 2), (2, 3), (2, 4), (3, 5); 
select * from allocations;
```

Here is a sample SQL query that can be used to get the number of projects allocated to each employee:

```sql
SELECT e.id, e.name, COUNT(p.id) AS projects_count
FROM employees e
LEFT JOIN allocations a ON e.id = a.eid
LEFT JOIN projects p ON a.pid = p.id
GROUP BY e.id, e.name
ORDER BY projects_count DESC;
```

Here is more optimized query:

```sql
SELECT e.name, COUNT(a.pid) AS project_count
FROM employees e
LEFT JOIN allocations a ON e.id = a.eid
GROUP BY e.id;
```

### Explanation:

employees: Table that contains employee details like id and name.

allocations: A linking table that holds which employees are allocated to which projects. It has eid and pid.

projects: Table that contains project details like id and name.

This query uses a LEFT JOIN to ensure that employees with zero projects are also included in the results. The COUNT function is used to count how many projects each employee is allocated to.

---

# Most commonly asked sql queries in interviews

## **1. Basic Queries**
### **1.1 Retrieve all records from a table**
```sql
SELECT * FROM employees;
```

### **1.2 Retrieve unique values**
```sql
SELECT DISTINCT department FROM employees;
```

### **1.3 Count total rows**
```sql
SELECT COUNT(*) FROM employees;
```

### **1.4 Sort data**
```sql
SELECT * FROM employees ORDER BY salary DESC;
```

### **1.5 Filter records using WHERE clause**
```sql
SELECT * FROM employees WHERE department = 'IT';
```

## **2. Aggregate Functions**
### **2.1 Find the total salary**
```sql
SELECT SUM(salary) FROM employees;
```

### **2.2 Find the average salary**
```sql
SELECT AVG(salary) FROM employees;
```

### **2.3 Find the highest and lowest salary**
```sql
SELECT MAX(salary) AS highest_salary, MIN(salary) AS lowest_salary FROM employees;
```

### **2.4 Count employees per department**
```sql
SELECT department, COUNT(*) FROM employees GROUP BY department;
```

### **2.5 Filter groups using HAVING**
```sql
SELECT department, COUNT(*) 
FROM employees 
GROUP BY department 
HAVING COUNT(*) > 5;
```

## **3. Joins (Interview Favorite)**
### **3.1 Inner Join**
```sql
SELECT e.name, e.salary, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
```

### **3.2 Left Join**
```sql
SELECT e.name, e.salary, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
```

### **3.3 Right Join**
```sql
SELECT e.name, e.salary, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;
```

### **3.4 Full Outer Join**
```sql
SELECT e.name, e.salary, d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;
```

## **4. Subqueries (Nested Queries)**
### **4.1 Find employees with salary higher than department average**
```sql
SELECT name, salary 
FROM employees 
WHERE salary > (SELECT AVG(salary) FROM employees);
```

### **4.2 Find second highest salary**
```sql
SELECT MAX(salary) 
FROM employees 
WHERE salary < (SELECT MAX(salary) FROM employees);
```

### **4.3 Find employees who work in the ‘HR’ department using subquery**
```sql
SELECT name 
FROM employees 
WHERE department_id = (SELECT id FROM departments WHERE department_name = 'HR');
```

## **5. Window Functions**
### **5.1 Rank employees by salary**
```sql
SELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees;
```

### **5.2 Get running total of salaries**
```sql
SELECT name, salary, SUM(salary) OVER (ORDER BY salary) AS running_total
FROM employees;
```

### **5.3 Find employees with same salary rank**
```sql
SELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_rank
FROM employees;
```

---

## **6. Complex Queries**
### **6.1 Find duplicate records**
```sql
SELECT name, COUNT(*) 
FROM employees 
GROUP BY name 
HAVING COUNT(*) > 1;
```

### **6.2 Delete duplicate rows (keeping one)**
```sql
DELETE FROM employees 
WHERE id NOT IN (
    SELECT MIN(id) FROM employees GROUP BY name, salary
);
```

### **6.3 Find employees who joined in last 30 days**
```sql
SELECT * FROM employees WHERE join_date >= NOW() - INTERVAL 30 DAY;
```

### **6.4 Find Nth highest salary using LIMIT**
```sql
SELECT salary 
FROM employees 
ORDER BY salary DESC 
LIMIT 1 OFFSET 2;  -- third highest salary
```

---

## **7. Case Statements**
### **7.1 Categorize employees based on salary**
```sql
SELECT name, salary, 
    CASE 
        WHEN salary > 100000 THEN 'High'
        WHEN salary BETWEEN 50000 AND 100000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_category
FROM employees;
```

### **7.2 Swap male and female**
```sql
UPDATE user
SET gender = CASE
    WHEN gender = 'male' THEN 'female'
    WHEN gender = 'female' THEN 'male'
    ELSE gender
END;
```

---

## **8. Data Manipulation**
### **8.1 Insert a record**
```sql
INSERT INTO employees (name, salary, department_id) 
VALUES ('John Doe', 50000, 2);
```

### **8.2 Update salary**
```sql
UPDATE employees 
SET salary = salary * 1.1 
WHERE department_id = 2;
```

### **8.3 Delete records**
```sql
DELETE FROM employees WHERE salary < 30000;
```

---

## **9. Performance Optimization**
### **9.1 Use Index**
```sql
CREATE INDEX idx_employee_salary ON employees(salary);
```

### **9.2 Use EXPLAIN to check query performance**
```sql
EXPLAIN SELECT * FROM employees WHERE salary > 50000;
```

---

## **10. Advanced Topics**
### **10.1 Recursive Query (Common Table Expression - CTE)**
```sql
WITH RECURSIVE EmployeeHierarchy AS (
    SELECT id, name, manager_id
    FROM employees
    WHERE manager_id IS NULL
    UNION ALL
    SELECT e.id, e.name, e.manager_id
    FROM employees e
    INNER JOIN EmployeeHierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM EmployeeHierarchy;
```

### **10.2 Pivot Table (Dynamic Aggregation)**
```sql
SELECT department, 
       SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) AS male_count,
       SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) AS female_count
FROM employees
GROUP BY department;
```

### 🚀 **Interview Tip**
1. **Understand Joins & Subqueries deeply** – they are interview favorites.
2. **Practice writing queries on real datasets** – e.g., use SQL practice platforms.
3. **Explain query execution order** (FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT).
4. **Optimize queries** using indexes and performance analysis.

---

[<- Database](database-quick.md)
