const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const boxen = require('boxen');
const dep = require("./lib/department");
const role = require("./lib/role");
const employee = require("./lib/employee");
let roleArr = [];

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
    console.log(boxen('Employee Tracker', {padding: 1, margin: 1, borderStyle: 'bold'}));
    employeeQuestionaire();
});

var choice = [{
    name: "action",
    type: "list",
    message: "What would you like to choose?",
    choices: [
        "Department",
        "Role",
        "Employee",
        "Back"
    ]
}];

function roles() {
    connection.query("SELECT title FROM role", function (err, roles) {
      if (err) throw err;
      roleArr = [];
      for (i = 0; i < roles.length; i++) {
        roleArr.push(roles[i].title);
      };
    });
}

function employeeQuestionaire() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Welcome, what would you like to do?",
            choices: [
                "Add department, role, employee",
                "View department, role, employee",
                "Update an employee's role",
                "Exit"
            ]
        })
        .then(answer => {
            switch(answer.action) {
            case "Add department, role, employee":
                createRow();
                break;
            
            case "View department, role, employee":
                responseRow();
                break;
            
            case "Update an employee's role":
                updateEmployee();
                break;

            case "Exit":
                connection.end();
                break;
        };
    });
    roles();
};

function createRow() {
    inquirer.prompt(choice)
    .then(answer => {
        switch(answer.action) {
            case "Department":
                createDepartment();
                break;
            case "Role":
                createRole();
                break;
            case "Employee":
                createEmployee();
                break;
            case "Back":
                employeeQuestionaire();
                break;
        }
    })
};

function responseRow() {
    inquirer.prompt(choice)
    .then(answer => {
        switch(answer.action) {
            case "Department":
                responseDepartment();
                break;
            case "Role":
                responseRole();
                break;
            case "Employee":
                responseEmployee();
                break;
            case "Back":
                employeeQuestionaire();
                break;
        }
    })
};

function responseDepartment() {
    connection.query("SELECT department_id, name FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        employeeQuestionaire();
    });
};

function responseEmployee() {
    connection.query("SELECT employee_id, first_name, last_name, manager_id, role.title, role.salary, department.name FROM employee INNER JOIN role on role.role_id = employee.role_id INNER JOIN department on department.department_id = role.department_id;", function(err, res) {
        if (err) throw err;
        console.table(res);
        employeeQuestionaire();
    });
};

function responseRole() {
    connection.query("SELECT role_id, title, salary, department.name FROM role INNER JOIN department on department.department_id = role.department_id", function(err, res) {
        if (err) throw err;
        console.table(res);
        employeeQuestionaire();
    });
};

function updateEmployee() {
    connection.query(
      "SELECT concat(employee.first_name, ' ' ,  employee.last_name) AS Name FROM employee",
      function (err, res) {
        if (err) throw err;
        empArr = [];
        for (i = 0; i < res.length; i++) {
          empArr.push(res[i].Name);
        }
        connection.query("SELECT * FROM role", function (err, res2) {
          if (err) throw err;
          inquirer
            .prompt([
              {
                name: "empList",
                type: "list",
                message: "Which employee's role would you like to change?",
                choices: empArr,
              },
              {
                name: "roleChoice",
                type: "list",
                message: "What is the employee's new role?",
                choices: roleArr,
              },
            ])
            .then(function (answer) {
              let roleID;
              for (let r = 0; r < res2.length; r++) {
                if (res2[r].title == answer.roleChoice) {
                  roleID = res2[r].role_id;
                }
              }
              // when finished prompting, update the db with that info
              connection.query(
                'UPDATE employee SET role_id = ? WHERE employee_id = (SELECT employee_id FROM(SELECT employee_id FROM employee WHERE CONCAT(first_name," ", last_name) = ?) AS NAME)',
                [roleID, answer.employeeChoice],
                function (err, res3) {
                  if (err) throw err;
                }
              );
              employeeQuestionaire();
            });
        });
      }
    );
};

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
            console.log('Department ' + answer.depName + ' added');
            employeeQuestionaire();
        });
    });
};

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
            console.log('Role ' + answer.roleTitle + ' added');
            employeeQuestionaire();
        });
    });
};

function createEmployee() {
    inquirer
    .prompt([
        {
            name: "empId",
            type: "input",
            message: "What is the employee's ID?"
        },
        {
            name: "empFirst",
            type: "input",
            message: "What is the employee's first name?"
        },{
            name: "empLast",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "roleId",
            type: "input",
            message: "What is the employee's role ID?"
        },
        {
            name: "managerId",
            type: "input",
            message: "What is the employee's manager ID?"
        }
    ])
    .then(answer => {
        connection.query("INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (?,?,?,?,?)", [answer.empId, answer.empFirst, answer.empLast, answer.roleId, answer.managerId], function(err, res) {
            if (err) throw err;
            console.log('Employee ' + answer.empFirst + ' ' + answer.empLast + ' added');
            employeeQuestionaire();
        });
    });
};
