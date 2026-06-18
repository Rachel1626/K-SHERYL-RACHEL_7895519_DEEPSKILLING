import java.util.Arrays;

public class EmployeeManager {
    private Employee[] employees;
    private int size;
    private static final int INITIAL_CAPACITY = 10;

    public EmployeeManager() {
        employees = new Employee[INITIAL_CAPACITY];
        size = 0;
    }

    // Add - Time Complexity: O(1) amortized, O(n) when resizing
    public void addEmployee(Employee e) {
        if (size == employees.length) {
            employees = Arrays.copyOf(employees, employees.length * 2);
        }
        employees[size++] = e;
    }

    // Search by ID - Time Complexity: O(n)
    public Employee searchEmployee(int employeeId) {
        for (int i = 0; i < size; i++) {
            if (employees[i].getEmployeeId() == employeeId) {
                return employees[i];
            }
        }
        return null;
    }

    // Traverse - Time Complexity: O(n)
    public void traverse() {
        for (int i = 0; i < size; i++) {
            System.out.println(employees[i]);
        }
    }

    // Delete by ID - Time Complexity: O(n)
    public boolean deleteEmployee(int employeeId) {
        for (int i = 0; i < size; i++) {
            if (employees[i].getEmployeeId() == employeeId) {
                employees[i] = employees[size - 1];
                employees[size - 1] = null;
                size--;
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        EmployeeManager mgr = new EmployeeManager();

        mgr.addEmployee(new Employee(101, "Alice",   "Manager",    85000));
        mgr.addEmployee(new Employee(102, "Bob",     "Developer",  72000));
        mgr.addEmployee(new Employee(103, "Charlie", "Designer",   68000));

        System.out.println("=== All Employees ===");
        mgr.traverse();

        System.out.println("\n=== Search ID 102 ===");
        System.out.println(mgr.searchEmployee(102));

        System.out.println("\n=== Delete ID 101 ===");
        mgr.deleteEmployee(101);
        mgr.traverse();
    }
}
