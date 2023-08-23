import express from "express";
import cors from "cors";
import routerFactory, { connection } from "./routerFactory"; 
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/staff", routerFactory("staff"));
app.use("/students", routerFactory("students"));
app.use("/schools", routerFactory("schools"));
app.use("/parents", routerFactory("parents"));

app.get("/students/:studentId/parents", (req, res) => {
  const sql = 'SELECT parents.* FROM parents INNER JOIN students_parents ON parents.person_id = students_parents.parent_id WHERE students_parents.student_id = ?';
  connection.query(sql, req.params.studentId, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const setupDb = () => {
  const tablesCreationQueries = [
    `
      CREATE TABLE IF NOT EXISTS addresses (
          address_id INT PRIMARY KEY,
          street TEXT,
          city TEXT,
          country TEXT,
          postal_code TEXT
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS people (
          person_id INT PRIMARY KEY,
          name TEXT,
          phone TEXT,
          email TEXT,
          address_id INT,
          allergies_medical TEXT,
          created_at TIMESTAMP,
          updated_at TIMESTAMP,
          FOREIGN KEY (address_id) REFERENCES addresses(address_id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS schools (
          school_id INT PRIMARY KEY,
          name TEXT,
          address_id INT,
          phone TEXT,
          email TEXT,
          created_at TIMESTAMP,
          FOREIGN KEY (address_id) REFERENCES addresses(address_id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS people_schools (
          person_id INT,
          school_id INT,
          FOREIGN KEY (person_id) REFERENCES people(person_id),
          FOREIGN KEY (school_id) REFERENCES schools(school_id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS staff_roles (
          role_id INT PRIMARY KEY,
          role_name TEXT,
          role_pay_rate TEXT
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS staff (
          person_id INT,
          role_id INT,
          primary_location_id INT,
          FOREIGN KEY (person_id) REFERENCES people(person_id),
          FOREIGN KEY (role_id) REFERENCES staff_roles(role_id),
          FOREIGN KEY (primary_location_id) REFERENCES addresses(address_id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS parents (
          person_id INT PRIMARY KEY,
          FOREIGN KEY (person_id) REFERENCES people(person_id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS students_parents (
          student_id INT,
          parent_id INT,
          FOREIGN KEY (student_id) REFERENCES students(person_id),
          FOREIGN KEY (parent_id) REFERENCES parents(person_id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS students (
          person_id INT PRIMARY KEY,
          FOREIGN KEY (person_id) REFERENCES people(person_id)
      );
    `
  ];

  tablesCreationQueries.forEach(query => {
    connection.query(query, (err) => {
      if (err) throw err;
      console.log("Database table created");
    });
  });
}

setupDb();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
