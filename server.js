const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    // Host name
    host: "localhost",
    // Port Used for app, can be changed depending on users port
    port: 3306,
    // Username and password for the port, can be changed depending on user
    user: "root",
    password: "rootroot",
    // Name of database, dependent on the schema
    database: "employee_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    employeeQuestionaire();
});

function employeeQuestionaire() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Welcome, what would you like to do?",
            choice: [
                "Add department, role, employee",
                "View department, role, employee",
                "Update an employee's role",
                "Exit"
            ]
        })
        .then(function(answer){
            switch(answer.action) {
            case "Add department, role, employee":
                createRow();
                break;
            
            case "View  department, role, employee":
                responseRow();
                break;
            
            case "Update an employee's role":
                updateRow();
                break;

            case "Exit":
                connection.end();
                break;
        };
    });
};
