import express from "express";
import cors from "cors";
import mysql from "mysql";
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

app.get("/staff", (req, res) => {
  const sql = 'SELECT * FROM staff';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/staff", (req, res) => {
  const sql = 'INSERT INTO staff SET ?';
  const newStaffMember = req.body;
  connection.query(sql, newStaffMember, (err, result) => {
    if (err) throw err;
    res.json({ status: "ok" });
  });
});

app.put("/staff/:id", (req, res) => {
  const sql = 'UPDATE staff SET ? WHERE person_id = ?';
  const updatedStaffMember = req.body;
  connection.query(sql, [updatedStaffMember, req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ status: "ok" });
  });
});

app.delete("/staff/:id", (req, res) => {
  const sql = 'DELETE FROM staff WHERE person_id = ?';
  connection.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.json({ status: "ok" });
  });
});

app.get("/students", (req, res) => {
  const sql = 'SELECT * FROM students';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/students", (req, res) => {
  const sql = 'INSERT INTO students SET ?';
  const newStudent = req.body;
  connection.query(sql, newStudent, (err, result) => {
    if (err) throw err;
    res.json({ status: "ok" });
  });
});

app.put("/students/:id", (req, res) => {
  const sql = 'UPDATE students SET ? WHERE person_id = ?';
  const updatedStudent = req.body;
  connection.query(sql, [updatedStudent, req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ status: "ok" });
  });
});

app.delete("/students/:id", (req, res) => {
  const sql = 'DELETE FROM students WHERE person_id = ?';
  connection.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.json({ status: "ok" });
  });
});

app.get("/schools", (req, res) => {
  const sql = 'SELECT * FROM schools';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/schools", (req, res) => {
  const sql = 'INSERT INTO schools SET ?';
  const newSchool = req.body;
  connection.query(sql, newSchool, (err, result) => {
    if (err) throw err;
    res.json({ status: "ok" });
  });
});

app.put("/schools/:id", (req, res) => {
  const sql = 'UPDATE schools SET ? WHERE id = ?';
  const updatedSchool = req.body;
  connection.query(sql, [updatedSchool, req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ status: "ok" });
  });
});

app.delete("/schools/:id", (req, res) => {
  const sql = 'DELETE FROM schools WHERE id = ?';
  connection.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.json({ status: "ok" });
  });
});

app.get("/parents", (req, res) => {
  const sql = 'SELECT * FROM parents';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/parents", (req, res) => {
  const sql = 'INSERT INTO parents SET ?';
  const newParent = req.body;
  connection.query(sql, newParent, (err, result) => {
    if (err) throw err;
    res.json({ status: "ok" });
  });
});

app.put("/parents/:id", (req, res) => {
  const sql = 'UPDATE parents SET ? WHERE person_id = ?';
  const updatedParent = req.body;
  connection.query(sql, [updatedParent, req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ status: "ok" });
  });
});

app.delete("/parents/:id", (req, res) => {
  const sql = 'DELETE FROM parents WHERE person_id = ?';
  connection.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.json({ status: "ok" });
  });
});

app.get("/students/:studentId/parents", (req, res) => {
  const sql = 'SELECT parents.* FROM parents INNER JOIN students_parents ON parents.person_id = students_parents.parent_id WHERE students_parents.student_id = ?';
  connection.query(sql, req.params.studentId, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


const setupDb = () => {
    const createAddressesTable = `
        CREATE TABLE IF NOT EXISTS addresses (
            address_id INT PRIMARY KEY,
            street TEXT,
            city TEXT,
            country TEXT,
            postal_code TEXT
        );
    `;
    
    const createPeopleTable = `
        CREATE TABLE IF NOT EXISTS people (
            person_id INT PRIMARY KEY,
            name TEXT,
            phone TEXT,
            email TEXT,
            address_id INT,
            school_id INT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            FOREIGN KEY (address_id) REFERENCES addresses(address_id),
            FOREIGN KEY (school_id) REFERENCES schools(school_id)
        );
    `;
    
    const createSchoolsTable = `
        CREATE TABLE IF NOT EXISTS schools (
            school_id INT PRIMARY KEY,
            name TEXT,
            phone TEXT,
            created_at TIMESTAMP
        );
    `;
    
    const createStaffRolesTable = `
        CREATE TABLE IF NOT EXISTS staff_roles (
            role_id INT PRIMARY KEY,
            role_name TEXT,
            role_pay_rate TEXT
        );
    `;
    
    const createStaffTable = `
        CREATE TABLE IF NOT EXISTS staff (
            person_id INT,
            role_id INT,
            primary_location_id INT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            FOREIGN KEY (person_id) REFERENCES people(person_id),
            FOREIGN KEY (role_id) REFERENCES staff_roles(role_id),
            FOREIGN KEY (primary_location_id) REFERENCES addresses(address_id)
        );
    `;
    
    const createParentsTable = `
        CREATE TABLE IF NOT EXISTS parents (
            person_id INT PRIMARY KEY,
            FOREIGN KEY (person_id) REFERENCES people(person_id)
        );
    `;
    
    const createStudentsParentsTable = `
        CREATE TABLE IF NOT EXISTS students_parents (
            student_id INT,
            parent_id INT,
            FOREIGN KEY (student_id) REFERENCES students(person_id),
            FOREIGN KEY (parent_id) REFERENCES parents(person_id)
        );
    `;
    
    const createStudentsTable = `
        CREATE TABLE IF NOT EXISTS students (
            person_id INT PRIMARY KEY,
            allergies_medical TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            FOREIGN KEY (person_id) REFERENCES people(person_id)
        );
    `;
    
    const createTablesQuery = `
        ${createAddressesTable}
        ${createPeopleTable}
        ${createSchoolsTable}
        ${createStaffRolesTable}
        ${createStaffTable}
        ${createParentsTable}
        ${createStudentsParentsTable}
        ${createStudentsTable}
    `;

    connection.query(createTablesQuery, function(err, results, fields) {
        if (err) throw err;
        console.log("Database tables created");
    });
}

setupDb();

