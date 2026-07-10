[<- Codebasics Quick](../../codebasics-quick.md)

## For While

### For loop
```python
# without for loop
expenses = [1200, 1300, 1500, 1700]
total_expense = expenses[0] + expenses[1] + expenses[2] + expenses[3]
print("Total expense:", total_expense)

# with for loop
total_expense = 0
for expense in expenses:
    total_expense += expense
print("Total expense:", total_expense)

# range function
total_expense = 0
for i in range(len(expenses)):
    expense = expenses[i]
    print(f'Month {i+1}, Expense: {expense}')
    total_expense += expense
print("Total expense:", total_expense)

# enumerate function
total_expense = 0
for i, expense in enumerate(expenses):
    print(f'Month {i+1}, Expense: {expense}')
    total_expense += expense
print("Total expense:", total_expense)
```

### break keyword
```python

monthly_sales = [42, 38, 33, 38, 40, 45]

thresold = 35

for sales_amount in monthly_sales:
    if sales_amount < thresold:
        print(f"Sales amount {sales_amount} is below the thresold")
        break
    else:
        print(f"Sale amount {sales_amount} is above the thresold")
        
monthly_sales = [42, 38, 33, 38, 40, 45]
months = ["Jan", "Feb", "March", "April", "May", "June"]

for sales_amount, month in zip(monthly_sales, months):
    if sales_amount < thresold:
        print(f"Sales amount {sales_amount} is less than the thresold in {month}")
        break
    else:
        print(f"Sales amount {sales_amount} is greater than the thresold in {month}")
```

### continue keyword
```python

for i in range(1, 11):
    if i % 2 == 0:
        continue
    print(i)

```

### while loop
```python

n = 0

while n <= 10:
    print(n)
    n += 1
    
```
