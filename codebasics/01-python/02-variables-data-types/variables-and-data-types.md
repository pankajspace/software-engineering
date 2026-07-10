[<- Codebasics Quick](../../codebasics-quick.md)

## Variables
Variables are used to store data in a program. In Python, you can create a variable by simply assigning a value to a name using the equals sign (`=`).

Variable naming rules:
1. Must start with a letter (a-z, A-Z) or an underscore (_)
2. Can contain letters, digits (0-9), and underscores
3. Cannot be a reserved keyword in Python (e.g., `if`, `for`, `while`, etc.)
4. Case-sensitive (e.g., `age` and `Age` are different variables)
5. Follow conventions like `snake_case` for variable names

```python
# Creating variables
age = 25
name = "John"
height = 5.9
is_student = True

# Checking types of variables
print(type(age))        # Output: <class 'int'>
print(type(name))       # Output: <class 'str'>
print(type(height))     # Output: <class 'float'>
print(type(is_student)) # Output: <class 'bool'>

# Printing variable values
print(age, name, height, is_student)
print(f"{name} is {age} years old, his height is {height} feet, and student status is {is_student}.")
# John is 25 years old, his height is 5.9 feet, and student status is True.

# Changing variable values
age = 26
is_student = False
print(f"After a year, {name} is now {age} years old and student status is {is_student}.")
# After a year, John is now 26 years old and student status is False.

# Multiple assignments
x, y, z = 10, 20, 30
print(x, y, z)
# 10 20 30

# Comparison of variables
print(age > 20)        # Output: True
print(height < 6.0)    # Output: True
print(name == "John")  # Output: True

# id function to get memory address
print(id(name))
another_name = name
print(id(another_name))  # Same as id(name)
```

## Numbers
```python
# Scientific notation positive
sci = 1e3
sci

# Scientific notation negative
scineg = 1e-3
scineg
food = "2050.34"
rent = "1534.24"

# This is incorrect
total = food + rent
print(total)
# 2050.341534.24

#  This is correct
total = float(food) + float(rent)
print(total)
# 3584.58

# We can also round the total
round(total)
```

## Maths
```python
import math

print(math.sqrt(25))
# 5.0

print(math.floor(3.7))
# 3

print(math.ceil(3.7))
# 4

# List of all math module functions
# dir(math) 

# Convert decimal to binary
format(5, 'b')
```

## Operators
```python
a = 110
b = 20

# Prints division
print(a / b)
# 5.5

# Prints integer part of the division
print(a // b)
# 5

# Prints reminder
print(a % b)
# 10

# Prints decimal part
print((a % b) / b)
# 0.5

# Prints 2^3
print(2**3)
# 8
```

## Type Conversion
```python
# String
string1 = "1.5"

# Float conversion
flo = float(string1)
print(flo)
# 1.5

# Integer conversion
print(int(flo))
# 1

# String conversion
string2 = str(flo)
print(type(flo))
# <class 'str'>

# Boolean conversion
string3 = "True"
boolean = bool(string3)
print(type(boolean))
# <class 'bool'>
```