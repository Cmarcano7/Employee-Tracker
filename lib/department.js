function createDepartment() {
    if (err) throw err;
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
            employeeQuestionaire();
        });
    });
};

module.exports = { createDepartment };