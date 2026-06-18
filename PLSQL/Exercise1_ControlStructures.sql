-- =============================================
-- Exercise 1: Control Structures
-- =============================================

-- Scenario 1: Apply 1% discount to loan interest rates for customers above 60 years old
DECLARE
    CURSOR c_customers IS
        SELECT c.CustomerID, c.DOB, l.LoanID, l.InterestRate
        FROM Customers c
        JOIN Loans l ON c.CustomerID = l.CustomerID;
    
    v_age NUMBER;
BEGIN
    FOR r IN c_customers LOOP
        v_age := FLOOR(MONTHS_BETWEEN(SYSDATE, r.DOB) / 12);
        IF v_age > 60 THEN
            UPDATE Loans
            SET InterestRate = InterestRate - 1
            WHERE LoanID = r.LoanID;
            DBMS_OUTPUT.PUT_LINE('Applied 1% discount to LoanID ' || r.LoanID ||
                                 ' (customer age: ' || v_age || ')');
        END IF;
    END LOOP;
    COMMIT;
END;
/

-- Scenario 2: Set IsVIP flag to TRUE for customers with balance over $10,000
-- Note: Customers table doesn't have IsVIP column; need to add it first
ALTER TABLE Customers ADD IsVIP NUMBER(1) DEFAULT 0;

DECLARE
    CURSOR c_customers IS
        SELECT CustomerID, Balance FROM Customers;
BEGIN
    FOR r IN c_customers LOOP
        IF r.Balance > 10000 THEN
            UPDATE Customers
            SET IsVIP = 1
            WHERE CustomerID = r.CustomerID;
            DBMS_OUTPUT.PUT_LINE('Customer ' || r.CustomerID || ' promoted to VIP');
        END IF;
    END LOOP;
    COMMIT;
END;
/

-- Scenario 3: Send reminders for loans due within the next 30 days
DECLARE
    CURSOR c_loans_due IS
        SELECT l.LoanID, l.EndDate, l.LoanAmount, c.Name, c.CustomerID
        FROM Loans l
        JOIN Customers c ON l.CustomerID = c.CustomerID
        WHERE l.EndDate BETWEEN SYSDATE AND SYSDATE + 30;
BEGIN
    FOR r IN c_loans_due LOOP
        DBMS_OUTPUT.PUT_LINE('REMINDER: Customer ' || r.Name ||
                             ' (ID: ' || r.CustomerID || ') has loan ' || r.LoanID ||
                             ' of $' || r.LoanAmount || ' due on ' || r.EndDate);
    END LOOP;
    
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No loans due within the next 30 days.');
    END IF;
END;
/
