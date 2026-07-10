[<- README](../README.md) | [<- Docker](docker.md)

# Docker YAML File

A Docker YAML file typically refers to a Docker Compose file (`docker-compose.yml`), which is used to define and run multi-container Docker applications. Instead of running individual Docker commands, you can use Docker Compose to simplify the configuration and orchestration of multiple containers using a YAML file.

Here's a breakdown of the key components of a typical `docker-compose.yml` file:

## Basic Structure of `docker-compose.yml`

```yaml
version: '3'  # Docker Compose file format version

services:  # List of services (containers)
  web:  # Define a service (container) named "web"
    image: nginx:alpine  # Use the NGINX image from Docker Hub (specify version "alpine")
    ports:
      - "8080:80"  # Map port 8080 on the host to port 80 in the container
    volumes:
      - ./html:/usr/share/nginx/html  # Mount a volume (host directory ./html to container directory)
    environment:
      - NGINX_HOST=localhost  # Set environment variables
      - NGINX_PORT=80
    networks:
      - frontend  # Attach this service to the "frontend" network

  db:  # Define another service named "db" (for a database)
    image: postgres:13  # Use the Postgres image from Docker Hub, version 13
    environment:
      POSTGRES_USER: user  # Define environment variables
      POSTGRES_PASSWORD: password
    volumes:
      - db-data:/var/lib/postgresql/data  # Define a named volume for persistent storage
    networks:
      - backend  # Attach this service to the "backend" network

volumes:  # Define named volumes
  db-data:  # Named volume for the database
    driver: local  # Using the local volume driver

networks:  # Define networks for communication between containers
  frontend:  # Network for the web container
  backend:  # Network for the database container
```

## Detailed Breakdown

1. Version
   - The `version` key specifies which version of the Docker Compose file format you are using. In this case, it's version `3`, which is a common version for Docker Compose files.
   - Different versions support different features, so it's important to choose one that suits your needs and Docker version.

2. Services
   - The `services` section defines the different containers (services) that will run in your application. Each service represents a Docker container.
   
   Example:
   - `web`: This is the name of the first service.
   - `db`: This is the name of the second service.

3. Image
   - The `image` key specifies the Docker image to use for the container. You can pull images from Docker Hub (or any other registry) by specifying the image name and optionally the version tag.
   
   Example:
   - `image: nginx:alpine`: This pulls the lightweight `alpine` version of the NGINX image.
   - `image: postgres:13`: This pulls the version `13` of the Postgres image.

4. Ports
   - The `ports` key maps the host's port to the container's port. This is useful for exposing services running inside containers to the outside world.
   
   Example:
   - `- "8080:80"`: This maps port `8080` on the host machine to port `80` inside the container (for the NGINX service).

5. Volumes
   - The `volumes` key defines persistent storage. It allows you to mount directories from the host machine into the container, or use Docker’s named volumes for persistence.
   - This is useful for persisting data (like database storage) or sharing files between the host and container.
   
   Example:
   - `./html:/usr/share/nginx/html`: Mounts a local folder (`./html`) to a folder inside the NGINX container.

6. Environment
   - The `environment` key allows you to pass environment variables to your containers. These variables can configure the container or its software.
   
   Example:
   - For NGINX: `NGINX_HOST=localhost`, `NGINX_PORT=80`
   - For Postgres: `POSTGRES_USER=user`, `POSTGRES_PASSWORD=password`

7. Networks
   - The `networks` key defines communication channels between different services. By default, Docker Compose creates a network for the services to communicate within, but you can define custom networks for more control.
   - Services on the same network can communicate with each other using their service names as hostnames.
   
   Example:
   - The `web` service is attached to the `frontend` network.
   - The `db` service is attached to the `backend` network.

8. Named Volumes
   - In the `volumes` section at the bottom, we define named volumes (like `db-data`). Named volumes are managed by Docker and can persist data beyond the lifecycle of a container.
   
   Example:
   - `db-data` is a named volume used by the `db` service to store persistent Postgres data.

9. Networks Section
   - This defines custom networks used in the services. In this case, two networks, `frontend` and `backend`, are defined.
   - This allows for more control over how services communicate and lets you isolate services from each other if necessary.

## Example: Running Docker Compose

To start the services defined in your `docker-compose.yml` file, you would use the following command in your terminal:

```bash
docker-compose up
```

This will pull the required images (if not already present), create the containers, and start them according to the configurations in the YAML file.

You can also use:

- `docker-compose down` to stop and remove the containers.
- `docker-compose ps` to check the status of the running containers.
- `docker-compose logs` to view logs from the running containers.

## Additional Features in Docker Compose YAML

- Build
   If you need to build a custom image from a `Dockerfile`, you can specify the `build` context instead of using an image.

   ```yaml
   build: ./app  # Path to the Dockerfile directory
   ```

- Depends_on
   Specifies dependencies between services, ensuring one starts before another.

   ```yaml
   depends_on:
     - db  # Ensure the "db" service starts before the "web" service
   ```

- Restart Policy
   Specifies the restart policy for a container.

   ```yaml
   restart: always  # Always restart the container if it fails
   ```

## Conclusion

A Docker Compose YAML file simplifies container orchestration by allowing you to define services, networks, and volumes all in one place. By using a simple and human-readable YAML format, it lets you easily manage and scale your multi-container applications.

---

[<- README](../README.md) | [<- Docker](docker.md)