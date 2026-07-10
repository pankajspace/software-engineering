[<- Codebasics Quick](../../codebasics-quick.md)

## Lists

```python
# creating a list
items = ["bread", "pasta", "fruits", "veggies"]
print(items)
# ['bread', 'pasta', 'fruits', 'veggies']

# Accessing items
print(items[0])
# bread

# Slicing
print(items[0:2])
# ['bread', 'pasta']

print(items[:2])
# ['bread', 'pasta']

print(items[2:])
# ['fruits', 'veggies']

# Adding items
items.append("milk")
print(items)
# ['bread', 'pasta', 'fruits', 'veggies', 'milk']

# Removing items
items.remove("pasta")
print(items)
# ['bread', 'fruits', 'veggies', 'milk']

# Insert items
items.insert(1, "pasta")
print(items)
# ['bread', 'pasta', 'fruits', 'veggies', 'milk']

# Lists are mutable
items[0] = "biscuits"
print(items)
# ['biscuits', 'pasta', 'fruits', 'veggies', 'milk']

items[3:] = ["almonds"]
print(items)
# ['biscuits', 'pasta', 'fruits', 'almonds']

# Length of list
print(len(items))
# 4

# Check if item exists
print("bread" in items)
# True

# Sort list ascending
items.sort()
print(items)
# ['biscuits', 'fruits', 'almonds', 'pasta']

# Sort list descending
items.sort(reverse=True)
print(items)
# ['pasta', 'almonds', 'fruits', 'biscuits']

# Copy list
items_copy = items.copy()
print(items_copy)
# ['pasta', 'almonds', 'fruits', 'biscuits']

bath_items = ["soap", "shampoo", "toothpaste"]
items.extend(bath_items)
print(items)
# ['pasta', 'almonds', 'fruits', 'biscuits', 'soap', 'shampoo', 'toothpaste']

# Add lists
both_items = items + bath_items
print(both_items)
# ['pasta', 'almonds', 'fruits', 'biscuits', 'soap', 'shampoo', 'toothpaste', 'soap', 'shampoo', 'toothpaste']

mixed_items = [1, "bread", True, 3.14]
print(mixed_items)
# [1, 'bread', True, 3.14]

# Clear list
items.clear()
print(items)
# []
```

## List Comprehensions
```python   
# List comprehensions are a concise way to create lists
# They are more readable and efficient than traditional for loops

# Syntax: [expression for item in iterable if condition]

# Example
numbers = [1, 2, 3, 4, 5]

# List comprehension
squared_numbers = [x**2 for x in numbers]
print(squared_numbers)

# List comprehension with if condition
odd_numbers = [x for x in numbers if x % 2 != 0]
print(odd_numbers)

# List comprehension with if-else condition
find_max = [x if x > 2 else 0 for x in numbers]
print(find_max)

# List comprehension with multiple conditions
find_max_three = [x if x > 2 and x < 4 else 0 for x in numbers]
print(find_max_three)

# List comprehension with nested loops
find_max_all = [x for x in numbers for y in numbers if x > y]
print(find_max_all)
```
