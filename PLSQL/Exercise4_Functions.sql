-- =============================================
-- Exercise 4: Functions
-- =============================================

-- Scenario 1: CalculateAge from date of birth
CREATE OR REPLACE FUNCTION CalculateAge(
    p_dob IN Customers.DOB%TYPE
) RETURN NUMBER AS
    v_age NUMBER;
BEGIN
    v_age := FLOOR(MONTHS_BETWEEN(SYSDATE, p_dob) / 12);
    RETURN v_age;
END;
/

-- Scenario 2: CalculateMonthlyInstallment for a loan
-- Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
-- where P = principal, r = monthly interest rate, n = number of months
CREATE OR REPLACE FUNCTION CalculateMonthlyInstallment(
    p_loan_amount     IN NUMBER,
    p_annual_rate     IN NUMBER,
    p_duration_years  IN NUMBER
) RETURN NUMBER AS
    v_monthly_rate  NUMBER;
    v_num_months    NUMBER;
    v_installment   NUMBER;
BEGIN
    v_monthly_rate := p_annual_rate / 100 / 12;
    v_num_months   := p_duration_years * 12;
    
    IF v_monthly_rate = 0 THEN
        v_installment := p_loan_amount / v_num_months;
    ELSE
        v_installment := p_loan_amount *
            (v_monthly_rate * POWER(1 + v_monthly_rate, v_num_months)) /
            (POWER(1 + v_monthly_rate, v_num_months) - 1);
    END IF;
    
    RETURN ROUND(v_installment, 2);
END;
/

-- Scenario 3: HasSufficientBalance check
CREATE OR REPLACE FUNCTION HasSufficientBalance(
    p_account_id IN Accounts.AccountID%TYPE,
    p_amount     IN Accounts.Balance%TYPE
) RETURN BOOLEAN AS
    v_balance Accounts.Balance%TYPE;
BEGIN
    SELECT Balance INTO v_balance
    FROM Accounts WHERE AccountID = p_account_id;
    
    RETURN v_balance >= p_amount;
    
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: Account ' || p_account_id || ' not found.');
        RETURN FALSE;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);
        RETURN FALSE;
END;
/

-- Test calls (uncomment to run)
-- BEGIN
--     DBMS_OUTPUT.PUT_LINE('Age: ' || CalculateAge(TO_DATE('1985-05-15', 'YYYY-MM-DD')));
--     DBMS_OUTPUT.PUT_LINE('Monthly Installment: $' || CalculateMonthlyInstallment(5000, 5, 5));
--     
--     IF HasSufficientBalance(1, 500) THEN
--         DBMS_OUTPUT.PUT_LINE('Sufficient balance.');
--     ELSE
--         DBMS_OUTPUT.PUT_LINE('Insufficient balance.');
--     END IF;
-- END;
-- /
