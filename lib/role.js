const inquirer = require("inquirer");
const mysql = require("mysql");

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

function createRole() {
    inquirer
    .prompt([
        {
            name: "roleId",
            type: "input",
            message: "What is the role's ID?"
        },
        {
            name: "roleTitle",
            type: "input",
            message: "What is the role's title?"
        },{
            name: "roleSalary",
            type: "input",
            message: "What is the role's salary?"
        },
        {
            name: "depId",
            type: "input",
            message: "What is the department's ID?"
        }
    ])
    .then(answer => {
        connection.query("INSERT INTO role (role_id, title, salary, department_id) VALUES (?,?,?,?)", [answer.roleId, answer.roleTitle, answer.roleSalary, answer.depId], function(err, res) {
            if (err) throw err;
            console.log('Role' + answer.roleTitle + ' added');
        });
    });
};

module.exports = { createRole };