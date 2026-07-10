[<- README](../README.md) | [<- k8s](k8s.md)

# Deciding the Number of Pods in Kubernetes

Deciding the number of **Pods** required for a microservice in **Kubernetes** involves considering several factors related to **performance, availability, and cost-efficiency**. Below is a structured approach:

## **1. Define Requirements**
### **a. Performance Metrics**
- Expected **Requests per Second (RPS)**
- **Response Time** (latency) targets
- **CPU & Memory** consumption per request
- **Concurrency level** (how many parallel requests your app can handle)

### **b. Availability and Redundancy**
- **High Availability (HA)** needs (e.g., minimum 2-3 pods for redundancy)
- **Auto-scaling requirements** (HPA, Cluster Autoscaler)

### **c. Cost Constraints**
- Cloud resources and budget limitations
- Balancing performance and cost

## **2. Load Testing & Benchmarking**
### **a. Measure Pod Capacity**
Deploy a single pod and test:
- Maximum number of requests it can handle before degrading performance
- CPU and memory usage under peak load
- **Tools**: Use tools like `Apache JMeter`, `k6`, `wrk`, or `hey`

### **b. Find Pod Limitations**
- If **one pod** can handle `X` RPS, but your expected traffic is `Y` RPS, then:
  \[
  \text{Required Pods} = \frac{Y}{X}
  \]
  Example:  
  - If **1 pod handles 500 RPS**  
  - Expected traffic is **3000 RPS**  
  - **Pods required**: `3000 / 500 = 6`

## **3. Set Up Horizontal Pod Autoscaling (HPA)**
Instead of **fixing** pod count, use **HPA**:
- **CPU-based Scaling** (e.g., scale up if CPU > 70%)
- **Memory-based Scaling**
- **Custom Metrics** (RPS, queue length, etc.)

**Example HPA configuration:**
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-service
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```
👉 This keeps at least **3 pods**, scaling up to **10 pods** if needed.

## **4. Consider Traffic Spikes**
- Use **Burst Testing** to simulate sudden spikes.
- Ensure **enough buffer capacity** (e.g., keep an additional 20-30% pods as a buffer).
- Use **Cluster Autoscaler** to adjust nodes dynamically.

## **5. Factor in Deployment Strategy**
- **Rolling Updates**: Ensure extra pods exist during updates.
- **Pod Disruption Budget (PDB)**: Avoid downtime due to autoscaling.
- **Node Affinity & Pod Anti-Affinity**: Spread pods across nodes.

## **Final Formula**
\[
Pods = \frac{\text{Expected Peak Load (RPS)}}{\text{Single Pod RPS Capacity}}
\]
**+** buffer for traffic spikes  
**+** extra for HA  

### **Example Calculation**
- **1 pod handles 500 RPS**
- **Expected Peak Traffic: 4000 RPS**
- **Buffer Factor: 20%**
- **Minimum HA: 3 pods**

\[
Pods = \frac{4000}{500} = 8 + 2 \text{ (buffer)} = 10
\]
So, start with **10 pods** and configure **HPA**.

## **Conclusion**
1. **Start small, benchmark, and scale dynamically** using **HPA**.
2. **Consider redundancy & buffer capacity** to handle spikes.
3. **Monitor & tune** using metrics like **CPU, memory, and RPS**.

Would you like help setting up an HPA or testing tools for your use case? 🚀

---

[<- README](../README.md) | [<- k8s](k8s.md)

