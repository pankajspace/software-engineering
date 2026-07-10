[<- Codebasics Quick](../../codebasics-quick.md)

## If Else

### Find if number is even or odd
```python
n = input("Enter a number")
n = int(n)
if n % 2 == 0:
    print("Number is even")
else:
    print("Number is odd")
```

### Conditional operators for if condition
```python
print(3 == 3) # True
print(3 == 4) # False
print(10 > 9) # True
print(4 < 4) # False
print(4 == 4) # True
print(not 4 == 4) # False
print(4 <= 4) # True
```

### Find if number is more than 10 and also even
```python
n = 8
if n > 10 and n % 2 == 0:
    print("Yay")
else:
    print("Nope")
```

### Write code that takes dish name as input and tells you which cuisine it is
```python
mexican = ["taco","enchilada","burrito"]
italian = ["pasta","ravioli","pizza"]
indian = ["biryani","samosa","curry"]
dish = input("Enter a dish name")
if dish in mexican:
    print(f"{dish} is mexican")
elif dish in italian:
    print(f"{dish} is italian")
elif dish in indian:
    print(f"{dish} is indian")
else:
    print(f"not sure which cuisine is {dish}")
```

### Ternary operator
```python
n = 1
message = "Number is even" if n % 2 == 0 else "Number is odd"
print(message) # Number is odd
```