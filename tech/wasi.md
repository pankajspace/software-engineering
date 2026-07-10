[<- TECH](tech-quick.md)

## What is WASI?

**WASI** stands for **WebAssembly System Interface**. It is a modular system interface designed to run WebAssembly (Wasm) programs outside of the browser, allowing them to interact with the operating system in a secure, cross-platform, and efficient manner.

WebAssembly was initially created to run portable code inside web browsers, but its capabilities have expanded, and developers want to run Wasm code on the server, on the edge, in cloud-native environments, or embedded systems. WASI provides the necessary system-level APIs and capabilities to enable WebAssembly programs to run in these diverse environments.

### Why is WASI being introduced?

WASI is being introduced to solve several challenges that arise when using WebAssembly outside the browser. Here are some key reasons:

### 1. **Cross-Platform Compatibility**
WebAssembly provides a platform-independent binary format, but to be useful outside of browsers, it needs a way to interface with the underlying operating system (OS). However, different platforms (e.g., Linux, Windows, macOS) have different system interfaces (e.g., POSIX, Win32). WASI abstracts these differences and provides a unified, cross-platform interface for Wasm programs to perform system-level tasks like file I/O, networking, and process management.

By using WASI, developers can write WebAssembly code once and run it across different platforms without having to worry about OS-specific system calls or APIs.

### 2. **Security and Sandboxing**
WASI is designed with **security** as a top priority. When running WebAssembly outside the browser, the same security benefits (e.g., sandboxing) that are offered inside browsers are necessary. WASI provides a minimal, capability-based API, meaning that WebAssembly programs running under WASI only have access to the resources explicitly granted to them (such as file system access or network sockets).

This principle of least privilege ensures that Wasm programs cannot access sensitive system resources unless they are specifically allowed, making it safer to run untrusted code in environments like server-side or edge computing.

### 3. **Portability and Performance**
Traditionally, system interfaces like POSIX have limitations when it comes to performance and portability across modern environments (e.g., serverless, containers, edge computing). WASI is designed to be lightweight and performant, specifically optimized for WebAssembly, making it easier to run Wasm programs efficiently across various environments.

Additionally, WebAssembly itself is a compact, fast-loading, and highly optimized format, which aligns well with WASI’s goal to provide an efficient system interface for high-performance applications.

### 4. **Beyond Browsers (Server, Edge, IoT)**
While WebAssembly was originally created for browsers, WASI extends its reach to a wide range of environments like:
   - **Server-side applications**: Wasm can be used in cloud or server environments as a portable binary format, providing better security and performance.
   - **Edge computing**: With WASI, WebAssembly can run efficiently on edge devices, providing a lightweight alternative to containers or virtual machines.
   - **IoT devices**: WASI makes it possible for WebAssembly to run on embedded systems and IoT devices, providing a compact and secure way to manage applications in resource-constrained environments.

### 5. **Modularity and Extensibility**
WASI is modular, meaning that it is designed to evolve and extend over time. Initially, WASI focused on providing basic functionalities like file I/O, but more APIs (e.g., networking, threading) can be added as extensions over time. This makes WASI a flexible and future-proof system interface that can adapt to new use cases.

### 6. **Better Language Support**
Many programming languages (like Rust, C, C++) can compile code to WebAssembly. With WASI, these languages can now take advantage of WebAssembly’s cross-platform nature and run their code in any environment that supports WASI, without worrying about the differences in system interfaces between operating systems. This makes it easier to bring a broader set of programming languages to WebAssembly and make them useful beyond the browser.

### 7. **Containerization and Lightweight Isolation**
In cloud-native environments, WASI provides an alternative to traditional containerization by enabling WebAssembly-based microservices or applications. WASI programs are lightweight and provide strong isolation by design, making them an attractive option for cloud and serverless computing, where performance and security are key concerns.

### Summary of Benefits:
- **Cross-platform**: Write once, run anywhere, without worrying about platform-specific system APIs.
- **Security**: Provides strong sandboxing and capability-based access to system resources.
- **Portability**: Facilitates running Wasm programs on diverse environments, from browsers to servers, edge, and IoT.
- **Performance**: Optimized for modern, lightweight, and high-performance computing needs.
- **Modularity**: Designed to evolve and adapt to new environments and requirements.

### Conclusion

WASI is introduced to extend the power of WebAssembly beyond the browser into environments like servers, edge devices, and IoT. By providing a secure, portable, and efficient system interface, WASI enables WebAssembly programs to run safely and effectively in diverse, non-browser contexts. This helps unlock new use cases for WebAssembly and supports its goal of becoming a truly universal binary format.

---

[<- MISC](misc-quick.md)
