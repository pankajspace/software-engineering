[<- Codebasics Quick](../../codebasics-quick.md)

## Tuples

We looked at lists in previous lectures. Lists store values of similar concept. i.e. in below list every number is an expense.

```python
expenses=[1200,1400,1700]
```

But what if you want to store two different concepts in a sequential manner? For example say you want to store a two dimensional point representing values of X and Y cordinate? You can use list but more appropriate way to represent this would be a tuple.

```python
point=(5,6)
```

Accessing an element:

```python
point[0]
# Output: 5
```

If you try to assign a new value to a tuple index, Python will raise an error because tuples are immutable:

```python
point[1]=7
# TypeError: 'tuple' object does not support item assignment
```

Once you initialize tuples you can not change its values. i.e. Tuples are **immutable**. Lists can grow dynamically whereas tuples have a **fixed size** hence they are more **memory efficient**.

Tuples can have any number of values. It doesn't have to be only two values.

```python
point_3d = (5,8,10)
```

Tuples are useful when you want to return multiple values from a function.

```python
def find_pe_and_pb(price, eps, book_value):
    pe = price/eps
    pb = price/book_value
    return pe, pb

pe_ratio, pb_ratio = find_pe_and_pb(100, 2, 4)
# Output: (50.0, 25.0)
```

## Dictionary

Let's say you want to write a python program that can store phone numbers. Here you will have name of the person and a phone number. Say you have following people and their phone numbers:

* rachel => 8887771111
* monica => 9195675555
* joey => 3332229999

One way to store this information is using a list of tuples as shown below:

```python
contacts = [('rachel',8887771111), ('monica',9195675555), ('joey',3332229999)]
```

But here when you want to search for a phone number of a specific person you will have to run a for loop and search the records sequentially.

```python
for contact in contacts:
    if contact[0]=='joey':
        print(contact[1])
# Output: 3332229999
```

If list is very long say 10000 elements and element you are looking for is at the end, you would have now done 10000 iterations in the loop which is not efficient. In terms of memory complexity this is **O(n)**.

> **Refer to codebasics youtube channel for this video: [https://www.youtube.com/watch?v=IR_S8BC8KI0](https://www.youtube.com/watch?v=IR_S8BC8KI0) to get understanding on Big O notation for measuring complexity**

There is a better data structure called **dictionary** that allows you to search for an element in **Big O(1)** (or constant time complexity). Now we will define a python dictionary:

```python
d = {
    'rachel': 8887771111,
    'monica': 9195675555,
    'joey': 3332229999
}

d['joey']
# Output: 3332229999
```

Accessing an element in a dictionary by a key is very fast (i.e. O(1) or constant time complexity). Now what happens if you try to access an element by a key that doesn't exist in a dictionary?

```python
d['satya']
# KeyError: 'satya'
```

You can use **get** function which returns **None** if the element doesn't exist.

```python
d.get('satya')
```

**Change value of existing element**

```python
d['rachel']=1112568888
```

**Add new element**

```python
d['satya']=2228764555
```

**Delete an element**

```python
del d['satya']
```

**in operator**

```python
'rachel' in d
# Output: True
```

**Dictionary can store any data type as its value. Below the value in the dictionary is another dictionary**

```python
contact_dict = {
    'rachel' : { 'phone': 1234, 'address': '1 blue st' },
    'joey' : { 'phone': 999, 'address': '7 newton blvd' }
}

contact_dict['rachel']['address']
# Output: '1 blue st'
```

**Iterate through every element and print their values**

```python
for name in d:
    print(name, d[name])

# Or using .items()
for name, number in d.items():
    print(name, number)
```

**Get only keys or only values**

```python
d.keys()
# Output: dict_keys(['rachel', 'monica', 'joey'])

d.values()
# Output: dict_values([1112568888, 9195675555, 3332229999])
```

---

### Nested Dictionaries

```python
appl_revenues = {
    "USA": {
        "iPhone": 20,
        "iPad": 12,
        "MacBook": 8
    },
    "China": {
        "iPhone": 17,
        "iPad": 9,
        "MacBook": 6
    },
    "India": {
        "iPhone": 9,
        "iPad": 4,
        "MacBook": 2
    }
}

# Accessing nested data
appl_revenues["India"]["iPad"]
# Output: 4

# Iterating through nested dictionaries
for country, product_data in appl_revenues.items():
    for product, rev in product_data.items():
        print(f"{country} {product}: {rev} million $")
```

## Converting List of Tuples to Dictionary

```python
contacts = [('rachel',8887771111), ('monica',9195675555), ('joey',3332229999)]
contact_dict = dict(contacts)
print(contact_dict)
# Output: {'rachel': 8887771111, 'monica': 9195675555, 'joey': 3332229999}
```

## Summary

| Feature          | List                            | Tuple                                | Dictionary                                |
| ---------------- | ------------------------------- | ------------------------------------ | ----------------------------------------- |
| **Syntax**       | `[]` (Square brackets)          | `()` (Parentheses)                   | `{key: value}` (Curly braces)             |
| **Mutability**   | **Mutable** (Can change values) | **Immutable** (Cannot change values) | **Mutable** (Can add/delete/change pairs) |
| **Ordering**     | Ordered sequence                | Ordered sequence                     | Key-Value pairs                           |
| **Search Speed** | O(n) (Linear search)            | O(n) (Linear search)                 | O(1) (Constant time via keys)             |
| **Memory**       | Less efficient (Dynamic sizing) | More efficient (Fixed size)          | Less efficient (Overhead for hashing)     |
