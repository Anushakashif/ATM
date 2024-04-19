#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 10000; //Dollar
let myPin = 8989;
// print welcome message
console.log(chalk.blue("\n \tWelcome\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.yellow("Enter your pin:"),
        type: "number"
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nPin is Correct!\n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "Please select option:",
            type: "list",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select withdrawal method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "select Amount:",
                    choices: ["5000", "10000", "25000", "50000"]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} successfully withdraw`);
                console.log(`your remaining balance is : ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "Enter the amount to withdraw:",
                    type: "number"
                }
            ]);
            // =, -=, +=
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} successfully withdraw`);
                console.log(`Your remaining balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(`Your Account balance is: ${myBalance}`);
    }
}
else {
    console.log(chalk.red("Pin is Incorrect, Try Again!"));
}
