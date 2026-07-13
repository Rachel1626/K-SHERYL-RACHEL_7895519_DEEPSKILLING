import java.util.HashMap;
import java.util.Map;

public class InventoryManager {
    private Map<Integer, Product> inventory;

    public InventoryManager() {
        inventory = new HashMap<>();
    }

    // Time Complexity: O(1) average, O(n) in case of collision
    public void addProduct(Product product) {
        inventory.put(product.getProductId(), product);
    }

    // Time Complexity: O(1) average, O(n) worst case
    public void updateProduct(int productId, String name, int quantity, double price) {
        if (inventory.containsKey(productId)) {
            Product p = inventory.get(productId);
            if (name != null) p.setProductName(name);
            p.setQuantity(quantity);
            p.setPrice(price);
        } else {
            System.out.println("Product not found.");
        }
    }

    // Time Complexity: O(1) average, O(n) worst case
    public void deleteProduct(int productId) {
        inventory.remove(productId);
    }

    // Time Complexity: O(1) average
    public Product getProduct(int productId) {
        return inventory.get(productId);
    }

    // Time Complexity: O(n)
    public void displayAll() {
        for (Product p : inventory.values()) {
            System.out.println(p);
        }
    }

    public static void main(String[] args) {
        InventoryManager mgr = new InventoryManager();

        mgr.addProduct(new Product(1, "Laptop", 10, 899.99));
        mgr.addProduct(new Product(2, "Mouse", 50, 19.99));
        mgr.addProduct(new Product(3, "Keyboard", 30, 49.99));

        System.out.println("=== All Products ===");
        mgr.displayAll();

        System.out.println("\n=== Updating Product 2 ===");
        mgr.updateProduct(2, "Wireless Mouse", 40, 24.99);
        System.out.println(mgr.getProduct(2));

        System.out.println("\n=== Deleting Product 3 ===");
        mgr.deleteProduct(3);
        mgr.displayAll();
    }
}
