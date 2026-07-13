import java.util.Arrays;

public class SearchDemo {

    // Linear Search - Time Complexity: O(n)
    public static Product linearSearch(Product[] products, int targetId) {
        for (Product p : products) {
            if (p.getProductId() == targetId) {
                return p;
            }
        }
        return null;
    }

    // Binary Search - Time Complexity: O(log n), requires sorted array
    public static Product binarySearch(Product[] products, int targetId) {
        int left = 0, right = products.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (products[mid].getProductId() == targetId) {
                return products[mid];
            } else if (products[mid].getProductId() < targetId) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return null;
    }

    public static void main(String[] args) {
        Product[] products = {
            new Product(105, "Laptop", "Electronics"),
            new Product(203, "T-Shirt", "Clothing"),
            new Product( 42, "Notebook", "Stationery"),
            new Product( 78, "Shoes", "Footwear")
        };

        // Linear search (unsorted array)
        System.out.println("=== Linear Search ===");
        Product found = linearSearch(products, 78);
        System.out.println(found != null ? found : "Not found");

        // Binary search requires sorted array
        Arrays.sort(products, (a, b) -> Integer.compare(a.getProductId(), b.getProductId()));
        System.out.println("\n=== Binary Search (sorted by ID) ===");
        found = binarySearch(products, 203);
        System.out.println(found != null ? found : "Not found");
    }
}
