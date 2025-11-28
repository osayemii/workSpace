public class Even_Odd {
    private int count = 1;
    private final int MAX_COUNT = 20;
    private final Object lock = new Object();
    
    public void startThreads() {
        // Thread for printing odd numbers
        Thread oddThread = new Thread(() -> {
            while (count <= MAX_COUNT) {
                synchronized (lock) {
                    // Print odd number if count is still valid
                    if (count <= MAX_COUNT && count % 2 != 0) {
                        System.out.println("Thread-1 (Odd): " + count);
                        count++;
                        lock.notify();
                    }
                }
            }
        }, "OddThread");

        // Thread for printing even numbers
        Thread evenThread = new Thread(() -> {
            while (count <= MAX_COUNT) {
                synchronized (lock) {
                    // Print even number if count is still valid
                    if (count <= MAX_COUNT && count % 2 == 0) {
                        System.out.println("Thread-2 (Even): " + count);
                        count++;
                        lock.notify();
                    }
                }
            }
        }, "EvenThread");

        // Start both threads
        oddThread.start();
        evenThread.start();

        // Wait for both threads to complete
        try {
            oddThread.join();
            evenThread.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    public static void main(String[] args) {
        Even_Odd exercise = new Even_Odd();
        exercise.startThreads();
    }
}