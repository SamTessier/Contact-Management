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

app.get("/schools", (req, res) => {
  const sql = 'SELECT * FROM schools';
  connection.query(sql, (err, results) => {
    if(err) throw err;
    res.json(results);
  });
});

app.post("/schools", (req, res) => {
  const sql = 'INSERT INTO schools SET ?';
  const newSchool = req.body;
  connection.query(sql, newSchool, (err, result) => {
    if(err) throw err;
    res.json({ status: "ok" });
  });
});

app.put("/schools/:id", (req, res) => {
  const sql = 'UPDATE schools SET ? WHERE id = ?';
  const updatedSchool = req.body;
  connection.query(sql, [updatedSchool, req.params.id], (err, result) => {
    if(err) throw err;
    res.json({ status: "ok" });
  });
});

app.delete("/schools/:id", (req, res) => {
  const sql = 'DELETE FROM schools WHERE id = ?';
  connection.query(sql, req.params.id, (err, result) => {
    if(err) throw err;
    res.json({ status: "ok" });
  });
});

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

const setupDb = () => {
    const createSchoolsTable = `CREATE TABLE IF NOT EXISTS schools(
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255),
        phoneNumber VARCHAR(255),
        email VARCHAR(255),
        contactPerson VARCHAR(255),
        notes TEXT
    );`;

    connection.query(createSchoolsTable, function(err, results, fields) {
        if (err) throw err;
        console.log("Schools table created");
    });
}

setupDb();
