-- =============================================
-- Exercise 6: Cursors
-- =============================================

-- Scenario 1: GenerateMonthlyStatements using explicit cursor
DECLARE
    CURSOR c_customers IS
        SELECT CustomerID, Name FROM Customers;
    
    CURSOR c_transactions(p_customer_id NUMBER) IS
        SELECT t.TransactionID, t.TransactionDate, t.Amount, t.TransactionType, a.AccountID
        FROM Transactions t
        JOIN Accounts a ON t.AccountID = a.AccountID
        WHERE a.CustomerID = p_customer_id
          AND EXTRACT(MONTH FROM t.TransactionDate) = EXTRACT(MONTH FROM SYSDATE)
          AND EXTRACT(YEAR FROM t.TransactionDate) = EXTRACT(YEAR FROM SYSDATE)
        ORDER BY t.TransactionDate;
    
    v_total_deposits  NUMBER;
    v_total_withdrawals NUMBER;
BEGIN
    FOR r_cust IN c_customers LOOP
        DBMS_OUTPUT.PUT_LINE('========================================');
        DBMS_OUTPUT.PUT_LINE('STATEMENT FOR: ' || r_cust.Name);
        DBMS_OUTPUT.PUT_LINE('Customer ID: ' || r_cust.CustomerID);
        DBMS_OUTPUT.PUT_LINE('Month: ' || TO_CHAR(SYSDATE, 'MONTH YYYY'));
        DBMS_OUTPUT.PUT_LINE('----------------------------------------');
        
        v_total_deposits := 0;
        v_total_withdrawals := 0;
        
        FOR r_txn IN c_transactions(r_cust.CustomerID) LOOP
            DBMS_OUTPUT.PUT_LINE(
                RPAD(TO_CHAR(r_txn.TransactionDate, 'MM/DD/YYYY'), 12) ||
                RPAD(r_txn.TransactionType, 12) ||
                TO_CHAR(r_txn.Amount, '$999.99')
            );
            
            IF r_txn.TransactionType = 'Deposit' THEN
                v_total_deposits := v_total_deposits + r_txn.Amount;
            ELSE
                v_total_withdrawals := v_total_withdrawals + r_txn.Amount;
            END IF;
        END LOOP;
        
        DBMS_OUTPUT.PUT_LINE('----------------------------------------');
        DBMS_OUTPUT.PUT_LINE('Total Deposits:  $' || TO_CHAR(v_total_deposits, '999.99'));
        DBMS_OUTPUT.PUT_LINE('Total Withdrawals: $' || TO_CHAR(v_total_withdrawals, '999.99'));
        DBMS_OUTPUT.PUT_LINE('========================================' || CHR(10));
    END LOOP;
END;
/

-- Scenario 2: ApplyAnnualFee using explicit cursor
DECLARE
    CURSOR c_accounts IS
        SELECT AccountID, Balance
        FROM Accounts
        FOR UPDATE;
    
    v_annual_fee CONSTANT NUMBER := 25.00;
    v_new_balance NUMBER;
BEGIN
    FOR r IN c_accounts LOOP
        IF r.Balance >= v_annual_fee THEN
            v_new_balance := r.Balance - v_annual_fee;
            UPDATE Accounts
            SET Balance = v_new_balance,
                LastModified = SYSDATE
            WHERE CURRENT OF c_accounts;
            
            DBMS_OUTPUT.PUT_LINE('Account ' || r.AccountID ||
                                 ': Annual fee of $' || v_annual_fee ||
                                 ' applied. New balance: $' || v_new_balance);
        ELSE
            DBMS_OUTPUT.PUT_LINE('Account ' || r.AccountID ||
                                 ': Insufficient balance ($' || r.Balance ||
                                 ') to apply annual fee of $' || v_annual_fee);
        END IF;
    END LOOP;
    COMMIT;
END;
/

-- Scenario 3: UpdateLoanInterestRates using explicit cursor
DECLARE
    -- New policy: reduce rates based on loan-to-value or duration
    CURSOR c_loans IS
        SELECT LoanID, LoanAmount, InterestRate, CustomerID
        FROM Loans
        FOR UPDATE;
    
    v_new_rate NUMBER;
BEGIN
    FOR r IN c_loans LOOP
        v_new_rate := r.InterestRate;
        
        -- Policy: reduce by 0.5% for loans over $10,000
        IF r.LoanAmount > 10000 THEN
            v_new_rate := v_new_rate - 0.5;
        END IF;
        
        -- Policy: reduce by 0.25% for all loans
        v_new_rate := v_new_rate - 0.25;
        
        -- Ensure rate doesn't go below 2%
        IF v_new_rate < 2 THEN
            v_new_rate := 2;
        END IF;
        
        UPDATE Loans
        SET InterestRate = v_new_rate
        WHERE CURRENT OF c_loans;
        
        DBMS_OUTPUT.PUT_LINE('Loan ' || r.LoanID || ': Rate changed from ' ||
                             r.InterestRate || '% to ' || v_new_rate || '%');
    END LOOP;
    COMMIT;
END;
/
