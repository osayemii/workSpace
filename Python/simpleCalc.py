operator = input("Enter an arithmetic operator (+ - * /): ")

while operator != "+" and operator != "-" and operator != "*" and operator != "/":
    operator = input("Enter an arithmetic operator (+ - * /): ")

num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

if operator == "+":
    print(f"{num1} + {num2} = {num1 + num2:.1f}")
elif operator == "-":
    print(f"{num1} - {num2} = {num1 - num2:.1f}")
elif operator == "*":
    print(f"{num1} * {num2} = {num1 * num2:.1f}")
elif operator == "/":
    print(f"{num1} / {num2} = {num1 / num2:.1f}")
else:
    print(f"{operator} is not a valid operator.")