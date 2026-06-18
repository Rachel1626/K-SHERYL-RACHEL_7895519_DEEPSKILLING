public class MVCPatternTest {
    public static void main(String[] args) {
        Student student = new Student("John Doe", "S12345", "A");
        StudentView view = new StudentView();
        StudentController controller = new StudentController(student, view);

        controller.updateView();

        System.out.println("\nUpdating student details...");
        controller.setStudentName("Jane Doe");
        controller.setStudentGrade("A+");

        controller.updateView();
    }
}
