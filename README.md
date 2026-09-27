# 🚀 JobPortal API

<div align="center">

### A Secure REST API for Connecting Opportunities with Talent

A **Java 17 + Spring Boot** backend for managing users, job listings, job applications, authentication, and role-based access.

<br>

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge\&logo=openjdk\&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-6DB33F?style=for-the-badge\&logo=springboot\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-42.7.3-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-JWT-6DB33F?style=for-the-badge\&logo=springsecurity\&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-Build-C71A36?style=for-the-badge\&logo=apachemaven\&logoColor=white)

</div>

---

## 📌 Overview

**JobPortal API** is a backend REST API developed using **Java 17 and Spring Boot 3**.

The application provides APIs for:

* 👤 User registration and authentication
* 🔐 JWT-based security
* 🛡️ Role-based access
* 💼 Job creation and discovery
* 📄 Job applications
* 🔄 Application status management
* 🗄️ PostgreSQL persistence

The project follows a **layered architecture** separating REST controllers, business logic, data access, security, DTOs, and exception handling.

> **Backend-focused project:** This repository documents and demonstrates the Spring Boot REST API implementation.

---

# ✨ Features

### 🔐 Authentication & Security

* User registration and login
* JWT-based stateless authentication
* Spring Security integration
* Password encryption using BCrypt
* Role-based authorization
* JWT request filtering using a custom security filter

### 💼 Job Management

* Create job listings
* Retrieve individual job details
* Retrieve paginated job listings
* Search jobs by title
* Support for configurable page size and page number

### 📄 Application Management

* Apply for jobs
* Store cover letter and resume URL
* Retrieve applications for a specific job
* Retrieve applications submitted by a user
* Update application status

### 🧩 Backend Engineering

* Layered architecture
* DTO-based API communication
* Spring Data JPA repositories
* Centralized exception handling
* Jakarta Bean Validation
* Lombok for reducing boilerplate
* Maven-based build and dependency management

---

# 🛠️ Tech Stack

| Category           | Technology                                             |
| ------------------ | ------------------------------------------------------ |
| **Language**       | Java 17                                                |
| **Framework**      | Spring Boot 3.5.6                                      |
| **Web**            | Spring Web / REST APIs                                 |
| **Security**       | Spring Security                                        |
| **Authentication** | JSON Web Token (JWT)                                   |
| **JWT Library**    | JJWT 0.11.5                                            |
| **Persistence**    | Spring Data JPA                                        |
| **ORM**            | Hibernate                                              |
| **Database**       | PostgreSQL                                             |
| **Validation**     | Jakarta Bean Validation                                |
| **Build Tool**     | Maven                                                  |
| **Utilities**      | Lombok                                                 |
| **Testing**        | Spring Boot Test, Spring Security Test, Testcontainers |

---

# 🏗️ Architecture

The application follows a traditional **layered Spring Boot architecture**.

```text
                         ┌─────────────────────┐
                         │      REST Client    │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Controller      │
                         │   REST Endpoints    │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Service        │
                         │   Business Logic    │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Repository      │
                         │   Spring Data JPA   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     PostgreSQL      │
                         └─────────────────────┘
```

For secured APIs, requests additionally pass through the JWT security layer:

```text
Client
  │
  │ Authorization: Bearer <JWT>
  ▼
JWTFilter
  │
  ▼
Spring Security
  │
  ▼
Controller
  │
  ▼
Service
  │
  ▼
Repository
  │
  ▼
PostgreSQL
```

---

# 🔐 Authentication Flow

```text
┌──────────────┐
│    Client    │
└──────┬───────┘
       │
       │ Login
       ▼
┌──────────────────┐
│  AuthController  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    AuthService   │
└────────┬─────────┘
         │
         │ Validate credentials
         ▼
┌──────────────────┐
│   JWT Generator  │
└────────┬─────────┘
         │
         │ JWT Token
         ▼
┌──────────────┐
│    Client    │
└──────┬───────┘
       │
       │ Authorization: Bearer <JWT>
       ▼
┌──────────────────┐
│     JWTFilter    │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ Spring Security  │
└────────┬─────────┘
         ▼
    Protected API
```

---

# 👥 Roles

The application supports three roles:

| Role         | Purpose                                     |
| ------------ | ------------------------------------------- |
| `JOB_SEEKER` | Browse jobs and submit applications         |
| `COMPANY`    | Create job listings and manage applications |
| `ADMIN`      | Administrative role                         |

---

# 🌐 REST API

Base URL:

```text
http://localhost:8080
```

## Authentication

| Method | Endpoint           | Description                       | Access |
| ------ | ------------------ | --------------------------------- | ------ |
| `POST` | `/api/auth/signup` | Register a new user               | Public |
| `POST` | `/api/auth/login`  | Authenticate user and receive JWT | Public |

---

## Job APIs

| Method | Endpoint         | Description             | Access        |
| ------ | ---------------- | ----------------------- | ------------- |
| `GET`  | `/api/jobs`      | Retrieve paginated jobs | Public        |
| `GET`  | `/api/jobs/{id}` | Retrieve job by ID      | Public        |
| `POST` | `/api/jobs`      | Create a job listing    | Authenticated |

### Job Search & Pagination

The job listing endpoint supports:

* `title`
* `page`
* `size`

Example:

```http
GET /api/jobs?title=developer&page=0&size=10
```

---

## Application APIs

| Method | Endpoint                          | Description                      |
| ------ | --------------------------------- | -------------------------------- |
| `POST` | `/api/applications/apply`         | Submit a job application         |
| `GET`  | `/api/applications/job/{jobId}`   | Retrieve applications for a job  |
| `GET`  | `/api/applications/user/{userId}` | Retrieve applications for a user |
| `PUT`  | `/api/applications/{id}/status`   | Update application status        |

---

## 🔑 JWT Authorization

Protected endpoints expect the JWT token in the request header:

```http
Authorization: Bearer <jwt-token>
```

Example:

```http
GET /api/jobs
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

---

# 🗄️ Data Model

The core domain consists of three primary entities:

```text
┌──────────────┐
│     User     │
│──────────────│
│ id           │
│ username     │
│ email        │
│ password     │
│ role         │
└──────┬───────┘
       │
       │ submits
       ▼
┌──────────────────┐
│   Application    │
│──────────────────│
│ id               │
│ user             │
│ job              │
│ coverLetter      │
│ resumeUrl        │
│ status           │
│ submittedAt      │
└────────┬─────────┘
         │
         │ belongs to
         ▼
┌──────────────────┐
│       Job        │
│──────────────────│
│ id               │
│ title            │
│ job details      │
│ company          │
└──────────────────┘
```

### Application Status

Applications can move through statuses such as:

```text
APPLIED
   │
   ▼
SHORTLISTED
   │
   ├──────────────► REJECTED
   │
   └──────────────► HIRED
```

---

# 📂 Project Structure

```text
src/
│
├── main/
│   │
│   ├── java/com/example/jobportal/
│   │
│   ├── config/
│   │   └── AppConfig.java
│   │
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── JobController.java
│   │   └── ApplicationController.java
│   │
│   ├── dto/
│   │   ├── AuthRequest.java
│   │   ├── AuthResponse.java
│   │   ├── RegisterRequest.java
│   │   ├── JobRequestDTO.java
│   │   └── JobResponseDTO.java
│   │
│   ├── exception/
│   │   └── GlobalExceptionHandler.java
│   │
│   ├── model/
│   │   ├── User.java
│   │   ├── Job.java
│   │   ├── Application.java
│   │   └── Role.java
│   │
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── JobRepository.java
│   │   └── ApplicationRepository.java
│   │
│   ├── security/
│   │   ├── JWTFilter.java
│   │   ├── JWTUtil.java
│   │   └── SecurityConfig.java
│   │
│   └── service/
│       ├── AuthService.java
│       ├── JobService.java
│       └── ApplicationService.java
│
├── main/resources/
│   └── application.properties
│
└── test/
    └── Spring Boot test classes
```

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have:

* **JDK 17+**
* **PostgreSQL**
* **Git**
* Maven Wrapper included in the project

---

## 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd job-portal-spring-boot
```

---

## 2️⃣ Create PostgreSQL Database

Create a database named:

```sql
CREATE DATABASE jobportal;
```

---

## 3️⃣ Configure Database

Update:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/jobportal
spring.datasource.username=postgres
spring.datasource.password=your-local-password

spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

Configure the JWT settings with your own local secret:

```properties
jwt.secret=your-local-secret
jwt.expirationMs=3600000
```

> ⚠️ Never commit real database passwords or JWT signing secrets to a public repository.

---

## 4️⃣ Run the Application

### Windows

```powershell
.\mvnw.cmd spring-boot:run
```

### Linux / macOS

```bash
./mvnw spring-boot:run
```

The API will be available at:

```text
http://localhost:8080
```

---

# 🧪 Testing

The project includes Spring Boot testing support along with:

* Spring Boot Test
* Spring Security Test
* Testcontainers
* JUnit

Run the test suite using:

### Windows

```powershell
.\mvnw.cmd test
```

### Linux / macOS

```bash
./mvnw test
```

---

# 🧠 Backend Concepts Demonstrated

This project demonstrates practical implementation of:

* Java 17
* Spring Boot application development
* REST API design
* Layered architecture
* Spring Security
* JWT authentication
* Role-based authorization
* Spring Data JPA
* Hibernate ORM
* PostgreSQL integration
* DTO pattern
* Repository pattern
* Service layer
* Request validation
* Centralized exception handling
* Pagination
* Maven dependency management
* Unit/integration testing setup

---

# 🔒 Security Considerations

* Passwords are stored using BCrypt-based password encoding.
* JWTs provide stateless authentication for protected APIs.
* Spring Security manages authentication and authorization.
* Database credentials and JWT signing secrets should remain outside source control when deploying to shared or production environments.

---

# 🚀 Future Enhancements

Potential improvements include:

* 📖 Swagger / OpenAPI API documentation
* 🔎 Advanced job filtering and sorting
* 📑 Improved application validation
* 🗃️ Database migration using Flyway or Liquibase
* 🐳 Docker support
* ☁️ Cloud deployment
* 🔄 CI/CD pipeline
* 📊 Admin dashboard APIs
* 📨 Email notifications

---

# 👩‍💻 Author

### Rohini Girish Navade

**Java Backend Developer**

`Java` • `Spring Boot` • `REST APIs` • `Spring Security` • `SQL` • `PostgreSQL`

---

<div align="center">

### ⭐ If you find this project useful, feel free to explore the code and give it a star!

</div>
