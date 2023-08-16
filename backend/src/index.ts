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

// Your API routes

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

const setupDb = () => {
    const createAddressesTable = `
        CREATE TABLE IF NOT EXISTS addresses (
            address_id INT PRIMARY KEY,
            street TEXT,
            city TEXT,
            state TEXT,
            zip_code TEXT
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

