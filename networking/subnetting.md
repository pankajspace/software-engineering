[<-- Networking](networking-quick.md)

## Subnetting

### **Subnetting in Detail**

**Subnetting** is the process of dividing a large network into smaller, more manageable subnetworks (subnets). It improves efficiency, enhances security, and optimizes the use of available IP addresses.

---

### **Why Subnetting?**
1. **Efficient IP Allocation**: Prevents wastage of IP addresses by creating smaller networks tailored to specific needs.
2. **Improved Network Performance**: Reduces congestion by isolating traffic within subnets.
3. **Enhanced Security**: Limits broadcast traffic and isolates network segments.
4. **Simplified Management**: Makes large networks easier to manage.

---

### **Key Concepts in Subnetting**

1. **IP Address Structure**
   - An **IP address** has two parts:
     - **Network Portion**: Identifies the network.
     - **Host Portion**: Identifies a device within the network.

   Example: IP address `192.168.1.10` with subnet mask `255.255.255.0`:
   - **Network Portion**: `192.168.1`
   - **Host Portion**: `.10`

2. **Subnet Mask**
   - A **subnet mask** specifies how many bits of the IP address are used for the network portion.
   - In binary, `1`s represent the network portion, and `0`s represent the host portion.
   - Example:
     - Subnet mask: `255.255.255.0`
     - Binary: `11111111.11111111.11111111.00000000`

3. **CIDR Notation**
   - CIDR (Classless Inter-Domain Routing) represents subnet masks using a `/x` format, where `x` is the number of `1`s in the subnet mask.
   - Example: `255.255.255.0` = `/24` because it has 24 bits for the network portion.

4. **Number of Subnets and Hosts**
   - Number of subnets = \( 2^n \), where \( n \) is the number of bits borrowed for the subnet.
   - Number of hosts = \( 2^h - 2 \), where \( h \) is the number of host bits. (Subtract 2 for the network and broadcast addresses.)

---

### **Subnetting Example**

#### Example 1: Subnet a Class C Network
- **Original IP Address**: `192.168.1.0`
- **Default Subnet Mask**: `255.255.255.0` (`/24`)
- **Requirement**: Create 4 subnets.

**Steps**:
1. **Determine Bits to Borrow**:
   - \( 2^n \geq \text{Required Subnets} \)
   - \( 2^n = 4 \rightarrow n = 2 \) (Borrow 2 bits for subnetting).

2. **New Subnet Mask**:
   - Default: `/24` → Borrow 2 bits → New subnet mask = `/26`.
   - Binary: `11111111.11111111.11111111.11000000` → Decimal: `255.255.255.192`.

3. **Calculate Subnets**:
   - Subnet increment = \( 256 - \text{last octet of subnet mask} \).
   - Increment = \( 256 - 192 = 64 \).

   Subnets:
   ```
   192.168.1.0   - 192.168.1.63  (Subnet 1)
   192.168.1.64  - 192.168.1.127 (Subnet 2)
   192.168.1.128 - 192.168.1.191 (Subnet 3)
   192.168.1.192 - 192.168.1.255 (Subnet 4)
   ```

4. **Assignable IP Addresses**:
   - Each subnet has \( 2^h - 2 = 2^6 - 2 = 62 \) usable addresses.
   - Example for Subnet 1:
     - Network Address: `192.168.1.0`
     - Usable Range: `192.168.1.1` to `192.168.1.62`
     - Broadcast Address: `192.168.1.63`

---

#### Example 2: Subnet a Class B Network
- **Original IP Address**: `172.16.0.0`
- **Default Subnet Mask**: `255.255.0.0` (`/16`)
- **Requirement**: Create 8 subnets.

**Steps**:
1. **Determine Bits to Borrow**:
   - \( 2^n \geq \text{Required Subnets} \)
   - \( 2^n = 8 \rightarrow n = 3 \) (Borrow 3 bits).

2. **New Subnet Mask**:
   - Default: `/16` → Borrow 3 bits → New subnet mask = `/19`.
   - Binary: `11111111.11111111.11100000.00000000` → Decimal: `255.255.224.0`.

3. **Calculate Subnets**:
   - Increment = \( 256 - \text{value of the third octet in subnet mask} \).
   - Increment = \( 256 - 224 = 32 \).

   Subnets:
   ```
   172.16.0.0   - 172.16.31.255
   172.16.32.0  - 172.16.63.255
   172.16.64.0  - 172.16.95.255
   ...
   ```

4. **Assignable IP Addresses**:
   - Each subnet has \( 2^h - 2 \), where \( h = 13 \) (32 total host bits - 19 for the subnet).
   - \( 2^{13} - 2 = 8190 \) usable addresses per subnet.

---

### **Subnetting Formulas**
1. **Number of Subnets**:
   - \( 2^n \), where \( n \) = number of borrowed bits.
2. **Hosts per Subnet**:
   - \( 2^h - 2 \), where \( h \) = remaining host bits.
3. **Subnet Increment**:
   - \( 256 - \text{last octet value of the subnet mask} \).

---

### **Benefits of Subnetting**
1. **Reduces Broadcast Domains**: Isolates network segments to limit broadcast traffic.
2. **Enhances Security**: Prevents unauthorized access between subnets.
3. **Optimizes IP Utilization**: Efficiently allocates IP addresses.

---

### **Subnetting Diagram**
Example for `192.168.1.0/24` divided into 4 subnets (`/26`):
```
192.168.1.0/26   - 192.168.1.63   (Subnet 1)
192.168.1.64/26  - 192.168.1.127  (Subnet 2)
192.168.1.128/26 - 192.168.1.191  (Subnet 3)
192.168.1.192/26 - 192.168.1.255  (Subnet 4)
```

---

### **Practical Tools for Subnetting**
1. **Subnet Calculators**:
   - Online tools to automate subnet calculations.
2. **Command Line Tools**:
   - `ipcalc` or `subnetcalc` for Linux.
3. **Manual Binary Calculation**:
   - Use binary arithmetic for precise calculations.

---

### **Summary**
Subnetting is essential for optimizing and securing network resources. By understanding how to divide IP ranges and assign subnets, you can design scalable and efficient networks tailored to specific needs.

Let me know if you’d like to explore advanced topics like **VLSM (Variable-Length Subnet Mask)** or practical exercises!

---

[<-- Networking](networking-quick.md)
