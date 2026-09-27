# 🚀 Job Portal – Spring Boot REST API

A **backend-focused Job Portal REST API** built using **Java 17 and Spring Boot**, implementing secure authentication, role-based authorization, job management, and job application workflows.

The project follows a layered architecture with separate **Controller, Service, Repository, DTO, Security, and Exception Handling** layers.

---

## 🛠️ Tech Stack

| Technology         | Usage                          |
| ------------------ | ------------------------------ |
| ☕ Java 17          | Backend development            |
| 🌱 Spring Boot     | Application framework          |
| 🔐 Spring Security | Authentication & authorization |
| 🎟️ JWT            | Stateless authentication       |
| 🗄️ PostgreSQL     | Relational database            |
| 🧩 Spring Data JPA | Database access                |
| 🛢️ Hibernate      | ORM                            |
| 🌐 REST APIs       | Client-server communication    |
| 📦 Maven           | Build & dependency management  |

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Secure REST endpoints using Spring Security
* Role-based access control
* Supported roles:

  * `JOB_SEEKER`
  * `COMPANY`
  * `ADMIN`

### 💼 Job Management

* Create job postings
* View available jobs
* Manage job-related information
* DTO-based request and response handling

### 📄 Job Applications

* Job seekers can apply for jobs
* Users can view their applications
* Companies can view applicants for their posted jobs

### 🛡️ Exception Handling

* Centralized exception handling
* Consistent API error responses
* Custom `GlobalExceptionHandler`

---

## 🏗️ Backend Architecture

The application follows a layered Spring Boot architecture:

```text
src/main/java/com/example/jobportal
│
├── config
│   └── Application configuration
│
├── controller
│   ├── AuthController
│   ├── JobController
│   └── ApplicationController
│
├── dto
│   ├── AuthRequest
│   ├── AuthResponse
│   ├── RegisterRequest
│   ├── JobRequestDTO
│   └── JobResponseDTO
│
├── exception
│   └── GlobalExceptionHandler
│
├── model
│   ├── User
│   ├── Job
│   ├── Application
│   └── Role
│
├── repository
│   ├── UserRepository
│   ├── JobRepository
│   └── ApplicationRepository
│
├── security
│   ├── JWTFilter
│   ├── JWTUtil
│   └── SecurityConfig
│
└── service
    ├── AuthService
    ├── JobService
    └── ApplicationService
```

### 🔄 Request Flow

```text
Client
   ↓
REST Controller
   ↓
DTO / Validation
   ↓
Service Layer
   ↓
Repository Layer
   ↓
PostgreSQL
```

For secured requests:

```text
Client
   ↓
JWT Token
   ↓
JWTFilter
   ↓
Spring Security
   ↓
Controller
   ↓
Service
   ↓
Repository
```

---

## 🔑 Authentication Flow

```text
Register / Login
       ↓
   AuthController
       ↓
    AuthService
       ↓
 Validate User
       ↓
 Generate JWT
       ↓
 Return Token
       ↓
Client sends JWT with subsequent requests
       ↓
    JWTFilter
       ↓
 Spring Security
       ↓
 Protected API
```

---

## 🗄️ Database

The application uses **PostgreSQL** with **Spring Data JPA / Hibernate**.

Main entities include:

```text
User
  │
  ├── Role
  │
  └── Applications

Job
  │
  └── Applications

Application
  ├── User
  └── Job
```

---

## ⚙️ Configuration

Database configuration is maintained in:

```text
src/main/resources/application.properties
```

Example local configuration:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/jobportal
spring.datasource.username=postgres
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

> Configure your local PostgreSQL credentials before running the application.

---

## ▶️ Running the Application

### 1. Clone the repository

```bash
git clone <repository-url>
cd job-portal-spring-boot
```

### 2. Create PostgreSQL database

Create a database named:

```text
jobportal
```

### 3. Configure database credentials

Update:

```text
src/main/resources/application.properties
```

with your local PostgreSQL username and password.

### 4. Run the application

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Or using Maven:

```bash
mvn spring-boot:run
```

The application runs on:

```text
http://localhost:8080
```

---

## 🧪 Testing

The project contains Spring Boot test classes under:

```text
src/test
```

Tests can be executed using:

```bash
mvn test
```

or on Windows:

```powershell
.\mvnw.cmd test
```

---

## 📌 Project Highlights

* ✅ Java 17 backend
* ✅ Spring Boot REST API development
* ✅ JWT-based authentication
* ✅ Spring Security
* ✅ Role-based authorization
* ✅ Spring Data JPA / Hibernate
* ✅ PostgreSQL database integration
* ✅ Layered architecture
* ✅ DTO-based API design
* ✅ Centralized exception handling
* ✅ Maven build management
* ✅ Unit/integration test structure

---

## 👩‍💻 Author

**Rohini Girish Navade**

Java Backend Developer | Spring Boot | REST APIs | SQL
