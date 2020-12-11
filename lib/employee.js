function createEmployee() {
    if (err) throw err;
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

module.exports = { createEmployee };