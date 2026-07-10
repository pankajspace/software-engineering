[<- Java DB](java-db-quick.md)

# Spring Framework Basics

The **Java Spring Framework** is a powerful, lightweight, and popular framework for building enterprise-grade applications. It provides comprehensive infrastructure support for developing Java applications. Spring is widely used for its emphasis on modularity, dependency injection, and aspect-oriented programming, which facilitate the development of robust, maintainable, and scalable applications.

---

## Key Features of Spring Framework

### 1. **Inversion of Control (IoC) and Dependency Injection (DI)**
- **IoC** allows the framework to manage the lifecycle and dependencies of objects, reducing the need for manual instantiation and wiring.
- **Dependency Injection (DI)** is the process of injecting dependencies into objects. This promotes loose coupling.

**Example of DI using annotations:**
```java
@Component
public class ServiceA {
    public void serve() {
        System.out.println("ServiceA is serving...");
    }
}

@Component
public class Client {
    private final ServiceA serviceA;

    @Autowired
    public Client(ServiceA serviceA) {
        this.serviceA = serviceA;
    }

    public void performTask() {
        serviceA.serve();
    }
}
```

---

### 2. **Aspect-Oriented Programming (AOP)**
AOP separates cross-cutting concerns (like logging, transaction management, and security) from the application's business logic, improving modularity.

**Example: Logging with AOP:**
```java
@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBeforeMethod(JoinPoint joinPoint) {
        System.out.println("Method called: " + joinPoint.getSignature().getName());
    }
}
```

---

### 3. **Spring MVC**
Spring MVC is a framework for building web applications. It follows the **Model-View-Controller** design pattern.

- **Model**: Represents the application's data.
- **View**: Renders the user interface.
- **Controller**: Handles user requests, interacts with the model, and returns a response.

**Example of Spring MVC Controller:**
```java
@Controller
public class HelloController {
    @GetMapping("/hello")
    public String sayHello(Model model) {
        model.addAttribute("message", "Hello, Spring!");
        return "hello"; // Refers to hello.html in templates
    }
}
```

---

### 4. **Spring Boot**
Spring Boot is an extension of Spring that simplifies the configuration and development of Spring applications by providing:
- Embedded servers (like Tomcat or Jetty)
- Auto-configuration
- Production-ready features (e.g., health checks, metrics)
  
**Minimal Spring Boot Application:**
```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

---

### 5. **Data Access with Spring Data**
Spring simplifies interaction with databases using:
- **Spring Data JPA** for object-relational mapping (ORM).
- **JdbcTemplate** for direct SQL queries.

**Spring Data JPA Repository Example:**
```java
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByName(String name);
}
```

---

### 6. **Spring Security**
Spring Security provides authentication, authorization, and protection against common vulnerabilities (like CSRF, XSS).

**Configuring Security:**
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/public").permitAll()
                .anyRequest().authenticated()
            .and()
            .formLogin();
    }
}
```

---

### 7. **Spring Transactions**
Spring supports declarative transaction management to ensure data consistency.

**Transaction Management Example:**
```java
@Service
public class AccountService {
    @Transactional
    public void transferMoney(long fromAccountId, long toAccountId, double amount) {
        accountRepository.debit(fromAccountId, amount);
        accountRepository.credit(toAccountId, amount);
    }
}
```

---

### 8. **Spring Cloud**
Spring Cloud extends Spring Boot to build distributed systems and microservices. It provides features like:
- Service discovery (Eureka)
- Load balancing (Ribbon)
- API Gateway (Zuul or Spring Cloud Gateway)
- Distributed tracing (Sleuth, Zipkin)

---

### 9. **Spring Batch**
Spring Batch is used for batch processing tasks, like ETL (Extract, Transform, Load) jobs.

**Spring Batch Configuration:**
```java
@Configuration
@EnableBatchProcessing
public class BatchConfig {
    @Bean
    public Job job(JobBuilderFactory jobBuilderFactory, Step step) {
        return jobBuilderFactory.get("myJob")
                .start(step)
                .build();
    }

    @Bean
    public Step step(StepBuilderFactory stepBuilderFactory, ItemReader<String> reader,
                     ItemProcessor<String, String> processor, ItemWriter<String> writer) {
        return stepBuilderFactory.get("myStep")
                .<String, String>chunk(10)
                .reader(reader)
                .processor(processor)
                .writer(writer)
                .build();
    }
}
```

---

### 10. **Testing with Spring**
Spring provides testing support with:
- **Spring TestContext Framework**: For loading Spring context during tests.
- **MockMvc**: For testing Spring MVC controllers.

**Example Test Case:**
```java
@SpringBootTest
@AutoConfigureMockMvc
public class HelloControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testHelloEndpoint() throws Exception {
        mockMvc.perform(get("/hello"))
               .andExpect(status().isOk())
               .andExpect(content().string(containsString("Hello, Spring!")));
    }
}
```

---

## Advantages of Spring Framework

1. **Modularity and Reusability**: Encourages modular design and reusable components.
2. **Loose Coupling**: Dependency injection reduces coupling between components.
3. **Flexibility**: Can be used for monolithic, microservices, and cloud-based architectures.
4. **Community Support**: Extensive community and library ecosystem.
5. **Integration**: Works seamlessly with various technologies (e.g., databases, messaging systems).

---

## Disadvantages of Spring Framework

1. **Learning Curve**: Complex for beginners due to its vast ecosystem.
2. **Configuration Overhead**: Despite Spring Boot's simplicity, advanced configurations can be tedious.
3. **Performance**: Reflection-based DI and AOP can add slight performance overhead.

---

## Use Cases of Spring Framework

1. **Web Applications**: E.g., e-commerce websites, blogs.
2. **REST APIs**: For microservices or backend services.
3. **Enterprise Applications**: E.g., banking systems, ERP systems.
4. **Cloud-Native Applications**: With Spring Cloud for distributed architectures.
5. **Batch Processing**: For processing large datasets (e.g., payroll systems).

---

## Spring Framework Modules

| **Module**         | **Description**                                          |
| ------------------ | -------------------------------------------------------- |
| Core Container     | IoC and DI functionality.                                |
| Spring MVC         | Web application development.                             |
| Spring Data        | Data access and persistence (JPA, MongoDB, Redis, etc.). |
| Spring Security    | Authentication, authorization, and protection.           |
| Spring Boot        | Simplifies Spring application development.               |
| Spring Cloud       | Tools for building distributed and cloud-based systems.  |
| Spring Batch       | Batch processing framework.                              |
| Spring Integration | Message-based architecture.                              |

---

The **Spring Framework** is a versatile and essential tool for Java developers, enabling the creation of robust and scalable applications across various domains. Its rich feature set and ecosystem make it suitable for both small and large-scale projects.

---

[<- Java DB](java-db-quick.md)
