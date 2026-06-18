# WEEK 1 - Deep Skilling Exercises

This repository contains exercises across three domains: **Data Structures & Algorithms**, **Design Patterns**, and **PL/SQL**.

## Folder Structure

```
WEEK 1/
├── DATA STRUCTURES & ALGORITHMS/       # Java DSA exercises (7 exercises)
│   ├── Exercise1_Inventory/            # Inventory Management (HashMap)
│   ├── Exercise2_Search/               # Linear & Binary Search
│   ├── Exercise3_Sorting/              # Bubble Sort & Quick Sort
│   ├── Exercise4_Employee/             # Array-based Employee Management
│   ├── Exercise5_Tasks/                # Singly Linked List Task Manager
│   ├── Exercise6_Library/              # Library Book Search
│   └── Exercise7_Forecasting/          # Recursive Financial Forecasting
│
├── DESIGN PATTERNS AND PRINCIPLES/     # Java Design Patterns (11 patterns)
│   ├── AdapterPatternExample/          # Adapter Pattern (Payment Gateways)
│   ├── BuilderPatternExample/          # Builder Pattern (Computer config)
│   ├── CommandPatternExample/          # Command Pattern (Remote Control)
│   ├── DecoratorPatternExample/        # Decorator Pattern (Notifiers)
│   ├── DependencyInjectionExample/     # Dependency Injection (Customer Repo)
│   ├── FactoryMethodPatternExample/    # Factory Method (Document Export)
│   ├── MVCPatternExample/              # MVC Pattern (Student Management)
│   ├── ObserverPatternExample/         # Observer Pattern (Stock Market)
│   ├── ProxyPatternExample/            # Proxy Pattern (Image Loading)
│   ├── SingletonPatternExample/        # Singleton Pattern (Logger)
│   └── StrategyPatternExample/         # Strategy Pattern (Payment Methods)
│
├── PLSQL/                              # Oracle PL/SQL exercises (7 exercises)
│   ├── schema.sql                      # Database schema (5 tables)
│   ├── sample_data.sql                 # Sample data inserts
│   ├── Exercise1_ControlStructures.sql # Loops, conditions, VIP flags
│   ├── Exercise2_ErrorHandling.sql     # Exception handling procedures
│   ├── Exercise3_StoredProcedures.sql  # Monthly interest, bonuses, transfers
│   ├── Exercise4_Functions.sql         # Age calc, loan installment, balance check
│   ├── Exercise5_Triggers.sql          # Audit logs, validation triggers
│   ├── Exercise6_Cursors.sql           # Monthly statements, annual fees
│   └── Exercise7_Packages.sql          # Customer, Employee, Account packages
│
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
Run the scripts in order in any Oracle SQL environment:
1. `schema.sql` - Create tables
2. `sample_data.sql` - Insert sample data
3. Any exercise file as needed
