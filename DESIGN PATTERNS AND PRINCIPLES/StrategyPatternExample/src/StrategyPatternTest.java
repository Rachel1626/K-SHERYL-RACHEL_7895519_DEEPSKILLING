public class StrategyPatternTest {
    public static void main(String[] args) {
        PaymentContext context = new PaymentContext(new CreditCardPayment("1234567890123456"));
        context.executePayment(100.0);

        context.setPaymentStrategy(new PayPalPayment("user@example.com"));
        context.executePayment(200.0);
    }
}
