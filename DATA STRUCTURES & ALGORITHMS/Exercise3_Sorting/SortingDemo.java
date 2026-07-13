public class SortingDemo {

    // Bubble Sort - Time Complexity: O(n^2)
    public static void bubbleSort(Order[] orders) {
        int n = orders.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - 1 - i; j++) {
                if (orders[j].getTotalPrice() > orders[j + 1].getTotalPrice()) {
                    Order temp = orders[j];
                    orders[j] = orders[j + 1];
                    orders[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }

    // Quick Sort - Time Complexity: O(n log n) average, O(n^2) worst
    public static void quickSort(Order[] orders, int low, int high) {
        if (low < high) {
            int pi = partition(orders, low, high);
            quickSort(orders, low, pi - 1);
            quickSort(orders, pi + 1, high);
        }
    }

    private static int partition(Order[] orders, int low, int high) {
        double pivot = orders[high].getTotalPrice();
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (orders[j].getTotalPrice() <= pivot) {
                i++;
                Order temp = orders[i];
                orders[i] = orders[j];
                orders[j] = temp;
            }
        }
        Order temp = orders[i + 1];
        orders[i + 1] = orders[high];
        orders[high] = temp;
        return i + 1;
    }

    public static void main(String[] args) {
        Order[] orders = {
            new Order(1, "Alice", 250.50),
            new Order(2, "Bob",   120.00),
            new Order(3, "Charlie", 450.75),
            new Order(4, "Diana",  89.99),
            new Order(5, "Eve",   300.25)
        };

        // Bubble Sort
        Order[] bubbleSorted = orders.clone();
        bubbleSort(bubbleSorted);
        System.out.println("=== Bubble Sorted ===");
        for (Order o : bubbleSorted) System.out.println(o);

        // Quick Sort
        Order[] quickSorted = orders.clone();
        quickSort(quickSorted, 0, quickSorted.length - 1);
        System.out.println("\n=== Quick Sorted ===");
        for (Order o : quickSorted) System.out.println(o);
    }
}
