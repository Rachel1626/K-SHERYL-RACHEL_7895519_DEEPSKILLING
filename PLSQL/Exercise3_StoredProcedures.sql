-- =============================================
-- Exercise 3: Stored Procedures
-- =============================================

-- Scenario 1: ProcessMonthlyInterest for savings accounts
CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest AS
    CURSOR c_savings IS
        SELECT AccountID, Balance
        FROM Accounts
        WHERE AccountType = 'Savings'
        FOR UPDATE;
    
    v_interest NUMBER;
BEGIN
    FOR r IN c_savings LOOP
        v_interest := r.Balance * 0.01;
        UPDATE Accounts
        SET Balance = Balance + v_interest,
            LastModified = SYSDATE
        WHERE AccountID = r.AccountID;
        
        DBMS_OUTPUT.PUT_LINE('Account ' || r.AccountID ||
                             ': Interest applied $' || TO_CHAR(v_interest, '999.99'));
    END LOOP;
    COMMIT;
END;
/

-- Scenario 2: UpdateEmployeeBonus by department
CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus(
    p_department IN Employees.Department%TYPE,
    p_bonus_percentage IN NUMBER
) AS
    v_count NUMBER;
BEGIN
    UPDATE Employees
    SET Salary = Salary + (Salary * p_bonus_percentage / 100)
    WHERE Department = p_department;
    
    v_count := SQL%ROWCOUNT;
    DBMS_OUTPUT.PUT_LINE(v_count || ' employee(s) in ' || p_department ||
                         ' received a ' || p_bonus_percentage || '% bonus.');
    COMMIT;
    
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);
        ROLLBACK;
END;
/

-- Scenario 3: TransferFunds between accounts (customer-facing)
CREATE OR REPLACE PROCEDURE TransferFunds(
    p_from_account_id IN Accounts.AccountID%TYPE,
    p_to_account_id   IN Accounts.AccountID%TYPE,
    p_amount          IN Accounts.Balance%TYPE
) AS
    v_from_balance Accounts.Balance%TYPE;
    v_to_balance   Accounts.Balance%TYPE;
    insufficient_balance EXCEPTION;
BEGIN
    SAVEPOINT sp;
    
    SELECT Balance INTO v_from_balance
    FROM Accounts WHERE AccountID = p_from_account_id
    FOR UPDATE;
    
    SELECT Balance INTO v_to_balance
    FROM Accounts WHERE AccountID = p_to_account_id
    FOR UPDATE;
    
    IF v_from_balance < p_amount THEN
        RAISE insufficient_balance;
    END IF;
    
    UPDATE Accounts SET Balance = Balance - p_amount, LastModified = SYSDATE
    WHERE AccountID = p_from_account_id;
    
    UPDATE Accounts SET Balance = Balance + p_amount, LastModified = SYSDATE
    WHERE AccountID = p_to_account_id;
    
    INSERT INTO Transactions (TransactionID, AccountID, TransactionDate, Amount, TransactionType)
    VALUES (SEQ_TRANSACTIONS.NEXTVAL, p_from_account_id, SYSDATE, -p_amount, 'Transfer');
    
    INSERT INTO Transactions (TransactionID, AccountID, TransactionDate, Amount, TransactionType)
    VALUES (SEQ_TRANSACTIONS.NEXTVAL, p_to_account_id, SYSDATE, p_amount, 'Transfer');
    
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Transferred $' || p_amount || ' from account ' ||
                         p_from_account_id || ' to account ' || p_to_account_id);
    
EXCEPTION
    WHEN insufficient_balance THEN
        ROLLBACK TO sp;
        DBMS_OUTPUT.PUT_LINE('ERROR: Insufficient balance in account ' || p_from_account_id);
    WHEN NO_DATA_FOUND THEN
        ROLLBACK TO sp;
        DBMS_OUTPUT.PUT_LINE('ERROR: Account not found.');
    WHEN OTHERS THEN
        ROLLBACK TO sp;
        DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);
END;
/

-- Sequence needed for TransferFunds
CREATE SEQUENCE SEQ_TRANSACTIONS START WITH 10;
