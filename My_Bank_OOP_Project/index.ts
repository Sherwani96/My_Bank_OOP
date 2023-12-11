#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { faker } from "@faker-js/faker";
import { welcome } from "./welcome.js";

// class for customer
class Customer {
    firstName: string;
    lastName: string;
    mobNo: number;
    gender: string;
    age: number;
    accoutNumber: number;
    constructor(fName: string, lName: string, mobNo: number, gender: string, age: number, accNo: number) {
        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
        this.mobNo = mobNo;
        this.gender = gender;
        this.accoutNumber = accNo;
    };
};

// interface for customer account details
interface CustomerDetails {
    accNo: number;
    accBal: number;
};

// class for bank service functionality
class Bank {
    customer: Customer[] = [];
    account: CustomerDetails[] = [];

    addCustomer(obj: Customer) {
        this.customer.push(obj);
    };
    
    addAccountNo (obj: CustomerDetails) {
        this.account.push(obj);
    };

    depositAmount(obj: CustomerDetails) {
        this.account.push(obj);
    };

    cashWithdraw(obj: CustomerDetails) {
        myBank.account.push(obj);
    };
};

// call for welcome func
await welcome();

// My bank service
let myBank = new Bank();

//  for loop for random generation of customers
for (let i = 1; i < 4; i++) {
    let fName: string = faker.person.firstName();
    let lName: string = faker.person.lastName();
    let mobNo: number = faker.number.int({min: 1000000000, max: 10000000000})
    let gender: string = faker.person.sex();
    let age: number = faker.number.int({min: 20, max: 82});
    const cus = new Customer(fName, lName, mobNo, gender, age, 2020 + i);
    myBank.addCustomer(cus);
    myBank.addAccountNo({accNo: cus.accoutNumber, accBal: 2000 * i})
};

// async func for bank functionality service
async function bankFunctionality(myBank: Bank) {
    // prompt for bank service options
    let service = await inquirer.prompt([
        {
            type: "list",
            name: "opts",
            choices: ["Account Balance", "Cash Deposit", "Cash Withdraw"],
            message: "Please choose service: ",
        }
    ]);
    // checking Account Balance functionality
    if (service.opts == "Account Balance") {                      // account balance functionality
        // prompt
        let askUser = await inquirer.prompt([
            {
                name: "resp",
                type: "input",
                message: "Enter your Account No: ",
            }
        ]);
        // checking for customer validation
        let userAccountno = myBank.account.find((acc) =>  acc.accNo == askUser.resp);
        let userAccount = myBank.customer.find((item) => item.accoutNumber == askUser.resp);
        //  conditions
        if (!userAccountno) {
            console.log(chalk.yellow.bold(`Invalid Account No.`))
        } else {
            console.log(chalk.blue(`${chalk.green.bold(userAccount?.firstName)} your Balance is ${chalk.green.bold(userAccountno.accBal)}`))

        }  
    } else if (service.opts == "Cash Deposit") {            // cash deposit functionality
        // cash deposit functionality
        let askUser = await inquirer.prompt([
            {
                name: "resp",
                type: "input",
                message: "Enter your Account No: ",
            }
        ]);
        // checking for customer validation
        let userAccountno = myBank.account.find((acc) =>  acc.accNo == askUser.resp);
        let userAccount = myBank.customer.find((item) => item.accoutNumber == askUser.resp);
        
        // conditions
        if (!userAccountno) {
            console.log(chalk.yellow.bold(`Invalid Account No.`))
        } else {
            let amount = await inquirer.prompt([
                {
                    name: "deposit",
                    type: "number",
                    message: "Enter your Deposit Amount: "
                }
            ])

            //  sttoring data for customer deposit
            let depositAmount = amount.deposit;
            let finalBalance = amount.deposit + userAccountno?.accBal
            myBank.depositAmount(finalBalance);
            console.log(chalk.blue(`${chalk.green.bold(userAccount?.firstName)} your New Balance is ${chalk.green.bold(finalBalance)}`));
        }

    } else if (service.opts == "Cash Withdraw") {      // cash withdraw functionality
        // cash withdraw functionality

        let askUser = await inquirer.prompt([
            {
                name: "resp",
                type: "input",
                message: "Enter your Account No: ",
            }
        ]);
        
        // checking for customer validation 
        let userAccountno = myBank.account.find((acc) =>  acc.accNo == askUser.resp);
        let userAccount = myBank.customer.find((item) => item.accoutNumber == askUser.resp);
            
        //  conditions
        if (!userAccountno) {
            console.log(chalk.yellow.bold(`Invalid Account No.`))
        } else {
            // let userAccountno = myBank.account.find((acc) =>  acc.accNo == askUser.resp);
            // let userAccount = myBank.customer.find((item) => item.accoutNumber == askUser.resp);
            let amount = await inquirer.prompt([
                {
                    name: "withdraw",
                    type: "number",
                    message: "Enter your Withdrawal Amount: "
                }
            ]);

            // storing and updating customer data
            let userBal = myBank.account.find((acc) => acc.accNo == askUser.resp);
            let withdrawAmount:number = amount.withdraw;
            let percent = withdrawAmount/100
            let balance = Number(userBal?.accBal) - Number(withdrawAmount) - percent;
            let ratio = Number(userBal?.accBal) - percent
            myBank.cashWithdraw({accBal: balance, accNo: Number(userBal?.accNo)});
            
            // some more conditions for functionality
            if (withdrawAmount > ratio) {
                console.log(chalk.blue(`${chalk.green.bold(userAccount?.firstName)}, ${chalk.green.bold(`You have Insufficient Balance to make this Transaction`)}`))

            } else if (withdrawAmount <= ratio) {
                console.log(`${chalk.magenta(`${chalk.green.bold(userAccount?.firstName)} Transaction is Successfull, your new Balance is ${chalk.green.bold(balance)}`)}`);
                console.log(`${chalk.green(`${chalk.green.bold(percent)} ${chalk.cyan.bold(`Rupees are charged for the Transaction`)}`)}`)
            }
        }
    }
}

// calling function
bankFunctionality(myBank);

// console.log(myBank)