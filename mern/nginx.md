[<- MERN](mern-quick.md)

# Nginx Main Concepts with Examples

Nginx is a powerful, high-performance web server, reverse proxy, and load balancer. Below are the key concepts of Nginx, along with examples.

---

### 1. **Worker Processes and Event-Driven Architecture**
Nginx uses an asynchronous, event-driven architecture. It spawns worker processes that handle multiple connections within the same thread.

- **Master Process**: Handles configuration, restarting, and spawning worker processes.
- **Worker Processes**: Handle client connections.

**Example (Configuring worker processes):**
```bash
worker_processes  4;  # Use 4 worker processes for handling connections
```

---

### 2. **Modules**
Nginx has a modular architecture, where features can be added via modules like HTTP, mail, and stream modules. Many features are included out-of-the-box (static file serving, reverse proxy, etc.).

**Example (Static File Serving with HTTP Module):**
```nginx
http {
    server {
        listen 80;
        server_name example.com;
        location / {
            root /var/www/html;
            index index.html;
        }
    }
}
```

---

### 3. **Reverse Proxy**
Nginx can act as a reverse proxy, forwarding client requests to backend servers (like application servers) while handling client-server interactions.

**Example (Reverse Proxy to Backend Server):**
```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:5000;  # Forwarding traffic to a Flask app running on port 5000
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

### 4. **Load Balancing**
Nginx can distribute traffic across multiple backend servers to balance the load and improve fault tolerance.

**Example (Round-Robin Load Balancing):**
```nginx
http {
    upstream backend_servers {
        server 192.168.1.101;
        server 192.168.1.102;
        server 192.168.1.103;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://backend_servers;
        }
    }
}
```

In this example, Nginx balances traffic between three backend servers using the default round-robin algorithm.

---

### 5. **Caching**
Nginx can cache content from the backend server to speed up response times for clients.

**Example (Simple Proxy Cache):**
```nginx
proxy_cache_path /data/nginx/cache keys_zone=my_cache:10m;

server {
    location / {
        proxy_cache my_cache;
        proxy_pass http://backend_server;
        proxy_cache_valid 200 1h;
        add_header X-Cache-Status $upstream_cache_status;
    }
}
```

This setup caches responses for 1 hour and adds a header indicating cache status.

---

### 6. **Security Features**
Nginx provides SSL/TLS termination, access control, and other security-related features.

**Example (Enabling SSL/TLS):**
```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /etc/nginx/ssl/certificate.crt;
    ssl_certificate_key /etc/nginx/ssl/certificate.key;

    location / {
        root /var/www/html;
        index index.html;
    }
}
```

---

### 7. **Rate Limiting**
Nginx supports rate limiting to prevent abuse or overload by controlling the number of requests from a single IP.

**Example (Rate Limiting per IP Address):**
```nginx
http {
    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=1r/s;

    server {
        location / {
            limit_req zone=mylimit burst=5;
            proxy_pass http://backend_server;
        }
    }
}
```
In this example, Nginx limits requests to 1 request per second with a burst of 5 requests.

---

### 8. **URL Rewriting**
Nginx allows rewriting URLs using the `rewrite` directive for SEO optimization or redirection.

**Example (Rewrite Rule):**
```nginx
server {
    listen 80;
    server_name example.com;
    
    location /oldpage {
        rewrite ^/oldpage$ /newpage permanent;  # Redirects /oldpage to /newpage
    }
}
```

---

### 9. **Static Content Serving**
Nginx is highly efficient in serving static files like HTML, CSS, JavaScript, and images.

**Example (Serving Static Files):**
```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        root /var/www/html;
        index index.html;
    }

    location /images/ {
        root /var/www/static;
    }
}
```

---

### 10. **Logging**
Nginx provides detailed access and error logging features for debugging and monitoring.

**Example (Custom Log Format):**
```nginx
log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for"';

access_log /var/log/nginx/access.log main;
```

---

# NGINX with Examples Using Express.js

Deploying a **MERN (MongoDB, Express, React, Node.js)** application to **AWS EC2** using **GitHub Actions** for Continuous Deployment (CD) is a powerful approach. It allows you to automatically deploy your app to AWS every time you push new changes to your GitHub repository. In this guide, I’ll walk you through the **setup of GitHub Actions** for deploying a MERN app from GitHub to AWS.

### **Overview of the Process:**
1. Set up an EC2 instance.
2. Configure the EC2 server for Node.js, Nginx, and PM2.
3. Set up SSH access to the EC2 instance.
4. Create a GitHub Actions workflow to automatically deploy the app to AWS.
5. Deploy and test the MERN app.

---

## **1. Launch an EC2 Instance**

### **1.1 Create an EC2 instance:**
1. Log into your **AWS Management Console** and launch a new EC2 instance:
   - **AMI**: Select Ubuntu 20.04 LTS or a similar Linux distribution.
   - **Instance type**: Use a `t2.micro` for free tier, or other types depending on your application needs.
   - **Security group**: Ensure you allow **SSH (port 22)**, **HTTP (port 80)**, and **HTTPS (port 443)**.
   - **Key pair**: Create or use an existing SSH key pair for accessing the instance.

2. **Connect to the EC2 instance** via SSH:
   ```bash
   ssh -i /path_to_your_pem_file.pem ubuntu@your_ec2_public_ip
   ```

---

## **2. Set Up the EC2 Instance**

### **2.1 Install Required Software (Node.js, Nginx, PM2, Git)**

Once you're connected to the EC2 instance, follow these steps:

1. **Update the system**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Node.js and NPM**:
   ```bash
   sudo apt install nodejs npm
   ```

3. **Install Nginx**:
   ```bash
   sudo apt install nginx
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

4. **Install PM2** (for running the Node.js app as a background service):
   ```bash
   sudo npm install pm2@latest -g
   ```

5. **Install Git**:
   ```bash
   sudo apt install git
   ```

6. **Allow permissions for Nginx to serve on port 80**:
   ```bash
   sudo ufw allow 'Nginx Full'
   ```

---

## **3. Set Up SSH Access for GitHub Actions**

GitHub Actions will need SSH access to your EC2 instance to deploy your MERN app. For security reasons, we'll set up a deploy key.

### **3.1 Generate SSH Keys for Deployment**

On your local machine, generate a new SSH key pair (or on your EC2 instance if you prefer):

```bash
ssh-keygen -t rsa -b 4096 -C "github-actions@deploy"
```

This will generate two files:
- `id_rsa`: The **private key**.
- `id_rsa.pub`: The **public key**.

### **3.2 Add the SSH Key to EC2 Instance**

1. **Copy the public key** (`id_rsa.pub`) to your EC2 instance:
   ```bash
   cat ~/.ssh/id_rsa.pub
   ```

2. **Add the public key** to the `~/.ssh/authorized_keys` file on your EC2 instance:
   ```bash
   echo "your-public-key-content" >> ~/.ssh/authorized_keys
   ```

3. **Ensure proper permissions**:
   ```bash
   chmod 600 ~/.ssh/authorized_keys
   ```

### **3.3 Add the Private Key to GitHub Secrets**

1. Go to your GitHub repository.
2. Navigate to **Settings > Secrets and variables > Actions > New repository secret**.
3. Create a secret called `EC2_SSH_KEY` and paste the **private key** (`id_rsa`) into the secret.

---

## **4. Configure Nginx as a Reverse Proxy**

We need to set up **Nginx** to forward incoming HTTP requests to our Node.js application running on port 3000 (or whichever port your app runs on).

### **4.1 Edit the Nginx Configuration**

Open the Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/default
```

Modify the file to include the following configuration:

```nginx
server {
    listen 80;
    server_name your_domain_or_public_ip;

    location / {
        proxy_pass http://localhost:3000;  # The port where Node.js runs
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save and exit the editor.

### **4.2 Restart Nginx**

Test the configuration and restart Nginx:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## **5. Create GitHub Actions Workflow**

Now we’ll create a **GitHub Actions** workflow that will automatically deploy your MERN app to AWS EC2 when changes are pushed to the GitHub repository.

### **5.1 Create `.github/workflows/deploy.yml`**

In your MERN repository, create a **GitHub Actions workflow file** at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to EC2

on:
  push:
    branches:
      - main  # Deploy when pushing to the main branch

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'  # Set the version of Node.js

      - name: Install dependencies
        run: npm install

      - name: Run Build (React App)
        run: |
          cd client
          npm install
          npm run build  # Build the React app

      - name: Deploy to EC2
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.EC2_HOST }}  # Add your EC2 IP as a GitHub Secret
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          port: 22
          script: |
            cd /home/ubuntu/your-app-folder
            git pull origin main
            npm install
            cd client
            npm install
            npm run build
            cd ..
            pm2 restart all
```

### **5.2 Add GitHub Secrets**

Add the following secrets to your GitHub repository:

- **EC2_HOST**: The public IP address of your EC2 instance.
- **EC2_SSH_KEY**: The private SSH key you generated earlier.

### **5.3 Explanation of Workflow Steps**

1. **Checkout Code**: Pulls the latest code from the repository.
2. **Set up Node.js**: Sets up the correct version of Node.js.
3. **Install Dependencies**: Installs backend and frontend dependencies.
4. **Build the React App**: Builds the production-ready React app.
5. **SSH into EC2**: Using `appleboy/ssh-action`, GitHub Actions connects to your EC2 instance and runs the commands to:
   - Pull the latest code from GitHub.
   - Install necessary dependencies (`npm install`).
   - Build the React app (`npm run build`).
   - Restart the application using PM2.

---

## **6. Deploy the Application**

After configuring the GitHub Actions workflow and secrets, the deployment process will be automatic. Every time you push to the **`main`** branch, GitHub Actions will:

1. Run the build process.
2. SSH into the EC2 instance.
3. Pull the latest code from the repository.
4. Rebuild the frontend (React).
5. Restart the Node.js server using PM2.

### **To trigger the deployment**:
- Push any changes to the `main` branch on GitHub:
  ```bash
  git add .
  git commit -m "Deploying MERN app"
  git push origin main
  ```

---

## **7. Monitoring the App**

1. **Check the status of PM2** to ensure the app is running:
   ```bash
   pm2 list
   ```

2. **Check PM2 logs** for debugging:
   ```bash
   pm2 logs
   ```

3. **Monitor Nginx logs** if necessary:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

---

## **8. Access the Application**

Your MERN application should now be live and accessible via your **EC2 instance’s public IP** or domain name (if configured with DNS).

```
http://your-ec2-public-ip
```

If you set up **SSL using Let's Encrypt**, the app should be accessible via **HTTPS**.

---

### **Summary of Steps:**

1. **Launch EC2 instance** and set up the necessary software (Node.js, Nginx, PM2, Git).
2. **Generate SSH keys** and configure SSH access for GitHub Actions.
3. **Set up Nginx** as a reverse proxy.
4. **Create a GitHub Actions workflow** to automatically deploy the MERN app to the EC2 instance when changes are pushed.
5. **Push changes to the `main` branch**, triggering the GitHub Actions workflow and automatically deploying the app to AWS.

This deployment setup ensures that each time you push updates to your **MERN app on GitHub**, GitHub Actions will automatically deploy the app to your AWS EC2 instance.

---

[<- MERN](mern-quick.md)
