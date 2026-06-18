-- =============================================
-- Exercise 2: Error Handling
-- =============================================

-- Scenario 1: SafeTransferFunds with rollback on error
CREATE OR REPLACE PROCEDURE SafeTransferFunds(
    p_from_account_id IN Accounts.AccountID%TYPE,
    p_to_account_id   IN Accounts.AccountID%TYPE,
    p_amount          IN Accounts.Balance%TYPE
) AS
    v_from_balance Accounts.Balance%TYPE;
    v_to_balance   Accounts.Balance%TYPE;
    insufficient_funds EXCEPTION;
BEGIN
    SAVEPOINT before_transfer;
    
    SELECT Balance INTO v_from_balance
    FROM Accounts WHERE AccountID = p_from_account_id
    FOR UPDATE;
    
    SELECT Balance INTO v_to_balance
    FROM Accounts WHERE AccountID = p_to_account_id
    FOR UPDATE;
    
    IF v_from_balance < p_amount THEN
        RAISE insufficient_funds;
    END IF;
    
    UPDATE Accounts SET Balance = Balance - p_amount,
                        LastModified = SYSDATE
    WHERE AccountID = p_from_account_id;
    
    UPDATE Accounts SET Balance = Balance + p_amount,
                        LastModified = SYSDATE
    WHERE AccountID = p_to_account_id;
    
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Transfer of $' || p_amount || ' completed successfully.');
    
EXCEPTION
    WHEN insufficient_funds THEN
        ROLLBACK TO before_transfer;
        DBMS_OUTPUT.PUT_LINE('ERROR: Insufficient funds in account ' || p_from_account_id ||
                             '. Required: $' || p_amount || ', Available: $' || v_from_balance);
    WHEN NO_DATA_FOUND THEN
        ROLLBACK TO before_transfer;
        DBMS_OUTPUT.PUT_LINE('ERROR: One or both accounts do not exist.');
    WHEN OTHERS THEN
        ROLLBACK TO before_transfer;
        DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);
END;
/

-- Scenario 2: UpdateSalary with exception handling for invalid employee ID
CREATE OR REPLACE PROCEDURE UpdateSalary(
    p_employee_id IN Employees.EmployeeID%TYPE,
    p_percentage  IN NUMBER
) AS
    v_current_salary Employees.Salary%TYPE;
BEGIN
    SELECT Salary INTO v_current_salary
    FROM Employees WHERE EmployeeID = p_employee_id;
    
    UPDATE Employees
    SET Salary = Salary + (Salary * p_percentage / 100)
    WHERE EmployeeID = p_employee_id;
    
    DBMS_OUTPUT.PUT_LINE('Salary updated for Employee ' || p_employee_id ||
                         '. New salary: $' || TO_CHAR(v_current_salary * (1 + p_percentage/100), '99999.99'));
    COMMIT;
    
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: Employee with ID ' || p_employee_id || ' does not exist.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);
END;
/

-- Scenario 3: AddNewCustomer with duplicate ID prevention
CREATE OR REPLACE PROCEDURE AddNewCustomer(
    p_customer_id IN Customers.CustomerID%TYPE,
    p_name        IN Customers.Name%TYPE,
    p_dob         IN Customers.DOB%TYPE,
    p_balance     IN Customers.Balance%TYPE
) AS
    duplicate_customer EXCEPTION;
    PRAGMA EXCEPTION_INIT(duplicate_customer, -00001);
BEGIN
    INSERT INTO Customers (CustomerID, Name, DOB, Balance, LastModified)
    VALUES (p_customer_id, p_name, p_dob, p_balance, SYSDATE);
    
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Customer ' || p_name || ' added successfully.');
    
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: Customer with ID ' || p_customer_id || ' already exists.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);
END;
/
