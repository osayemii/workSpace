/**
 * Exercise 3: Bank Account Management System with Thread Safety
 * 
 * This program simulates a bank account management system:
 * - Implements deposits and withdrawals
 * - Ensures thread safety using synchronized methods
 * - Multiple threads can perform transactions simultaneously on the same account
 */
public class Exercise3 {
    // Bank Account class with thread-safe operations
    static class BankAccount {
        private double balance;
        private final String accountNumber;
        private final Object lock = new Object();

        public BankAccount(String accountNumber, double initialBalance) {
            this.accountNumber = accountNumber;
            this.balance = initialBalance;
        }

        // Synchronized method for deposit
        public synchronized void deposit(double amount) {
            if (amount > 0) {
                double oldBalance = balance;
                balance += amount;
                System.out.println(Thread.currentThread().getName() + 
                    " - Deposit: $" + String.format("%.2f", amount) + 
                    " | Balance: $" + String.format("%.2f", oldBalance) + 
                    " -> $" + String.format("%.2f", balance));
            } else {
                System.out.println(Thread.currentThread().getName() + 
                    " - Invalid deposit amount: $" + String.format("%.2f", amount));
            }
        }

        // Synchronized method for withdrawal
        public synchronized void withdraw(double amount) {
            if (amount > 0) {
                if (balance >= amount) {
                    double oldBalance = balance;
                    balance -= amount;
                    System.out.println(Thread.currentThread().getName() + 
                        " - Withdrawal: $" + String.format("%.2f", amount) + 
                        " | Balance: $" + String.format("%.2f", oldBalance) + 
                        " -> $" + String.format("%.2f", balance));
                } else {
                    System.out.println(Thread.currentThread().getName() + 
                        " - Withdrawal failed: Insufficient funds. " +
                        "Requested: $" + String.format("%.2f", amount) + 
                        ", Available: $" + String.format("%.2f", balance));
                }
            } else {
                System.out.println(Thread.currentThread().getName() + 
                    " - Invalid withdrawal amount: $" + String.format("%.2f", amount));
            }
        }

        // Synchronized method to get balance
        public synchronized double getBalance() {
            return balance;
        }

        public String getAccountNumber() {
            return accountNumber;
        }
    }

    public static void main(String[] args) {
        // Create a shared bank account
        BankAccount account = new BankAccount("ACC-12345", 1000.00);
        
        System.out.println("Initial Balance: $" + String.format("%.2f", account.getBalance()));
        System.out.println("Starting transactions...\n");

        // Create multiple threads performing different transactions
        Thread[] threads = new Thread[6];

        // Thread 1: Deposit
        threads[0] = new Thread(() -> {
            for (int i = 0; i < 3; i++) {
                account.deposit(100.00);
                try {
                    Thread.sleep(50);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
            }
        }, "Deposit-Thread-1");

        // Thread 2: Withdrawal
        threads[1] = new Thread(() -> {
            for (int i = 0; i < 3; i++) {
                account.withdraw(50.00);
                try {
                    Thread.sleep(60);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
            }
        }, "Withdraw-Thread-1");

        // Thread 3: Deposit
        threads[2] = new Thread(() -> {
            for (int i = 0; i < 2; i++) {
                account.deposit(200.00);
                try {
                    Thread.sleep(70);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
            }
        }, "Deposit-Thread-2");

        // Thread 4: Withdrawal
        threads[3] = new Thread(() -> {
            for (int i = 0; i < 2; i++) {
                account.withdraw(150.00);
                try {
                    Thread.sleep(80);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
            }
        }, "Withdraw-Thread-2");

        // Thread 5: Large deposit
        threads[4] = new Thread(() -> {
            account.deposit(500.00);
            try {
                Thread.sleep(90);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return;
            }
        }, "Deposit-Thread-3");

        // Thread 6: Large withdrawal (may fail if insufficient funds)
        threads[5] = new Thread(() -> {
            account.withdraw(800.00);
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return;
            }
        }, "Withdraw-Thread-3");

        // Start all threads
        for (Thread thread : threads) {
            thread.start();
        }

        // Wait for all threads to complete
        for (Thread thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }

        System.out.println("\nFinal Balance: $" + String.format("%.2f", account.getBalance()));
        System.out.println("Exercise 3 completed!");
    }
}

