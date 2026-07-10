[<- MERN](mern-quick.md)

## Links
1. [NestJS Crash Course YT TNN](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jZIVqmy_QhfQdi6mzQvJnT)
2. [NestJS Tasks GH](https://github.com/pankajspace/nestjs-tasks)

## NestJS Quick Revision

NestJS is a versatile, modular framework built on Node.js, offering a structured way to develop scalable and maintainable server-side applications. It is heavily inspired by Angular, using TypeScript and decorators to define key components like controllers, services, and modules. Here’s a breakdown of the main concepts in a NestJS project, along with examples to clarify how they fit together.

### 1. **Modules**

In NestJS, **modules** are the basic building blocks of a project. A module encapsulates a portion of the application, grouping together components like controllers, services, and providers that are related to each other.

#### Example:

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],  // Other modules can be imported here
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

In this example:
- **AppModule** is the root module.
- **UserModule** is another module imported into **AppModule**.

### 2. **Controllers**

Controllers handle incoming HTTP requests and define routes for your application. They are responsible for receiving requests, delegating tasks to the appropriate service, and returning responses.

#### Example:

```typescript
// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Defines the base route for this controller (e.g., '/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // This defines a GET route at the base URL (e.g., '/')
  getHello(): string {
    return this.appService.getHello();
  }
}
```

In this example:
- **AppController** has one route (`GET /`) that calls the **AppService** method to return a response.

### 3. **Services**

Services encapsulate the business logic of your application and can be injected into controllers or other services. They are typically where you handle data, make API calls, or perform complex calculations.

#### Example:

```typescript
// app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable() // Marks this class as a provider to be injected into other components
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

In this example, **AppService** is a simple service that returns a string and is injected into **AppController**.

### 4. **Dependency Injection (DI)**

NestJS uses **dependency injection** to manage the creation and sharing of services. This is done through the constructor of classes.

#### Example:

```typescript
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // The AppService is injected here via the constructor
}
```

NestJS automatically instantiates and injects the necessary dependencies (e.g., **AppService**) when creating an instance of **AppController**.

### 5. **Routing**

Routing in NestJS is built into the controller. Each controller defines the routes it handles using decorators like `@Get()`, `@Post()`, `@Put()`, etc.

#### Example:

```typescript
@Controller('users') // Base path for this controller
export class UserController {
  @Get() // Route is '/users'
  getUsers() {
    return ['User1', 'User2'];
  }

  @Get(':id') // Dynamic route '/users/:id'
  getUser(@Param('id') id: string) {
    return `User ${id}`;
  }
}
```

In this example:
- **UserController** handles requests to `/users` and `/users/:id` using the `@Get()` decorator.

### 6. **Providers**

A provider is any class that can be injected as a dependency. This includes services, but it can also be other classes like repositories or factories.

- **Services** are the most common type of provider, as shown in the **AppService** example.
  
Providers are registered in the `providers` array of a module.

#### Example:

```typescript
@Module({
  providers: [AppService],  // AppService is registered as a provider
})
export class AppModule {}
```

### 7. **Middleware**

Middleware is a function that can modify the request/response objects or terminate the request/response cycle before passing control to the next handler.

#### Example:

```typescript
// logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request made to:', req.url);
    next(); // Pass control to the next middleware or handler
  }
}

// app.module.ts (Applying Middleware)
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // Apply to all routes
  }
}
```

### 8. **Pipes**

Pipes transform or validate data before it is processed by the route handler. They are executed after middleware and before the handler is invoked.

#### Example:

```typescript
// parse-int.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}

// app.controller.ts (Using the Pipe)
import { Controller, Get, Param } from '@nestjs/common';
import { ParseIntPipe } from './parse-int.pipe';

@Controller('users')
export class UserController {
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return `User ID: ${id}`;
  }
}
```

Here, the `ParseIntPipe` ensures that the `id` parameter is a valid integer before it reaches the handler.

### 9. **Guards**

Guards are used to control access to routes, often for authentication and authorization purposes. They return `true` if the request can proceed or `false` to deny it.

#### Example:

```typescript
// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.headers.authorization === 'secret'; // Simple authorization logic
  }
}

// app.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('protected')
@UseGuards(AuthGuard) // Apply the AuthGuard
export class ProtectedController {
  @Get()
  getProtectedData() {
    return 'This is protected data';
  }
}
```

### 10. **Interceptors**

Interceptors can be used to transform data or modify the response before sending it to the client. They also allow logging, caching, or modifying error responses.

#### Example:

```typescript
// logging.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}

// app.controller.ts
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';

@Controller('logs')
@UseInterceptors(LoggingInterceptor) // Apply the LoggingInterceptor
export class LogsController {
  @Get()
  getLogs() {
    return 'Check the logs for timings';
  }
}
```

### 11. **Exception Filters**

Exception filters handle errors and return custom responses when exceptions are thrown in route handlers or services.

#### Example:

```typescript
// http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

// app.controller.ts
import { Controller, Get, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller('error')
@UseFilters(HttpExceptionFilter)
export class ErrorController {
  @Get()
  throwError() {
    throw new HttpException('Forbidden', 403); // Throws a 403 error
  }
}
```

### 12. **Asynchronous Operations**

NestJS supports asynchronous programming with both Promises and Observables. You can

 use `async`/`await` or RxJS Observables to handle async data.

#### Example (Promise):

```typescript
@Controller('async')
export class AsyncController {
  @Get()
  async getData(): Promise<string> {
    const data = await this.fetchData();
    return `Fetched Data: ${data}`;
  }

  async fetchData(): Promise<string> {
    return new Promise(resolve => setTimeout(() => resolve('Hello from async!'), 1000));
  }
}
```

### 13. **API Routes**

NestJS allows you to create API endpoints using controllers. This makes it perfect for building RESTful APIs.

#### Example:

```typescript
// user.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('api/users')
export class UserController {
  @Get()
  getAllUsers() {
    return [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
  }

  @Post()
  createUser(@Body() user) {
    return { message: 'User created', user };
  }
}
```

### Summary

In a typical NestJS project:
- **Modules** group related controllers and providers.
- **Controllers** define routes and handle incoming HTTP requests.
- **Services** handle business logic and can be injected into controllers.
- **Providers**, such as services, are used throughout the application.
- **Middleware**, **Guards**, **Interceptors**, **Pipes**, and **Exception Filters** are additional mechanisms to modify or handle requests and responses.

---

[<- MERN](mern-quick.md)
