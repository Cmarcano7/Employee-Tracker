var mysql = require("mysql");
var inquirer = require("inquirer");

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
    console.log("Connected");
});