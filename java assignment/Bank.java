public class Bank {
    // Bank Account class with thread-safe operations
    static class BankAccount {
        private double balance;
        private final String accountNumber;

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
        BankAccount account1 = new BankAccount("ACC-12345", 1000.00);
        BankAccount account2 = new BankAccount("ACC-12345", 500.00);

        // Create multiple threads performing different transactions
        Thread t1 = new Thread();
        Thread t2 = new Thread();

        t1 = new Thread(() -> {
            for (int i = 0; i < 1; i++) {
                account1.deposit(100.00);
                try {
                    Thread.sleep(50);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
            }
        }, "User-1");

        t2 = new Thread(() -> {
            for (int i = 0; i < 1; i++) {
                account2.deposit(100.00);
                try {
                    Thread.sleep(50);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
            }
        }, "User-2");

        // Start both thread
        t1.start();
        t2.start();

        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
