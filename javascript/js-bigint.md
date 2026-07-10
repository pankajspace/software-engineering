[<- JavaScript](js-quick.md)

# BigInt in JavaScript — The Practical Guide

## 1) What is `BigInt` and when to use it?

* **Arbitrary-precision integers**: Handles integers larger than `Number.MAX_SAFE_INTEGER` (`2^53 - 1`) without precision loss.
* **Use BigInt when** you need exact integer math for very large values (IDs, cryptography, counters, factorials, precise monetary integer cents if values can exceed 2^53-1, bitmasks beyond 32 bits).
* **Not for** non-integers or APIs expecting regular `Number`s (e.g., `Date`, `setTimeout`, `Math.*`).

```js
const safeMax = Number.MAX_SAFE_INTEGER;
const tooBig = safeMax + 1;                     // 9007199254740992 (imprecise territory)
console.log(tooBig === safeMax + 2);            // true, oops
const okBig = BigInt(safeMax) + 1n;             // 9007199254740992n (exact)
console.log(okBig === BigInt(safeMax) + 2n);    // false, as expected
```

## 2) Creating BigInts

```js
const ten = 10n;              // BigInt literal (suffix n)
console.log(typeof ten, ten); // "bigint" 10n
console.log(typeof BigInt(123), BigInt(123)); // "bigint" 123n
console.log(typeof BigInt(-456), BigInt(-456)); // "bigint" -456n
console.log(BigInt("9007199254740993")); // 9007199254740993n (string)
console.log(BigInt(1.25)); // RangeError: The number 1.25 cannot be converted to a BigInt because it is not an integer
```

## 3) Core Rules & Operators & Behaviors

### 1. **No mixing types in arithmetic.**

```js
1n + 1      // ❌ TypeError
1n + 1n     // ✅ 2n

// If you must mix, convert explicitly:
1n + BigInt(1)              // ✅
Number(1n) + 1              // ✅ (but may lose precision!)
```

### 2. **Division truncates toward zero.**

```js
console.log(5n / 2n);   // 2n
console.log(-5n / 2n);  // -2n
```

### 3. **Modulo keeps the dividend’s sign** (same as Number).

```js
console.log(7n % 3n);   // 1n
console.log(-7n % 3n);  // -1n
```

### 4. **Exponentiation** uses integer exponents only.

```js
console.log(2n ** 10n); // 1024n
console.log(2n ** -2n); // RangeError: undefined must be positive
console.log(2n ** 0.5); // TypeError: Cannot mix BigInt and other types, use explicit conversions
console.log(2n ** 2); // TypeError: Cannot mix BigInt and other types, use explicit conversions
```

### 5. **Comparisons**:

```js
console.log(1n < 2); // true (numeric compare)
console.log(1n > 2); // false
console.log(1n == 1); // true
console.log(1n === 1); // false (different types)
```

### 6. **Bitwise operators** work on BigInt (except unsigned right shift `>>>`).

```js
console.log(1n << 65n); // 36893488147419103232n
console.log(5n & 3n);  // 1n
console.log(5n >>> 1n); // ❌ not allowed // TypeError: BigInts have no unsigned right shift, use >> instead
```

### 7. **No negative zero** with BigInt. `-0n` is just `0n`.

### 8. `Math.*` doesn’t accept BigInt

**Problem:** `Math.max(1n, 2n)` → TypeError, `Math.floor(10n/3n)` → TypeError

**Fixes:**
* Write BigInt-aware helpers.

```js
const maxBigInt = (a, b) => a > b ? a : b;
console.log(maxBigInt(10n, 20n)); // 20n

const floorBigInt = (a, b) => a / b;  // BigInts are already integers
console.log(floorBigInt(10n, 3n)); // 3n

const ceilBigInt = (a, b) => (a % b === 0n) ? (a / b) : (a / b + 1n);
console.log(ceilBigInt(10n, 3n)); // 4n
```

### 9. Sorting arrays that may contain BigInts

**Problem:** Default sort converts to strings.
**Fix:** Use a comparator.

```js
const arr = [10n, 2n, 33n];
arr.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));  // numeric BigInt sort
```

### 10. Mixing BigInt and Number accidentally

**Tip:** Centralize conversions to avoid surprises.

```js
const toBigInt = x => (typeof x === "bigint" ? x : BigInt(x));
const add = (a, b) => toBigInt(a) + toBigInt(b);
```

---
