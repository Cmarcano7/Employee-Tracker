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

function createDepartment() {
    inquirer
    .prompt([
        {
            name: "depId",
            type: "input",
            message: "What is the department's ID?"
        },
        {
            name: "depName",
            type: "input",
            message: "What is the department's name?"
        }
    ])
    .then(answer => {
        connection.query("INSERT INTO department (department_id, name) VALUES (?,?)", [answer.depId, answer.depName], function(err, res) {
            if (err) throw err;
            console.log('Department' + answer.depName + ' added');
        });
    });
};

module.exports = { createDepartment };