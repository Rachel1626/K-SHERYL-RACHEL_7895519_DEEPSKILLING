public class FinancialForecast {

    // Recursive method to calculate future value
    // Formula: futureValue = presentValue * (1 + growthRate) ^ years
    // Time Complexity: O(n) where n = years
    public static double predictFutureValue(double presentValue, double growthRate, int years) {
        if (years == 0) {
            return presentValue;
        }
        return (1 + growthRate) * predictFutureValue(presentValue, growthRate, years - 1);
    }

    // Optimized version using exponentiation by squaring (memoization-like)
    // Time Complexity: O(log n)
    public static double predictFutureValueOptimized(double presentValue, double growthRate, int years) {
        if (years == 0) return presentValue;
        if (years % 2 == 0) {
            double half = predictFutureValueOptimized(presentValue, growthRate, years / 2);
            return half * half / presentValue;  // scale back
        } else {
            return (1 + growthRate) * predictFutureValueOptimized(presentValue, growthRate, years - 1);
        }
    }

    // Iterative version for comparison (no recursion overhead)
    public static double predictFutureValueIterative(double presentValue, double growthRate, int years) {
        double result = presentValue;
        for (int i = 0; i < years; i++) {
            result *= (1 + growthRate);
        }
        return result;
    }

    public static void main(String[] args) {
        double presentValue = 1000.0;
        double growthRate = 0.05;
        int years = 10;

        System.out.println("Present Value: $" + presentValue);
        System.out.println("Growth Rate: " + (growthRate * 100) + "%");
        System.out.println("Years: " + years);

        double futureRecursive = predictFutureValue(presentValue, growthRate, years);
        System.out.println("\nFuture Value (Recursive O(n)): $" + String.format("%.2f", futureRecursive));

        double futureOptimized = predictFutureValueOptimized(presentValue, growthRate, years);
        System.out.println("Future Value (Optimized O(log n)): $" + String.format("%.2f", futureOptimized));

        double futureIterative = predictFutureValueIterative(presentValue, growthRate, years);
        System.out.println("Future Value (Iterative): $" + String.format("%.2f", futureIterative));
    }
}
