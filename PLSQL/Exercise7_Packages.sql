-- =============================================
-- Exercise 7: Packages
-- =============================================

-- Scenario 1: CustomerManagement package
CREATE OR REPLACE PACKAGE CustomerManagement AS
    PROCEDURE AddCustomer(
        p_customer_id IN Customers.CustomerID%TYPE,
        p_name        IN Customers.Name%TYPE,
        p_dob         IN Customers.DOB%TYPE,
        p_balance     IN Customers.Balance%TYPE
    );
    
    PROCEDURE UpdateCustomerDetails(
        p_customer_id IN Customers.CustomerID%TYPE,
        p_name        IN Customers.Name%TYPE DEFAULT NULL,
        p_dob         IN Customers.DOB%TYPE DEFAULT NULL
    );
    
    FUNCTION GetCustomerBalance(
        p_customer_id IN Customers.CustomerID%TYPE
    ) RETURN Customers.Balance%TYPE;
END CustomerManagement;
/

CREATE OR REPLACE PACKAGE BODY CustomerManagement AS
    
    PROCEDURE AddCustomer(
        p_customer_id IN Customers.CustomerID%TYPE,
        p_name        IN Customers.Name%TYPE,
        p_dob         IN Customers.DOB%TYPE,
        p_balance     IN Customers.Balance%TYPE
    ) IS
    BEGIN
        INSERT INTO Customers (CustomerID, Name, DOB, Balance, LastModified)
        VALUES (p_customer_id, p_name, p_dob, p_balance, SYSDATE);
        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Customer ' || p_name || ' added successfully.');
    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: Customer ID ' || p_customer_id || ' already exists.');
        WHEN OTHERS THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);
    END AddCustomer;
    
    PROCEDURE UpdateCustomerDetails(
        p_customer_id IN Customers.CustomerID%TYPE,
        p_name        IN Customers.Name%TYPE DEFAULT NULL,
        p_dob         IN Customers.DOB%TYPE DEFAULT NULL
    ) IS
    BEGIN
        UPDATE Customers
        SET Name = NVL(p_name, Name),
            DOB = NVL(p_dob, DOB),
            LastModified = SYSDATE
        WHERE CustomerID = p_customer_id;
        
        IF SQL%ROWCOUNT = 0 THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: Customer ID ' || p_customer_id || ' not found.');
        ELSE
            DBMS_OUTPUT.PUT_LINE('Customer ' || p_customer_id || ' updated.');
        END IF;
        COMMIT;
    END UpdateCustomerDetails;
    
    FUNCTION GetCustomerBalance(
        p_customer_id IN Customers.CustomerID%TYPE
    ) RETURN Customers.Balance%TYPE IS
        v_balance Customers.Balance%TYPE;
    BEGIN
        SELECT Balance INTO v_balance
        FROM Customers WHERE CustomerID = p_customer_id;
        RETURN v_balance;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: Customer ' || p_customer_id || ' not found.');
            RETURN NULL;
    END GetCustomerBalance;
    
END CustomerManagement;
/

-- Scenario 2: EmployeeManagement package
CREATE OR REPLACE PACKAGE EmployeeManagement AS
    PROCEDURE HireEmployee(
        p_employee_id IN Employees.EmployeeID%TYPE,
        p_name        IN Employees.Name%TYPE,
        p_position    IN Employees.Position%TYPE,
        p_salary      IN Employees.Salary%TYPE,
        p_department  IN Employees.Department%TYPE,
        p_hire_date   IN Employees.HireDate%TYPE
    );
    
    PROCEDURE UpdateEmployeeDetails(
        p_employee_id IN Employees.EmployeeID%TYPE,
        p_name        IN Employees.Name%TYPE DEFAULT NULL,
        p_position    IN Employees.Position%TYPE DEFAULT NULL,
        p_salary      IN Employees.Salary%TYPE DEFAULT NULL,
        p_department  IN Employees.Department%TYPE DEFAULT NULL
    );
    
    FUNCTION CalculateAnnualSalary(
        p_employee_id IN Employees.EmployeeID%TYPE
    ) RETURN NUMBER;
END EmployeeManagement;
/

CREATE OR REPLACE PACKAGE BODY EmployeeManagement AS
    
    PROCEDURE HireEmployee(
        p_employee_id IN Employees.EmployeeID%TYPE,
        p_name        IN Employees.Name%TYPE,
        p_position    IN Employees.Position%TYPE,
        p_salary      IN Employees.Salary%TYPE,
        p_department  IN Employees.Department%TYPE,
        p_hire_date   IN Employees.HireDate%TYPE
    ) IS
    BEGIN
        INSERT INTO Employees (EmployeeID, Name, Position, Salary, Department, HireDate)
        VALUES (p_employee_id, p_name, p_position, p_salary, p_department, p_hire_date);
        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Employee ' || p_name || ' hired successfully.');
    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: Employee ID ' || p_employee_id || ' already exists.');
        WHEN OTHERS THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);
    END HireEmployee;
    
    PROCEDURE UpdateEmployeeDetails(
        p_employee_id IN Employees.EmployeeID%TYPE,
        p_name        IN Employees.Name%TYPE DEFAULT NULL,
        p_position    IN Employees.Position%TYPE DEFAULT NULL,
        p_salary      IN Employees.Salary%TYPE DEFAULT NULL,
        p_department  IN Employees.Department%TYPE DEFAULT NULL
    ) IS
    BEGIN
        UPDATE Employees
        SET Name       = NVL(p_name, Name),
            Position   = NVL(p_position, Position),
            Salary     = NVL(p_salary, Salary),
            Department = NVL(p_department, Department)
        WHERE EmployeeID = p_employee_id;
        
        IF SQL%ROWCOUNT = 0 THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: Employee ID ' || p_employee_id || ' not found.');
        ELSE
            DBMS_OUTPUT.PUT_LINE('Employee ' || p_employee_id || ' details updated.');
        END IF;
        COMMIT;
    END UpdateEmployeeDetails;
    
    FUNCTION CalculateAnnualSalary(
        p_employee_id IN Employees.EmployeeID%TYPE
    ) RETURN NUMBER IS
        v_salary Employees.Salary%TYPE;
    BEGIN
        SELECT Salary INTO v_salary
        FROM Employees WHERE EmployeeID = p_employee_id;
        RETURN v_salary * 12;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: Employee ' || p_employee_id || ' not found.');
            RETURN NULL;
    END CalculateAnnualSalary;
    
END EmployeeManagement;
/

-- Scenario 3: AccountOperations package
CREATE OR REPLACE PACKAGE AccountOperations AS
    PROCEDURE OpenAccount(
        p_account_id   IN Accounts.AccountID%TYPE,
        p_customer_id  IN Accounts.CustomerID%TYPE,
        p_account_type IN Accounts.AccountType%TYPE,
        p_balance      IN Accounts.Balance%TYPE
    );
    
    PROCEDURE CloseAccount(
        p_account_id IN Accounts.AccountID%TYPE
    );
    
    FUNCTION GetTotalCustomerBalance(
        p_customer_id IN Accounts.CustomerID%TYPE
    ) RETURN Accounts.Balance%TYPE;
END AccountOperations;
/

CREATE OR REPLACE PACKAGE BODY AccountOperations AS
    
    PROCEDURE OpenAccount(
        p_account_id   IN Accounts.AccountID%TYPE,
        p_customer_id  IN Accounts.CustomerID%TYPE,
        p_account_type IN Accounts.AccountType%TYPE,
        p_balance      IN Accounts.Balance%TYPE
    ) IS
    BEGIN
        INSERT INTO Accounts (AccountID, CustomerID, AccountType, Balance, LastModified)
        VALUES (p_account_id, p_customer_id, p_account_type, p_balance, SYSDATE);
        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Account ' || p_account_id || ' opened for customer ' || p_customer_id);
    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: Account ID ' || p_account_id || ' already exists.');
        WHEN OTHERS THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);
    END OpenAccount;
    
    PROCEDURE CloseAccount(
        p_account_id IN Accounts.AccountID%TYPE
    ) IS
    BEGIN
        DELETE FROM Accounts WHERE AccountID = p_account_id;
        
        IF SQL%ROWCOUNT = 0 THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: Account ' || p_account_id || ' not found.');
        ELSE
            DBMS_OUTPUT.PUT_LINE('Account ' || p_account_id || ' closed.');
        END IF;
        COMMIT;
    END CloseAccount;
    
    FUNCTION GetTotalCustomerBalance(
        p_customer_id IN Accounts.CustomerID%TYPE
    ) RETURN Accounts.Balance%TYPE IS
        v_total Accounts.Balance%TYPE := 0;
    BEGIN
        SELECT NVL(SUM(Balance), 0) INTO v_total
        FROM Accounts WHERE CustomerID = p_customer_id;
        RETURN v_total;
    END GetTotalCustomerBalance;
    
END AccountOperations;
/
