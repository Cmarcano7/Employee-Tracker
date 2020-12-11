function createRole() {
    if (err) throw err;
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
            employeeQuestionaire();
        });
    });
};

module.exports = { createRole };