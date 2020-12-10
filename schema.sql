-- Creating Database within our system --

CREATE DATABASE employee_db;

-- Creating our tables necessary for our code --

CREATE TABLE department (
    department_id INTEGER(10) NOT NULL,
    name VARCHAR (30) NOT NULL,
    PRIMARY KEY (department_id)
);

CREATE TABLE role (
    role_id INTEGER(10) NOT NULL,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL (7,2) NOT NULL,
    department_id INTEGER NOT NULL,
    PRIMARY KEY (role_id),
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee (
    employee_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER(10),
    PRIMARY KEY (employee_id),
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);
