import java.util.Arrays;

public class LibrarySearchDemo {

    // Linear Search by title - Time Complexity: O(n)
    public static Book linearSearchByTitle(Book[] books, String title) {
        for (Book b : books) {
            if (b.getTitle().equalsIgnoreCase(title)) {
                return b;
            }
        }
        return null;
    }

    // Binary Search by title - Time Complexity: O(log n), requires sorted array
    public static Book binarySearchByTitle(Book[] books, String title) {
        int left = 0, right = books.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int cmp = books[mid].getTitle().compareToIgnoreCase(title);
            if (cmp == 0) {
                return books[mid];
            } else if (cmp < 0) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return null;
    }

    public static void main(String[] args) {
        Book[] books = {
            new Book(1, "The Great Gatsby",  "F. Scott Fitzgerald"),
            new Book(2, "1984",              "George Orwell"),
            new Book(3, "To Kill a Mockingbird", "Harper Lee"),
            new Book(4, "Moby Dick",         "Herman Melville")
        };

        // Linear search (works on unsorted data)
        System.out.println("=== Linear Search ===");
        Book found = linearSearchByTitle(books, "1984");
        System.out.println(found != null ? found : "Not found");

        // Binary search needs sorted array
        Arrays.sort(books, (a, b) -> a.getTitle().compareToIgnoreCase(b.getTitle()));
        System.out.println("\n=== Binary Search (sorted by title) ===");
        found = binarySearchByTitle(books, "Moby Dick");
        System.out.println(found != null ? found : "Not found");
    }
}
