-- Making sure the correct database is used --
USE employee_db;

-- Inserting Department into database --
INSERT INTO department (department_id, name) 
VALUES (1000, "management");

INSERT INTO department (department_id, name) 
VALUES (2000, "engineering");

INSERT INTO department (department_id, name) 
VALUES (3000, "service");

INSERT INTO department (department_id, name) 
VALUES (4000, "production");

INSERT INTO department (department_id, name) 
VALUES (5000, "IT");

-- Inserting roles specific to each department --

INSERT INTO role (role_id, title, salary, department_id)
VALUE (100, "CEO", 132000, 1000);

INSERT INTO role (role_id, title, salary, department_id)
VALUE (110, "Operations Manager", 87000, 1000);

INSERT INTO role (role_id, title, salary, department_id)
VALUE (120, "Staff Manager", 65000, 1000);

INSERT INTO role (role_id, title, salary, department_id)
VALUE (130, "IT Manager", 75000, 1000);

INSERT INTO role (role_id, title, salary, department_id)
VALUE (200, "Lead Engineer", 72000, 2000);

INSERT INTO role (role_id, title, salary, department_id)
VALUE (210, "Electrical Engineer", 56000, 2000);

INSERT INTO role (role_id, title, salary, department_id)
VALUE (220, "Mechanical Engineer", 52000, 2000);

INSERT INTO role (role_id, title, salary, department_id)
VALUE (300, "Service Lead", 45000, 3000);

INSERT INTO role (role_id, title, salary, department_id)
VALUE (310, "Technical Service Engineer", 42000, 3000);

INSERT INTO role (role_id, title, salary, department_id)
VALUE (400, "Production Lead", 40000, 4000);

INSERT INTO role (role_id, title, salary, department_id)
VALUE (410, "Common Production Role", 30000, 4000);

INSERT INTO role (role_id, title, salary, department_id)
VALUE (500, "IT Lead", 60000, 5000);

INSERT INTO role (role_id, title, salary, department_id)
VALUE (510, "IT Support", 47000, 5000);