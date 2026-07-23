# Deep Skilling Exercises

This repository contains hands-on exercises across **Data Structures & Algorithms**, **Design Patterns**, **PL/SQL**, **JUnit/Mockito/SLF4J**, **Spring Core**, **Angular**, and **React**.

## Folder Structure

```
├── DATA STRUCTURES & ALGORITHMS/       # Java DSA (7 exercises)
├── DESIGN PATTERNS AND PRINCIPLES/     # Java Design Patterns (11 patterns)
├── PLSQL/                              # Oracle PL/SQL (7 exercises)
├── JUnit, Mockito and SL4J/            # Java Testing (7 projects)
├── Spring Core and Maven/              # Spring Core & Maven (2 projects)
├── angular/                            # Angular Student Course Portal
├── react/                              # React JS Hands-On Labs (19 labs)
│   ├── lab1-myfirstreact/              # React Setup
│   ├── lab2-StudentApp/                # Class Components
│   ├── lab3-scorecalculatorapp/        # Functional Components & Props
│   ├── lab4-blogapp/                   # Lifecycle Methods & Fetch API
│   ├── lab5-stylingapp/                # CSS Modules & Conditional Styling
│   ├── lab6-TrainersApp/               # React Router
│   ├── lab7-shoppingapp/               # Props & Default Props
│   ├── lab8-counterapp/                # State & setState
│   ├── lab9-cricketapp/                # ES6 Features
│   ├── lab10-officespacerentalapp/     # JSX & Inline CSS
│   ├── lab11-eventexamplesapp/         # Event Handling
│   ├── lab12-ticketbookingapp/         # Conditional Rendering
│   ├── lab13-bloggerapp/               # Lists & Keys
│   ├── lab14-employeeapp/              # Context API
│   ├── lab15-ticketraisingapp/         # Controlled Forms
│   ├── lab16-mailregisterapp/          # Form Validation
│   ├── lab17-fetchuserapp/             # Fetch API & Async/Await
│   ├── lab18-cohortdetailstesting/     # Unit Testing (Jest)
│   └── lab19-gitclientapp/             # Mocking & Jest
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
