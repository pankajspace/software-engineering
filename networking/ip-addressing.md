[<-- Networking](networking-quick.md)

## IP Addressing

### **IP Addressing in Detail**

An **IP (Internet Protocol) address** is a unique identifier assigned to devices on a network. It facilitates communication by defining the source and destination of data packets.

There are two main versions of IP addressing:
1. **IPv4** (Internet Protocol version 4)
2. **IPv6** (Internet Protocol version 6)

---

### **1. IPv4 Addressing**
IPv4 is the most widely used version of IP addressing.

#### **Structure**
- An IPv4 address is a **32-bit number**, divided into four 8-bit octets.
- Each octet is represented as a decimal number (0 to 255), separated by dots.

**Example**:  
```
192.168.1.1
```

#### **Binary Representation**
The decimal numbers are converted into binary for computation:
```
192.168.1.1 = 11000000.10101000.00000001.00000001
```

---

#### **Classes of IPv4 Addresses**
IPv4 is divided into **five classes (A to E)**, based on the starting bits:

| Class | Starting Bits | Range of First Octet | Purpose                       |
| ----- | ------------- | -------------------- | ----------------------------- |
| A     | 0             | 1 - 126              | Large networks (e.g., ISPs)   |
| B     | 10            | 128 - 191            | Medium-sized networks         |
| C     | 110           | 192 - 223            | Small networks (e.g., LANs)   |
| D     | 1110          | 224 - 239            | Multicast                     |
| E     | 1111          | 240 - 255            | Reserved for experimental use |

**Note**: `127.0.0.0` to `127.255.255.255` is reserved for loopback (localhost).

---

#### **Subnet Mask**
A **subnet mask** determines which part of an IP address represents the network and which part represents the host.

- Example: IP `192.168.1.1` with subnet mask `255.255.255.0`.
  - **Network Portion**: `192.168.1`
  - **Host Portion**: `.1`

**CIDR Notation (Classless Inter-Domain Routing)**:  
Subnet masks are also written as `/x`, where `x` is the number of bits for the network.  
For example, `/24` means the first 24 bits are for the network:
```
192.168.1.1/24
```

---

#### **Private vs. Public IPv4 Addresses**
- **Private IPs**: Used within private networks and not routable on the internet.  
  Ranges:
  ```
  10.0.0.0 - 10.255.255.255
  172.16.0.0 - 172.31.255.255
  192.168.0.0 - 192.168.255.255
  ```
- **Public IPs**: Assigned by ISPs and used for internet communication.

---

### **2. IPv6 Addressing**
IPv6 was introduced to address the exhaustion of IPv4 addresses.

#### **Structure**
- An IPv6 address is a **128-bit number**, represented as 8 groups of 4 hexadecimal digits, separated by colons.

**Example**:  
```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

#### **Shortened Representation**
Leading zeroes in each group can be omitted, and consecutive groups of zeroes can be replaced by `::` (only once per address).

**Example**:  
```
2001:0db8:0000:0000:0000:0000:0000:1  
= 2001:db8::1
```

#### **Advantages of IPv6**
- Vast address space (2^128 addresses).
- Built-in security features (e.g., IPsec for encryption).
- Simplified network configuration via autoconfiguration.

---

#### **Types of IPv6 Addresses**
1. **Unicast**: For a single device (similar to IPv4).
2. **Multicast**: For a group of devices.
3. **Anycast**: Delivered to the nearest device in a group.

---

### **3. IP Address Assignment**
IP addresses can be assigned to devices in two ways:

#### **1. Static IP**
- Manually configured.
- Fixed address for critical devices (e.g., servers, printers).

#### **2. Dynamic IP**
- Assigned automatically by a **DHCP (Dynamic Host Configuration Protocol)** server.
- Common for end-user devices (e.g., laptops, smartphones).

---

### **4. Special IP Addresses**
- **Loopback (127.0.0.1)**: Refers to the local machine.
- **Broadcast (255.255.255.255)**: Sends data to all devices in the network.
- **Default Gateway**: Router’s IP address used for external communication.

---

### **5. Address Resolution**
To send data:
1. IP addresses are mapped to **MAC (Media Access Control) addresses** using ARP (Address Resolution Protocol) in IPv4 or NDP (Neighbor Discovery Protocol) in IPv6.

**Diagram**:  
```
Device A (192.168.1.2) --> ARP Request --> Device B (192.168.1.3, MAC: 00:14:22:01:23:45)
Device A uses MAC to send data.
```

---

### **6. Address Translation**
**NAT (Network Address Translation)** allows multiple devices in a private network to share a single public IP address.

**Example**:
```
[Private Network]
Device A (192.168.1.2) --> NAT Router --> Public IP (203.0.113.5)
```

---

### **7. Real-World Analogy**
An IP address is like a postal address:
- **Network Portion**: Identifies the city (network).
- **Host Portion**: Identifies the specific house (device).

---

### **Conclusion**
Understanding IP addressing is fundamental to networking. It defines how devices are identified and communicate in a network, whether it’s a local LAN or the global internet. If you'd like, I can dive deeper into subnetting, CIDR, NAT, or IPv6!

---

[<-- Networking](networking-quick.md)
