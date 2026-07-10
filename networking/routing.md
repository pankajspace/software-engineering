[<-- Networking](networking-quick.md)

# Routing

### **Routing in Detail**

**Routing** is the process of determining the path that data packets take to travel from a source device to a destination device across a network. Routers and routing protocols ensure that packets are delivered efficiently, even across multiple networks.

---

### **Key Concepts in Routing**

1. **Router**:
   - A device that forwards data packets between networks.
   - Operates at the **Network Layer (Layer 3)** of the OSI model.
   - Uses IP addresses to make routing decisions.

2. **Routing Table**:
   - A database maintained by a router to determine the best path for forwarding packets.
   - Contains information like:
     - Destination network.
     - Subnet mask.
     - Gateway (next-hop router).
     - Metric (cost of reaching the destination).

3. **Packet Forwarding**:
   - The process of sending data packets from one network to another, guided by the routing table.

4. **Hop**:
   - Each router a packet passes through on its way to the destination is called a **hop**.

---

### **How Routing Works**

#### **Step-by-Step Process**:

1. **Packet Creation**:
   - The source device generates a data packet containing the destination IP address.

2. **Local Check**:
   - The device checks if the destination IP is in its local network using the subnet mask. 
   - If the destination is in the same network, the packet is sent directly; otherwise, it is forwarded to the default gateway.

3. **Router Processing**:
   - The default gateway (router) examines the destination IP and consults its routing table to decide the next hop.

4. **Path Determination**:
   - The router forwards the packet to the next hop, repeating this process until it reaches the destination.

---

### **Routing Table Example**

A sample routing table for a router:

| Destination Network | Subnet Mask   | Gateway     | Interface | Metric |
| ------------------- | ------------- | ----------- | --------- | ------ |
| 192.168.1.0         | 255.255.255.0 | Direct      | eth0      | 1      |
| 10.0.0.0            | 255.0.0.0     | 192.168.1.2 | eth1      | 5      |
| 0.0.0.0             | 0.0.0.0       | 192.168.1.1 | eth0      | 10     |

- **Direct Route**: Indicates the network is directly connected to the router.
- **Gateway**: Specifies the next router for indirect routes.
- **Default Route (0.0.0.0/0)**: Used when no specific route matches the destination.

---

### **Types of Routing**

1. **Static Routing**:
   - Manually configured routes by a network administrator.
   - Suitable for small, simple networks.
   - **Advantages**:
     - Easy to configure and troubleshoot.
     - No overhead from routing protocols.
   - **Disadvantages**:
     - Does not adapt to network changes.
     - Requires manual updates.

2. **Dynamic Routing**:
   - Routes are automatically learned and updated using routing protocols.
   - Suitable for larger, complex networks.
   - **Advantages**:
     - Automatically adapts to network changes (e.g., link failures).
     - Reduces administrative overhead.
   - **Disadvantages**:
     - Higher resource usage (CPU, memory).
     - More complex to troubleshoot.

---

### **Routing Protocols**

#### **1. Interior Gateway Protocols (IGPs)**:
Used within a single autonomous system (AS).

- **RIP (Routing Information Protocol)**:
  - Simple, uses hop count as a metric.
  - Maximum of 15 hops; not suitable for large networks.

- **OSPF (Open Shortest Path First)**:
  - Uses link-state routing; calculates the shortest path using the Dijkstra algorithm.
  - Scalable and supports large networks.

- **EIGRP (Enhanced Interior Gateway Routing Protocol)**:
  - Cisco proprietary.
  - Combines the best features of link-state and distance-vector protocols.

---

#### **2. Exterior Gateway Protocols (EGPs)**:
Used between different autonomous systems.

- **BGP (Border Gateway Protocol)**:
  - The protocol of the internet.
  - Uses path vector routing and considers various attributes (e.g., AS paths, metrics).

---

#### **3. Link-State vs. Distance-Vector Routing**

| **Aspect**           | **Link-State Routing**              | **Distance-Vector Routing**            |
| -------------------- | ----------------------------------- | -------------------------------------- |
| **How It Works**     | Shares the entire network topology. | Shares only the distance to neighbors. |
| **Examples**         | OSPF, IS-IS                         | RIP, EIGRP                             |
| **Convergence Time** | Faster                              | Slower                                 |
| **Scalability**      | Better for large networks.          | Suitable for small networks.           |

---

### **Routing Algorithms**

Routing algorithms determine the best path for packets. 

1. **Shortest Path First (SPF)**:
   - Finds the shortest path between nodes using algorithms like **Dijkstra**.

2. **Distance Vector**:
   - Calculates the best route based on distance metrics (e.g., hop count).

3. **Hybrid**:
   - Combines features of both SPF and distance vector (e.g., EIGRP).

---

### **Default Routing**

- A **default route** is used when no specific route matches the destination address.
- Example: For a home network, traffic destined outside the local network is sent to the ISP’s router.

**Example Entry**:
```
0.0.0.0/0 -> Next-Hop: 192.168.1.1
```

---

### **NAT and Routing**

**Network Address Translation (NAT)** modifies IP addresses as packets pass through a router. It allows devices in a private network to access the internet using a single public IP address.

- **Types**:
  - **Static NAT**: Maps one private IP to one public IP.
  - **Dynamic NAT**: Uses a pool of public IPs.
  - **PAT (Port Address Translation)**: Maps multiple private IPs to a single public IP using different ports.

---

### **Routing in IPv4 vs IPv6**

- **IPv4 Routing**:
  - Uses 32-bit addresses.
  - Subnets are defined using subnet masks.
  - Supports NAT.

- **IPv6 Routing**:
  - Uses 128-bit addresses.
  - Supports hierarchical routing and efficient address aggregation.
  - NAT is rarely used due to the vast address space.

---

### **Routing Challenges**

1. **Routing Loops**:
   - Occur when packets circulate endlessly due to misconfigurations.
   - Prevented by techniques like TTL (Time to Live).

2. **Convergence Time**:
   - The time taken for routers to agree on network topology after a change.

3. **Scalability**:
   - Large networks require efficient protocols to minimize overhead.

---

### **Real-World Analogy**

Imagine sending a letter:
1. You (source) write the destination address (IP address).
2. The local post office (router) determines the best route to the destination.
3. The letter travels through intermediate hubs (hops).
4. Finally, it reaches the recipient (destination).

---

### **Conclusion**

Routing is a fundamental process that ensures data is delivered efficiently across networks. Understanding routing tables, protocols, and algorithms is essential for designing, managing, and troubleshooting modern networks.

---

[<-- Networking](networking-quick.md)
