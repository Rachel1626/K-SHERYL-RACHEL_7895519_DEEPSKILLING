# Deep Skilling Exercises

This repository contains hands-on exercises across **Data Structures & Algorithms**, **Design Patterns**, **PL/SQL**, **JUnit/Mockito/SLF4J**, **Spring Core**, **Angular**, **React**, and **Microservices**.

## Folder Structure

```
├── DATA STRUCTURES & ALGORITHMS/       # Java DSA (7 exercises)
├── DESIGN PATTERNS AND PRINCIPLES/     # Java Design Patterns (11 patterns)
├── PLSQL/                              # Oracle PL/SQL (7 exercises)
├── JUnit, Mockito and SL4J/            # Java Testing (7 projects)
├── Spring Core and Maven/              # Spring Core & Maven (2 projects)
├── angular/                            # Angular Student Course Portal
├── react/                              # React JS Hands-On Labs (19 labs)
├── Microservices/                      # Microservices with Spring Boot 3 (22 exercises)
├── .gitignore
└── README.md
```

## How to Run

### Java (DSA & Design Patterns)
```bash
cd "FOLDER_NAME/ExerciseName/src"
javac *.java && java MainClass
```

### PL/SQL
Run in order: `schema.sql` → `sample_data.sql` → exercise file.

### JUnit, Mockito & SLF4J
```bash
cd "JUnit, Mockito and SL4J/ProjectName"
mvn test
```

### Spring Core and Maven
```bash
cd "Spring Core and Maven/ProjectName"
mvn compile exec:java
```

### React
```bash
cd react/lab<NUMBER>-<name>
npm install
npm start
```

### Angular
```bash
cd angular
npm install
ng serve
```

### Microservices
```bash
cd Microservices/eureka-server && mvn spring-boot:run
cd Microservices/account-service && mvn spring-boot:run
cd Microservices/api-gateway && mvn spring-boot:run
```

See `Microservices/README.md` for complete guide.
