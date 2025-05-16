/*
Scenario:
You’ve been hired to help a local pet shelter digitize its animal adoption records. The program is meant to:
  
  Allow users to enter an animal type and adoption fee.
  
  Add the animal and fee to a list.
  
  Retrieve the adoption fee for a specific animal when requested.

However, the initial developer left the program in a buggy state, with missing exception-handling logic and some errors in the implementation. Your job is to fix it!

Instructions
Start by Understanding the Errors:
Run the program and observe the exceptions that occur. Document what the exceptions are and where they happen.

    Throws an error at "loader:1228"
    Cannot find module 'readline-sync' and requires stack --- Had to install npm
    Module not found

Write Exception Handling Code:
Use try/catch blocks to handle the errors so the program doesn’t crash when incorrect input or unexpected situations occur.

Test and Debug:
Test the program with valid and invalid inputs to confirm that exceptions are handled gracefully
and the program continues running as intended.
*/

// Will need to import / install readline-sync if not done so already within project dir:
// Entered into terminal: 'npm install readline-sync'
const readlineSync = require("readline-sync");

// Initial Code with Bugs (modified to use readline-sync)
let animals = [];
let fees = [];
function addAnimal(name, fee) {
  if (!name || fee < 0) {
    throw new Error("Invalid animal name or adoption fee!");
  }
  animals.push(name);
  fees.push(fee);
}
function getAdoptionFee(animalName) {
  let index = animals.indexOf(animalName);
  if (index === -1) {
    throw new Error("Animal not found in records!");
  }
  return fees[index];
}
// Main program
console.log("Welcome to the Pet Shelter System");
while (true) {
  let action = readlineSync
    .question("Choose an action: 'add', 'fee', or 'exit': ")
    .toLowerCase();
  if (action === "exit") {
    console.log("Goodbye!");
    break;
  }
  if (action === "add") {
    let animal = readlineSync.question("Enter the animal's name: ");
    let fee = Number(readlineSync.question("Enter the adoption fee: "));
    try {
      addAnimal(animal, fee);
      console.log(`${animal} added with a fee of $${fee}.`);
      console.log("Thank you for the correct data.");
    } catch (error) {
      console.log("You entered an incorrect name or fee.");
    }
  } else if (action === "fee") {
    try {
      let animal = readlineSync.question(
        "Enter the animal's name to find its adoption fee: "
      );
      console.log(`${animal}'s adoption fee is $${getAdoptionFee(animal)}.`);
      console.log("Thank you for the correct data.");
    } catch (error) {
      console.log(
        "Sorry. That is either incorrect data or that animal does not exist in our records."
      );
    }
  } else {
    console.log("Invalid action. Please choose 'add', 'fee', or 'exit'.");
  }
}

/*
Problems to Solve

Invalid Input Errors:
  What happens if the user provides a negative adoption fee or leaves the name blank?

    For a -1 in fee, it throws an error for invalid animal or fee!
    For no name, it let me enter a fee, but then threw the error.

  What happens if the user tries to find the fee for an animal that hasn’t been added?

    It throws the error 'Animal not found in records!'

Code Flow Problems:
  What happens if the program throws an exception? Does the rest of the code continue running?

    When no name is entered it continues to run, but for any other error it immediately stops.

Structured Exception Handling:
  Add try/catch blocks to handle the above errors gracefully.
*/
