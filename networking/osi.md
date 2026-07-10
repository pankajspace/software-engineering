[<-- Networking](networking-quick.md)

## OSI model

The OSI (Open Systems Interconnection) model is a conceptual framework used to understand and implement network communication between systems. It divides the communication process into **seven layers**, each with specific responsibilities.

Here’s an in-depth explanation of each layer:

---

### 1. **Physical Layer (Layer 1)**  
**Purpose**: Deals with the physical transmission of raw binary data (bits) over a medium.  

- **Responsibilities**:
  - Defines the hardware equipment (e.g., cables, switches, NICs).
  - Specifies transmission methods (e.g., electrical signals, light pulses, or radio waves).
  - Determines how data is physically encoded and transmitted.
  - Defines connection types (e.g., wired or wireless).

- **Devices**:
  - Ethernet cables, fiber optics, hubs, repeaters.

- **Example**:
  - Sending bits (`0`s and `1`s) as electrical signals via a cable.  

**Diagram**:
```
[Device A] -- Physical Medium (Cable, Wireless) -- [Device B]
```

---

### 2. **Data Link Layer (Layer 2)**  
**Purpose**: Ensures reliable transmission of data between nodes on the same network.

- **Responsibilities**:
  - Frames data packets for transmission.
  - Manages error detection and correction.
  - Handles **MAC (Media Access Control)** and **LLC (Logical Link Control)**.
  - Controls access to the physical medium.

- **Devices**:
  - Switches, network interface cards (NICs), bridges.

- **Example**:
  - Ethernet protocols define how data frames are transmitted within a local area network (LAN).

**Diagram**:
```
[Frame] -- Data Link (Error Checking, MAC Address) -- [Frame]
```

---

### 3. **Network Layer (Layer 3)**  
**Purpose**: Determines the best path for data transfer and handles addressing and routing.

- **Responsibilities**:
  - Uses logical addresses (e.g., IP addresses) for device identification.
  - Performs routing to find the best path to the destination.
  - Manages congestion and fragmentation.

- **Devices**:
  - Routers, Layer 3 switches.

- **Example**:
  - Using IP routing to deliver data from a computer in New York to a server in London.

**Diagram**:
```
[Packet] -- Router (Path Selection, IP Address) -- [Packet]
```

---

### 4. **Transport Layer (Layer 4)**  
**Purpose**: Ensures end-to-end communication reliability and manages data segmentation and reassembly.

- **Responsibilities**:
  - Provides reliable data delivery (e.g., acknowledgment, error correction).
  - Handles segmentation of data and reassembly.
  - Provides connection-oriented (TCP) or connectionless (UDP) services.

- **Protocols**:
  - **TCP** (Transmission Control Protocol): Ensures data delivery.
  - **UDP** (User Datagram Protocol): Faster but less reliable.

- **Example**:
  - Splitting a large file into smaller segments for transmission and reassembling it at the destination.

**Diagram**:
```
[Segment] -- Transport (TCP/UDP) -- [Segment]
```

---

### 5. **Session Layer (Layer 5)**  
**Purpose**: Manages and controls the dialog between two devices.

- **Responsibilities**:
  - Establishes, maintains, and terminates sessions.
  - Synchronizes communication (e.g., checkpoints for long data transfers).
  - Handles session recovery in case of failure.

- **Example**:
  - Logging into a remote server via SSH establishes a session.

**Diagram**:
```
[Session Start] -- Session Layer (Manage Communication) -- [Session End]
```

---

### 6. **Presentation Layer (Layer 6)**  
**Purpose**: Translates data into a format understandable by the application layer.

- **Responsibilities**:
  - Data formatting and syntax handling (e.g., encryption, decryption, compression).
  - Converts data formats like JSON, XML, or images for application consumption.

- **Protocols/Technologies**:
  - SSL/TLS for encryption.

- **Example**:
  - Decrypting HTTPS traffic or encoding video for playback.

**Diagram**:
```
[Encrypted Data] -- Presentation Layer (Decryption) -- [Plain Data]
```

---

### 7. **Application Layer (Layer 7)**  
**Purpose**: Provides network services directly to user applications.

- **Responsibilities**:
  - Interfaces directly with software applications.
  - Handles protocols like HTTP, FTP, SMTP, DNS, and others.
  - Displays data to users or applications.

- **Protocols**:
  - HTTP (web browsing), SMTP (email), FTP (file transfer).

- **Example**:
  - A user accessing `www.example.com` sends an HTTP request through this layer.

**Diagram**:
```
[User Request] -- Application Layer (HTTP) -- [Web Server Response]
```

---

### Summary of Layer Interaction
Each layer communicates with the layer directly above and below it. Data flows **downward** on the sender's side, starting from the application layer, and flows **upward** on the receiver's side.

**Diagram**:
```
Sender:  [Application] --> [Presentation] --> [Session] --> [Transport]
         --> [Network] --> [Data Link] --> [Physical]
Receiver: [Physical] --> [Data Link] --> [Network] --> [Transport]
          --> [Session] --> [Presentation] --> [Application]
```

---

### Real-World Analogy
Imagine sending a physical letter:
1. **Physical Layer**: The postal truck delivering the letter.
2. **Data Link Layer**: Address on the envelope.
3. **Network Layer**: Determining the route to the recipient.
4. **Transport Layer**: Ensuring the letter reaches its destination.
5. **Session Layer**: Managing ongoing communication (e.g., multiple letters in a conversation).
6. **Presentation Layer**: Translating languages, if necessary.
7. **Application Layer**: The content of the letter itself.

---

### Key Points:
1. The OSI model standardizes communication.
2. Each layer has specific protocols and devices.
3. Not all layers are always visible (e.g., physical layers are abstracted in cloud environments).

---

[<-- Networking](networking-quick.md)