import java.util.LinkedList;
import java.util.Queue;

public class Exercise2 {
    private final Queue<Integer> buffer = new LinkedList<>();
    private final int BUFFER_SIZE = 5;
    private final Object lock = new Object();
    private int itemCount = 0;
    private final int MAX_ITEMS = 20;

    public void startProducerConsumer() {
        // Producer thread
        Thread producer = new Thread(() -> {
            while (itemCount < MAX_ITEMS) {
                synchronized (lock) {
                    // Wait if buffer is full
                    while (buffer.size() >= BUFFER_SIZE) {
                        try {
                            System.out.println("Buffer is full. Producer waiting...");
                            lock.wait();
                        } catch (InterruptedException e) {
                            Thread.currentThread().interrupt();
                            return;
                        }
                    }

                    // Produce an item
                    int item = ++itemCount;
                    buffer.offer(item);
                    System.out.println("Producer produced: " + item + " (Buffer size: " + buffer.size() + ")");
                    lock.notify(); // Notify consumer
                }

                // Simulate production time
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
            }
            System.out.println("Producer finished producing " + MAX_ITEMS + " items.");
        }, "Producer");

        // Consumer thread
        Thread consumer = new Thread(() -> {
            while (itemCount < MAX_ITEMS || !buffer.isEmpty()) {
                synchronized (lock) {
                    // Wait if buffer is empty
                    while (buffer.isEmpty() && itemCount < MAX_ITEMS) {
                        try {
                            System.out.println("Buffer is empty. Consumer waiting...");
                            lock.wait();
                        } catch (InterruptedException e) {
                            Thread.currentThread().interrupt();
                            return;
                        }
                    }

                    // Consume an item if buffer is not empty
                    if (!buffer.isEmpty()) {
                        int item = buffer.poll();
                        System.out.println("Consumer consumed: " + item + " (Buffer size: " + buffer.size() + ")");
                        lock.notify(); // Notify producer
                    }
                }

                // Simulate consumption time
                try {
                    Thread.sleep(150);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
            }
            System.out.println("Consumer finished consuming all items.");
        }, "Consumer");

        // Start both threads
        producer.start();
        consumer.start();

        // Wait for both threads to complete
        try {
            producer.join();
            consumer.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    
    public static void main(String[] args) {
        Exercise2 exercise = new Exercise2();
        exercise.startProducerConsumer();
    }
}

