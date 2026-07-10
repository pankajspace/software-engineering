from functools import reduce

# Simple function
def find_total(expenses):
    '''
    This function takes expenses list as an input
    and return a total sum of that list
    :param expenses: list of input expenses
    :return: total expense
    '''
    total = 0
    for expense in expenses:
        total += expense
    return total

expenses_sergey = [30, 45, 70, 90]
total = find_total(expenses_sergey)
print("Sergey's total expense: ", total)

expenses_sundar = [40, 23, 10, 85]
total = find_total(expenses_sundar)
print("Sundar's total expense: ", total)

# -------------------------------------------------------------------

# Function arguments
def find_cylinder_volume(radius, height=10):
    print("radius:", radius)
    print("height:", height)
    volume = 3.14*(radius**2)*height
    print(volume)
    return volume

r = 5; h = 10
# positional arguments
print(find_cylinder_volume(r, h))
# keyword arguments
print(find_cylinder_volume(height=h, radius=r))
# default arguments
print(find_cylinder_volume(r))
# mixed arguments
print(find_cylinder_volume(r, height=h))

# -------------------------------------------------------------------

# Variable length arguments
def sum_all(*args):
    total = 0
    for num in args:
        total += num
    return total

total = sum_all(1,2,3,4,5)
print(f"Sum of all numbers: {total}")

# Variable length keyword arguments
def company_info(**kwargs):
    if 'ticker' in kwargs:
        print("Ticker: ", kwargs['ticker'])
    if 'ceo' in kwargs:
        print("CEO: ", kwargs['ceo'])
    if 'revenue' in kwargs:
        print("Revenue:", kwargs['revenue'])

    # We can also use for loop to iterate over the keyword arguments
    # for key in kwargs:
        # print(key, kwargs[key])

company_info(ticker='AAPL', ceo="Tim Cook", revenue="200 billion")

# Difference between *args and **kwargs
# *args is used to pass a variable number of positional arguments
# **kwargs is used to pass a variable number of keyword arguments

# pass keyword
# pass keyword is used to define an empty function
# It is used when we want to define a function but we don't want to implement it yet

def my_function():
    pass

# -------------------------------------------------------------------

# Lambda functions
# Lambda functions are small anonymous functions
# They are defined using the lambda keyword
# They can take any number of arguments but can only have one expression

# Syntax: lambda arguments: expression

# Example
add = lambda x, y: x + y
print(add(1, 2))

# Example with if-else
find_max = lambda x, y: x if x > y else y
print(find_max(1, 2))

# Example with multiple arguments
find_max_three = lambda x, y, z: x if x > y and x > z else y if y > x and y > z else z
print(find_max_three(1, 2, 3))

# Example with default arguments
find_max_with_default = lambda x, y, z=0: x if x > y and x > z else y if y > x and y > z else z
print(find_max_with_default(1, 2))

# Example with variable arguments
find_max_all = lambda *args: max(args)
print(find_max_all(1, 2, 3, 4, 5))

# Example with variable keyword arguments
find_max_all_kwargs = lambda **kwargs: max(kwargs.values())
print(find_max_all_kwargs(a=1, b=2, c=3, d=4, e=5))

# -------------------------------------------------------------------

# Map, Filter, Reduce
# Map function is used to apply a function to all the elements of an iterable
# Filter function is used to filter the elements of an iterable based on a condition
# Reduce function is used to reduce the elements of an iterable to a single value

# Syntax: map(function, iterable)
# Syntax: filter(function, iterable)
# Syntax: reduce(function, iterable)

# Example
numbers = [1, 2, 3, 4, 5]

# Map function
squared_numbers = map(lambda x: x**2, numbers)
print(list(squared_numbers))

# Filter function
odd_numbers = filter(lambda x: x % 2 != 0, numbers)
print(list(odd_numbers))

# Reduce function
sum_of_numbers = reduce(lambda x, y: x + y, numbers)
print(sum_of_numbers)

# -------------------------------------------------------------------   

# Generator functions
# Generator functions are used to create generators
# Generators are iterators that produce values on the fly
# They are more memory efficient than traditional functions

# Syntax: def function_name():
#             yield value

# Example
def generate_numbers():
    for i in range(5):
        yield i

# Generator function
generator = generate_numbers()

# Iterate over the generator
for number in generator:
    print(number)

# -------------------------------------------------------------------   

