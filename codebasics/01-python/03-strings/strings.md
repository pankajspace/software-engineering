[<- Codebasics Quick](../../codebasics-quick.md)

## Strings
We can use single OR double quotes for strings.

```python
fname = "Jon"
lname = "Doe"

fullname = fname + " " + lname
print(fullname)
# Jon Doe

fullname = f"{fname} {lname}"
print(fullname)
# Jon Doe

print(fullname[0], fullname[1], fullname[2])
# J o n

# Slice operator
print(fullname[0:3])
# Jon
print(fullname[4:7])
# Doe
print(fullname[4:]) 
# Doe

# Print from last
print(fullname[-1])
# e

# We can't mutate the string
# fullname[0] = "D"
# Instead we can change the fname 
fname = "Don"
print(fname)
# Don

# Multiline strings
recipe = ''' 
Milk
Banana
'''
print(recipe)
# Milk
# Banana

print("Milk" in recipe) # True
print("Almond" in recipe) # False

# String functions
recipe.find("Banana") # prints start index of Banana in recipe

bill = "Patient was charged $100 for lab test"
print(bill)
# Patient was charged $100 for lab test

bill = bill.replace("$100", "$10")
print(bill)
# Patient was charged $10 for lab test

print(bill.upper())
# PATIENT WAS CHARGED $10 FOR LAB TEST

print(bill.lower())
# patient was charged $10 for lab test

print("100".isdigit())
# True

print("100w".isdigit())
# False

text = "My age is "
age = 50

# print(text + age)
# Error: can only concatenate str (not "int") to str

print(text + str(age))
# My age is 50

names = "Amit,Kunal,Pankaj,Sonali"
print(names)
# Amit,Kunal,Pankaj,Sonali

print(names.split(","))
# ['Amit', 'Kunal', 'Pankaj', 'Sonali']

print(names.split(",", maxsplit=2))
# ['Amit', 'Kunal', 'Pankaj,Sonali']

msg = "  Hi, How are you?  "
print(msg)
#   Hi, How are you?  

print(msg.strip())
# Hi, How are you?

filename = "test.pdf"
print(filename.endswith(".pdf"))
# True

# Prints all string functions
help(str)
```
