
# String Attribute Methods
name = input("Enter your name: ")

print(name.isalpha()) # checks if the string contains only alphabetic characters
print(name.find("e")) # find a character from the left side
print(name.rfind("j")) # find a character from the right side 
print(name.capitalize()) # turns the starting line character to an uppercase
print(name.upper()) # turns string to uppercase
print(name.lower()) # turns string to lowercase
print(name.isspace()) # checks if the string contains only spaces
print(name.startswith("A")) # checks if the string starts with a particular character
print(name.endswith("n")) # checks if the string ends with a particular characterprint(name.replace("a", "@")) # replaces a character with another character
print(name.split(" ")) # splits the string based on a particular character and returns a list
print(name.replace("a", "@")) # replaces a character with another character
# print(name.index("e")) # returns the index of a particular character



# Numeric Attribute Methods
num = input("Enter a number: ")
credit_card = "1234 5678 9876 5432"

print(num.isalnum()) # checks if the string contains only alphanumeric characters
print(num.isdigit()) # checks if the string contains only digits
print(num.isdecimal()) # checks if the string contains only decimal characters
print(num.count("1")) # counts the occurrences of a particular character
print(num.zfill(5)) # pads the string on the left with zeros to make it of a certain length
print(num.replace(" ", "-")) # replaces a character with another character

# Syntax for numeric list = list(range(start : stop : step))
print(credit_card[::2]) # slices the string to get every second character
print(credit_card[::-1]) # reverses the string
print(credit_card[:4]) # slices the string to get the first four characters
print(credit_card[-4:]) # slices the string to get the last four characters



# List Attribute Methods
fruits = ["apple", "banana", "cherry", "apple", "kiwi", "banana", "mango"]
print(fruits.count("apple")) # counts the occurrences of a particular element
print(fruits.index("banana")) # returns the index of a particular element
fruits.append("orange") # adds an element to the end of the list
print(fruits)
fruits.insert(2, "grape") # inserts an element at a specific position in the list
print(fruits)
fruits.remove("banana") # removes the first occurrence of a particular element from the list
print(fruits)
fruits.pop() # removes the last element from the list
print(fruits)
fruits.sort() # sorts the elements of the list in ascending order
print(fruits)
fruits.sort(reverse=True) # sorts the elements of the list in descending order
print(fruits)
fruits.reverse() # reverses the order of the elements in the list
print(fruits)

for fruit in fruits:
    print(fruit, end=" ")


# format specifiers syntax = {variable_name:format_specifier}
number = 1234567.8910
print(f"{number:,}") # adds commas as thousand separators
print(f"{number:.2f}") # formats the number to 2 decimal places
print(f"{number:e}") # formats the number in scientific notation
print(f"{number:%}") # formats the number as a percentage
print(f"{number:^20}") # center aligns the number within a field of given width
print(f"{number:<20}") # left aligns the number within a field of given width
print(f"{number:>20}") # right aligns the number within a field of given width
print(f"{number:+}") # adds a plus sign for positive numbers
print(f"{number:-}") # adds a minus sign for negative numbers only
print(f"{number:020}") # pads the number with leading zeros to make it of a certain width

# multiple format specifiers
print(f"{number:,.2f}") # adds commas as thousand separators and formats to 2 decimal places
print(f"{number:020,.2f}") # pads with leading zeros to make it of width 9 and formats to 2 decimal places