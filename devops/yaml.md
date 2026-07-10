[<- README](../README.md) | [<- Devops](devops-quick.md)

# YAML

**YAML (YAML Ain't Markup Language)** is a human-readable data serialization format commonly used for configuration files, data exchange, and to write structured data in a way that is easy for both machines and humans to read.

YAML uses indentation (whitespace) to define structure and does not rely on symbols like `{}`, `[]`, or commas as you might find in JSON or XML. Instead, it focuses on simplicity and readability.

## Key Concepts in YAML

1. **Scalars**: These are simple values like strings, numbers, or booleans.
   
2. **Key-Value Pairs**: YAML represents data as key-value pairs.
   
3. **Indentation**: Indentation is used to show nesting, much like Python. YAML typically uses two spaces for indentation, though any number is valid as long as it is consistent.
   
4. **Lists**: YAML uses dashes `-` to define lists (arrays).

5. **Comments**: Comments in YAML start with `#`.

6. **Multiline Strings**: YAML supports multiline strings using special characters (`|` for literal blocks and `>` for folded blocks).

## YAML Syntax Breakdown

### Scalars
Scalars in YAML can be strings, integers, booleans, etc.

```yaml
name: "John Doe"   # String
age: 30            # Integer
is_admin: true     # Boolean
```

### Key-Value Pairs
Data in YAML is stored as key-value pairs.

```yaml
first_name: "Alice"
last_name: "Johnson"
age: 28
```

### Lists (Arrays)
Lists in YAML are indicated by a dash `-`.

```yaml
languages:
  - Python
  - JavaScript
  - C++
```

This YAML defines a key `languages` whose value is a list of programming languages.

### Nested Data
You can nest lists and dictionaries (key-value pairs) in YAML by using indentation.

```yaml
person:
  name: "Bob"
  age: 34
  address:
    street: "123 Main St"
    city: "Springfield"
    country: "USA"
```

Here, `address` itself is a dictionary (map) nested inside the `person` dictionary.

### Multiline Strings
There are two ways to handle multiline strings in YAML:

- **Literal block (`|`)**: Preserves newlines.

```yaml
description: |
  This is a detailed
  description of the item.
  The text will keep line breaks.
```

- **Folded block (`>`)**: Collapses newlines into spaces.

```yaml
summary: >
  This is a brief summary
  of the content.
  New lines will be replaced with spaces.
```

### Comments
You can add comments using `#`:

```yaml
# This is a comment
name: "Jane Doe"  # Inline comment
```

## More Advanced Features

### Anchors and Aliases
YAML allows you to reuse parts of your configuration by defining an anchor (`&`) and referring to it with an alias (`*`).

```yaml
defaults: &defaults
  version: 1.0
  enabled: true

server1:
  <<: *defaults
  name: "Server One"

server2:
  <<: *defaults
  name: "Server Two"
```

In this example, both `server1` and `server2` inherit the properties defined in `defaults`.

### Data Types
YAML supports several basic data types, including:

- **Strings**: Quoted (`"`, `'`) or unquoted (`example`)
- **Integers**: `123`, `-45`
- **Booleans**: `true`, `false`
- **Null**: Represented by `null`, `~`, or nothing

```yaml
string_example: "Hello, world"
int_example: 42
bool_example: true
null_example: null
```

## Full Example

```yaml
# Example of YAML structure
application:
  name: "My App"
  version: 2.3.1
  enabled: true

servers:
  - name: "Server A"
    ip: "192.168.1.1"
    roles:
      - app
      - database
  - name: "Server B"
    ip: "192.168.1.2"
    roles:
      - app

database:
  type: "PostgreSQL"
  host: "localhost"
  port: 5432
  users:
    admin: "admin123"
    guest: "guest123"
```

## Advantages of YAML
- **Readability**: YAML is easy for humans to read and write.
- **Whitespace-based structure**: Much like Python, it enforces indentation for structure, which improves clarity.
- **Flexibility**: YAML can represent complex data structures (nested lists and dictionaries).
- **Data Types**: It supports a variety of data types and can automatically infer types without explicit definitions.

## Use Cases
YAML is often used for:
- **Configuration files** (e.g., for Docker, Kubernetes, CI/CD tools)
- **Data exchange** between different systems
- **Serialization** in programming languages (such as Python's `PyYAML` library)

Let me know if you need further details or specific use cases!

---

[<- README](../README.md) | [<- Devops](devops-quick.md)
