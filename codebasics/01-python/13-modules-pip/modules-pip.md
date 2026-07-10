[<- Codebasics Quick](../../codebasics-quick.md)

## Modules in Python

### 1. Built-in Modules

The `math` module provides access to mathematical functions defined by the C standard.
```python
import math
```

To see all the functions and constants available in a module, you can use the `dir()` function.
```python
dir(math)
```

> **Output:**
> ['**doc**', '**loader**', '**name**', '**package**', '**spec**', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil', 'comb', 'copysign', 'cos', 'cosh', 'degrees', 'dist', 'e', 'erf', 'erfc', 'exp', 'expm1', 'fabs', 'factorial', 'floor', 'fmod', 'frexp', 'fsum', 'gamma', 'gcd', 'hypot', 'inf', 'isclose', 'isfinite', 'isinf', 'isnan', 'isqrt', 'lcm', 'ldexp', 'lgamma', 'log', 'log10', 'log1p', 'log2', 'modf', 'nan', 'nextafter', 'perm', 'pi', 'pow', 'prod', 'radians', 'remainder', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'tau', 'trunc', 'ulp']

#### Common Math Operations:

* **Square Root**: `math.sqrt(16)` returns `4.0`.
* **Power**: `math.pow(5, 3)` returns `125.0`.
* **Constants**: `math.pi` provides the value of pi ($3.141592653589793$).
* **Logarithms**: `math.log10(1000)` returns `3.0`.

#### Calendar Module:

The `calendar` module allows you to output calendars and provides additional useful functions related to the calendar.

```python
import calendar

# Generate a text calendar for a specific month
jan = calendar.month(2022, 1)
print(jan)
```

> **Output:**
> ```
>     January 2022
> Mo Tu We Th Fr Sa Su
>                 1  2
>  3  4  5  6  7  8  9
> 10 11 12 13 14 15 16
> 17 18 19 20 21 22 23
> 24 25 26 27 28 29 30
> 31
> ```

You can also check for leap years:
```python
calendar.isleap(2024) # Returns True
```

### 2. External Modules

External modules like `numpy` must be installed (usually via pip) before they can be imported. `numpy` is widely used for scientific computing and matrix operations.

```bash
pip install numpy
```

```python
import numpy as np

# Sales data for Quarter 1 (Matrix 1)
# Rows represent different products, columns represent different regions
q1 = np.array([
    [200, 220, 250],  # Product A
    [150, 180, 210],  # Product B
    [300, 330, 360]   # Product C
])

q2 = np.array([
    [209, 231, 259],  # Product A
    [155, 192, 222],  # Product B
    [310, 340, 375]   # Product C
])
```

#### Matrix Operations with Numpy:

* **Addition**: Combine revenue from both quarters.
```python
q1 + q2
```
*Result:* `array([[409, 451, 509], [305, 372, 432], [610, 670, 735]])`

* **Subtraction**: Calculate growth in units between quarters.
```python
q2 - q1
```
*Result:* `array([[ 9, 11,  9], [ 5, 12, 12], [10, 10, 15]])`
