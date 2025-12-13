principle = int(input("Enter the principle amount: "))
while principle < 0:
    principle = int(input("Enter a valid principle amount: "))

rate = float(input("Enter rate of interest: "))
while rate < 0:
    rate = float(input("Enter a valid rate of interest: "))

time = int(input("Enter time period in years: "))
while time < 0:
    time = int(input("Enter a valid time period in years: "))

SI = (principle*rate*time)/100
print(f"The Simple Interest is: {SI:.2f}")