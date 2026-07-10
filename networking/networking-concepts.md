[<-- Networking](networking-quick.md)

## Networking Quick Reference

Below is a detailed explanation of each networking concept outlined earlier, along with textual diagrams for clarity.

---

### 1. **The OSI Model**
The OSI model breaks down communication into seven abstraction layers. Each layer interacts only with its adjacent layers.

1. **Application Layer**: Interfaces with the user. Protocols include HTTP (web), FTP (file transfer), and SMTP (email).
2. **Presentation Layer**: Translates data formats (e.g., encryption, compression).
3. **Session Layer**: Manages sessions between devices (start, maintain, and end communication).
4. **Transport Layer**: Ensures reliable data delivery (e.g., TCP for reliability, UDP for speed).
5. **Network Layer**: Handles routing and addressing via IP.
6. **Data Link Layer**: Manages data transfer within the same network, using MAC addresses.
7. **Physical Layer**: Converts data into electrical signals for transmission.

**Diagram**  
```
[7] Application - HTTP, FTP, SMTP
[6] Presentation - Encryption, Data Formatting
[5] Session - Manages Communication
[4] Transport - TCP/UDP
[3] Network - IP Routing
[2] Data Link - MAC Addressing
[1] Physical - Cables, Bits
```

---

### 2. **IP Addressing**
IP addresses identify devices on a network. 
- **IPv4**: 32-bit (e.g., `192.168.1.1`)
- **IPv6**: 128-bit (e.g., `2001:db8::1`), designed to address the IPv4 exhaustion issue.

Devices communicate by exchanging data packets addressed to IPs.

**Diagram**
```
Device A (IP: 192.168.1.2) ---> Network ---> Device B (IP: 192.168.1.3)
```

---

### 3. **Subnetting**
Subnetting divides a network into smaller subnetworks for better performance and security. It uses a **subnet mask** to define how many bits are used for the network.

- Example:  
  - Network: `192.168.1.0/24` (256 addresses)
  - Subnet: `192.168.1.0/26` (64 addresses)

**Diagram**
```
[Network] 192.168.1.0/24
[Subnet 1] 192.168.1.0/26
[Subnet 2] 192.168.1.64/26
```

---

### 4. **DNS (Domain Name System)**
DNS translates human-readable domain names into machine-readable IP addresses. This makes it easier to access websites without memorizing IPs.

1. A **DNS Request** is sent to a DNS server.
2. The server resolves the domain to an IP and responds.

**Diagram**
```
Client --> DNS Request --> DNS Server
       <-- DNS Response (192.0.2.1)
Client --> Server (192.0.2.1)
```

---

### 5. **HTTP/HTTPS**
- **HTTP (HyperText Transfer Protocol)**: Transfers web content. Data is plaintext.
- **HTTPS**: Secured with SSL/TLS encryption to protect data.

**Diagram**
```
HTTP:  Client ----> Server (Plaintext)
HTTPS: Client <-SSL/TLS-> Server (Encrypted)
```

---

### 6. **Routing**
Routing is the process of directing data packets from the source to the destination through intermediate routers. It uses the **Network Layer** of the OSI model.

**Diagram**
```
[Client (192.168.1.2)] --> [Router] --> [Server (203.0.113.5)]
```

---

### 7. **TCP/IP**
The TCP/IP model simplifies communication into four layers:
1. **Application**: HTTP, DNS
2. **Transport**: TCP (reliable) or UDP (faster, less reliable)
3. **Internet**: IP routing
4. **Network Access**: Physical transmission

TCP ensures data integrity through sequencing and acknowledgment.

**Diagram**
```
Application Data --> TCP (segments) --> IP (packets) --> Network
```

---

### 8. **NAT (Network Address Translation)**
NAT maps private IPs in a local network to a public IP for external communication.

- Private IP: `192.168.1.2`
- Public IP: `203.0.113.5`

**Diagram**
```
[Private Network]
Device A (192.168.1.2) ----> NAT ----> Internet (203.0.113.5)
```

---

### 9. **Firewall**
A firewall enforces security by filtering traffic based on rules. It can:
- Allow or block specific IPs.
- Block certain protocols or ports.

**Diagram**
```
[Client] ---> [Firewall] ---> [Server]
```

---

### 10. **WebSocket**
WebSocket enables real-time, bi-directional communication between the client and the server.

**Diagram**
```
Client <--- WebSocket Connection ---> Server
```

---

### 11. **VPN (Virtual Private Network)**
VPN creates a secure, encrypted "tunnel" between the user and a remote server.

**Diagram**
```
Client --> Encrypted Tunnel --> VPN Server --> Internet
```

---

### 12. **Ping and Latency**
- **Ping**: Tests connectivity by sending "echo requests."
- **Latency**: Measures round-trip time for packets.

**Diagram**
```
[Client] --> Ping Request --> [Server]
         <-- Ping Response --
```

---

### 13. **Ports**
Ports differentiate services running on the same machine. Common ports:
- HTTP: 80
- HTTPS: 443
- SSH: 22

**Diagram**
```
Client (Port 12345) --> Server (Port 80)
```

---

Each of these concepts is essential to understanding how data travels across networks, ensuring secure, fast, and reliable communication.

---

[<-- Networking](networking-quick.md)
