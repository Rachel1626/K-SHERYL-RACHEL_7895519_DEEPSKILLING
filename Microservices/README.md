# Microservices Exercises - Complete Project

## Project Structure (19 services)

| # | Project | Exercises | Port | Description |
|---|---------|-----------|------|-------------|
| 1 | account-service | 1, 4 | 8080 | Account REST API + Eureka Client |
| 2 | loan-service | 2, 5 | 8081 | Loan REST API + Eureka Client |
| 3 | eureka-server | 3, 7 | 8761 | Eureka Discovery Server |
| 4 | greet-service | 6, 8 | 8082 | Greet "Hello World!!" + Eureka Client |
| 5 | api-gateway | 9, 10, 11, 12 | 9090 | Spring Cloud Gateway + Logging Filter |
| 6 | user-service | 13 | 8083 | User Management REST API |
| 7 | order-service | 13 | 8084 | Order Management (OpenFeign) |
| 8 | product-service | 14 | 8085 | Product Service (Config Client) |
| 9 | inventory-service | 14 | 8086 | Inventory Service (Config Client) |
| 10 | config-server | 14 | 8888 | Spring Cloud Config Server |
| 11 | customer-service | 15 | 8087 | Customer Service |
| 12 | billing-service | 15 | 8088 | Billing Service |
| 13 | customer-billing-gateway | 15 | 9091 | Gateway (Rate Limiting, Caching, Rewriting) |
| 14 | payment-service | 16 | 8089 | Payment + Resilience4j Circuit Breaker |
| 15 | edge-service | 17 | 9092 | Edge Service (Routing + Logging) |
| 16 | load-balancer-gateway | 18 | 9093 | Gateway + Random Load Balancer |
| 17 | resilience-gateway | 19 | 9094 | Gateway + Circuit Breaker + Time Limiter |
| 18 | auth-server | 20, 21 | 9000 | OAuth2 Authorization Server |
| 19 | resource-server | 21, 22 | 9001 | OAuth2/JWT Resource Server |

## Technology Stack

- **Java 17+** (runs on Java 23)
- **Spring Boot 3.2.5**
- **Spring Cloud 2023.0.1**
- **Resilience4j** (Circuit Breaker)
- **Spring Cloud Gateway** (API Gateway)
- **Netflix Eureka** (Service Discovery)
- **Spring Cloud Config** (External Configuration)
- **Spring Authorization Server 1.2.1** (OAuth2/OIDC)
- **Spring Security OAuth2 Resource Server** (JWT)

## Prerequisites

- Java 17+ installed
- Maven installed (or use the bundled Maven 3.9.6)
- No external databases required (all in-memory data)

---

## How to Run

### Phase 1: Core Services (Exercises 1-12)

**Step 1 - Start Eureka Server:**
```bash
cd eureka-server
mvn spring-boot:run
```
Verify: http://localhost:8761

**Step 2 - Start Microservices:**
```bash
cd account-service && mvn spring-boot:run
cd loan-service && mvn spring-boot:run
cd greet-service && mvn spring-boot:run
```

**Step 3 - Verify Eureka Registration:**
Open http://localhost:8761 - all 3 services should appear.

**Step 4 - Start API Gateway:**
```bash
cd api-gateway && mvn spring-boot:run
```

**Step 5 - Test Through Gateway:**
```bash
curl http://localhost:9090/greet-service/greet
curl http://localhost:9090/ACCOUNT-SERVICE/accounts/12345
curl http://localhost:9090/LOAN-SERVICE/loans/67890
```

### Phase 2: User & Order Management (Exercise 13)

```bash
cd user-service && mvn spring-boot:run
cd order-service && mvn spring-boot:run
```

Test:
```bash
curl http://localhost:8083/users
curl http://localhost:8084/orders
curl http://localhost:8084/orders/1    # Calls User Service via Feign
```

### Phase 3: Inventory Management (Exercise 14)

```bash
cd config-server && mvn spring-boot:run
cd product-service && mvn spring-boot:run
cd inventory-service && mvn spring-boot:run
```

Test Config:
```bash
curl http://localhost:8888/product-service.properties
curl http://localhost:8085/products
curl http://localhost:8086/inventory
```

### Phase 4: Customer/Billing Gateway (Exercise 15)

```bash
cd customer-service && mvn spring-boot:run
cd billing-service && mvn spring-boot:run
cd customer-billing-gateway && mvn spring-boot:run
```

Test:
```bash
curl http://localhost:9091/api/customers
curl http://localhost:9091/api/billings
curl http://localhost:9091/api/billings/customer/1
```

### Phase 5: Circuit Breaker (Exercise 16)

```bash
cd payment-service && mvn spring-boot:run
```

Test:
```bash
curl -X POST http://localhost:8089/payments -H "Content-Type: application/json" -d '{"orderId":1,"amount":500,"paymentMethod":"CREDIT_CARD"}'
# Normal - returns SUCCESS
curl -X POST http://localhost:8089/payments -H "Content-Type: application/json" -d '{"orderId":1,"amount":50000,"paymentMethod":"CREDIT_CARD"}'
# Triggers fallback - returns FAILED - FALLBACK
```

### Phase 6: Edge Service (Exercise 17)

```bash
cd edge-service && mvn spring-boot:run
```

Test:
```bash
curl http://localhost:9092/health
curl http://localhost:9092/greet/greet
curl http://localhost:9092/account/accounts/12345
```

### Phase 7: Gateway Load Balancing (Exercise 18)

```bash
cd load-balancer-gateway && mvn spring-boot:run
```

Test:
```bash
curl http://localhost:9093/greet/greet
```

### Phase 8: Gateway Resilience (Exercise 19)

```bash
cd resilience-gateway && mvn spring-boot:run
```

### Phase 9: OAuth2/OIDC (Exercise 20)

```bash
cd auth-server && mvn spring-boot:run
```

Open: http://localhost:9000
Login: user / password

### Phase 10: Authorization & Resource Server (Exercise 21)

```bash
cd auth-server && mvn spring-boot:run
cd resource-server && mvn spring-boot:run
```

### Phase 11: JWT Authentication (Exercise 22)

```bash
# Get token
TOKEN=$(curl -s -u client-app:secret "http://localhost:9000/oauth2/token?grant_type=client_credentials&scope=read write" | python -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

# Access protected resource
curl -H "Authorization: Bearer $TOKEN" http://localhost:9001/api/user/profile
curl -H "Authorization: Bearer $TOKEN" http://localhost:9001/api/user/data
```

---

## API Endpoints Summary

### Account Service (8080)
- `GET /accounts/{number}` - Get account by number

### Loan Service (8081)
- `GET /loans/{number}` - Get loan by number

### Greet Service (8082)
- `GET /greet` - Returns {"message": "Hello World!!"}

### User Service (8083)
- `GET /users` - List all users
- `GET /users/{id}` - Get user by ID
- `POST /users` - Create user

### Order Service (8084)
- `GET /orders` - List all orders
- `GET /orders/{id}` - Get order (calls User Service via Feign)
- `POST /orders` - Create order

### Product Service (8085)
- `GET /products` - List all products
- `GET /products/{id}` - Get product
- `POST /products` - Create product

### Inventory Service (8086)
- `GET /inventory` - List inventory
- `GET /inventory/{productCode}` - Check stock
- `POST /inventory` - Add inventory

### Customer Service (8087)
- `GET /customers` - List customers
- `GET /customers/{id}` - Get customer
- `POST /customers` - Create customer

### Billing Service (8088)
- `GET /billings` - List billings
- `GET /billings/{id}` - Get billing
- `GET /billings/customer/{customerId}` - Billings by customer
- `POST /billings` - Create billing

### Payment Service (8089)
- `POST /payments` - Process payment (with Circuit Breaker)
- `GET /payments/{id}` - Get payment

### Resource Server (9001)
- `GET /api/public/info` - Public (no auth)
- `GET /api/user/profile` - User profile (JWT required)
- `GET /api/user/data` - User data (JWT required)
- `GET /api/admin/dashboard` - Admin only (JWT required)

---

## Port Reference

| Service | Port |
|---------|------|
| Eureka Server | 8761 |
| Config Server | 8888 |
| Account Service | 8080 |
| Loan Service | 8081 |
| Greet Service | 8082 |
| User Service | 8083 |
| Order Service | 8084 |
| Product Service | 8085 |
| Inventory Service | 8086 |
| Customer Service | 8087 |
| Billing Service | 8088 |
| Payment Service | 8089 |
| Auth Server | 9000 |
| Resource Server | 9001 |
| API Gateway | 9090 |
| Customer Billing Gateway | 9091 |
| Edge Service | 9092 |
| Load Balancer Gateway | 9093 |
| Resilience Gateway | 9094 |
