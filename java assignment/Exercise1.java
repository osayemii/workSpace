/**
 * Exercise 1: Odd and Even Number Printing with Synchronization
 * 
 * This program creates two threads:
 * - Thread 1: Prints odd numbers
 * - Thread 2: Prints even numbers
 * Uses synchronization to ensure proper alternation (odd, even, odd, even, etc.)
 */
public class Exercise1 {
    private int count = 1;
    private final int MAX_COUNT = 20;
    private final Object lock = new Object();
    private boolean isOddTurn = true;

    public static void main(String[] args) {
        Exercise1 exercise = new Exercise1();
        exercise.startThreads();
    }

    public void startThreads() {
        // Thread for printing odd numbers
        Thread oddThread = new Thread(() -> {
            while (count <= MAX_COUNT) {
                synchronized (lock) {
                    // Wait if it's not odd's turn
                    while (!isOddTurn || count % 2 == 0) {
                        try {
                            lock.wait();
                        } catch (InterruptedException e) {
                            Thread.currentThread().interrupt();
                            return;
                        }
                    }
                    
                    // Print odd number if count is still valid
                    if (count <= MAX_COUNT && count % 2 != 0) {
                        System.out.println("Thread 1 (Odd): " + count);
                        count++;
                        isOddTurn = false;
                        lock.notify();
                    }
                }
            }
        }, "OddThread");

        // Thread for printing even numbers
        Thread evenThread = new Thread(() -> {
            while (count <= MAX_COUNT) {
                synchronized (lock) {
                    // Wait if it's not even's turn
                    while (isOddTurn || count % 2 != 0) {
                        try {
                            lock.wait();
                        } catch (InterruptedException e) {
                            Thread.currentThread().interrupt();
                            return;
                        }
                    }
                    
                    // Print even number if count is still valid
                    if (count <= MAX_COUNT && count % 2 == 0) {
                        System.out.println("Thread 2 (Even): " + count);
                        count++;
                        isOddTurn = true;
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

        System.out.println("\nExercise 1 completed!");
    }
}

