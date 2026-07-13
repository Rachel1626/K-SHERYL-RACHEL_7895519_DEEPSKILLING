public class TaskLinkedList {
    private class Node {
        Task task;
        Node next;
        Node(Task task) { this.task = task; }
    }

    private Node head;
    private int size;

    public TaskLinkedList() {
        head = null;
        size = 0;
    }

    // Add at end - Time Complexity: O(n)
    public void addTask(Task task) {
        Node newNode = new Node(task);
        if (head == null) {
            head = newNode;
        } else {
            Node curr = head;
            while (curr.next != null) curr = curr.next;
            curr.next = newNode;
        }
        size++;
    }

    // Search by ID - Time Complexity: O(n)
    public Task searchTask(int taskId) {
        Node curr = head;
        while (curr != null) {
            if (curr.task.getTaskId() == taskId) return curr.task;
            curr = curr.next;
        }
        return null;
    }

    // Traverse - Time Complexity: O(n)
    public void traverse() {
        Node curr = head;
        while (curr != null) {
            System.out.println(curr.task);
            curr = curr.next;
        }
    }

    // Delete by ID - Time Complexity: O(n)
    public boolean deleteTask(int taskId) {
        if (head == null) return false;

        if (head.task.getTaskId() == taskId) {
            head = head.next;
            size--;
            return true;
        }

        Node curr = head;
        while (curr.next != null) {
            if (curr.next.task.getTaskId() == taskId) {
                curr.next = curr.next.next;
                size--;
                return true;
            }
            curr = curr.next;
        }
        return false;
    }

    public static void main(String[] args) {
        TaskLinkedList list = new TaskLinkedList();

        list.addTask(new Task(1, "Design UI",      "Pending"));
        list.addTask(new Task(2, "Implement API",  "In Progress"));
        list.addTask(new Task(3, "Write Tests",    "Pending"));

        System.out.println("=== All Tasks ===");
        list.traverse();

        System.out.println("\n=== Search ID 2 ===");
        System.out.println(list.searchTask(2));

        System.out.println("\n=== Delete ID 1 ===");
        list.deleteTask(1);
        list.traverse();
    }
}
