-- =============================================
-- Exercise 5: Triggers
-- =============================================

-- Scenario 1: UpdateCustomerLastModified on record update
CREATE OR REPLACE TRIGGER UpdateCustomerLastModified
    BEFORE UPDATE ON Customers
    FOR EACH ROW
BEGIN
    :NEW.LastModified := SYSDATE;
    DBMS_OUTPUT.PUT_LINE('LastModified updated for Customer ' || :NEW.CustomerID);
END;
/

-- Scenario 2: LogTransaction audit trigger
-- Create AuditLog table first
CREATE TABLE AuditLog (
    LogID       NUMBER PRIMARY KEY,
    TransactionID NUMBER,
    AccountID   NUMBER,
    Amount      NUMBER,
    TransactionType VARCHAR2(10),
    LogDate     DATE,
    Action      VARCHAR2(20)
);

CREATE SEQUENCE SEQ_AUDIT_LOG START WITH 1;

CREATE OR REPLACE TRIGGER LogTransaction
    AFTER INSERT ON Transactions
    FOR EACH ROW
BEGIN
    INSERT INTO AuditLog (LogID, TransactionID, AccountID, Amount,
                          TransactionType, LogDate, Action)
    VALUES (SEQ_AUDIT_LOG.NEXTVAL, :NEW.TransactionID, :NEW.AccountID,
            :NEW.Amount, :NEW.TransactionType, SYSDATE, 'INSERT');
    
    DBMS_OUTPUT.PUT_LINE('Audit logged for Transaction ' || :NEW.TransactionID);
END;
/

-- Scenario 3: CheckTransactionRules for deposits and withdrawals
CREATE OR REPLACE TRIGGER CheckTransactionRules
    BEFORE INSERT ON Transactions
    FOR EACH ROW
DECLARE
    v_balance Accounts.Balance%TYPE;
BEGIN
    IF :NEW.TransactionType = 'Withdrawal' OR :NEW.TransactionType = 'Transfer' THEN
        SELECT Balance INTO v_balance
        FROM Accounts WHERE AccountID = :NEW.AccountID;
        
        IF v_balance + :NEW.Amount < 0 THEN
            RAISE_APPLICATION_ERROR(-20001,
                'Insufficient balance. Available: $' || v_balance ||
                ', Requested withdrawal: $' || ABS(:NEW.Amount));
        END IF;
        
    ELSIF :NEW.TransactionType = 'Deposit' THEN
        IF :NEW.Amount <= 0 THEN
            RAISE_APPLICATION_ERROR(-20002, 'Deposit amount must be positive.');
        END IF;
    END IF;
    
    DBMS_OUTPUT.PUT_LINE('Transaction rules passed for ' || :NEW.TransactionType);
END;
/
