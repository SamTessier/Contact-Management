import express from "express";
import cors from "cors";
import routerFactory, { connection } from "./routerFactory";
import expressSession from "express-session";
import createMemoryStore from "memorystore";
import bcrypt from "bcrypt";
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const MemoryStore = createMemoryStore(expressSession);

const sessionStore = new MemoryStore({
  checkPeriod: 86400000
});

app.use(
  expressSession({
    secret: "marty-for-now",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

app.use("/staff", routerFactory("staff"));
app.use("/students", routerFactory("students"));
app.use("/schools", routerFactory("schools"));
app.use("/parents", routerFactory("parents"));

app.get("/students/:studentId/parents", (req, res) => {
  const sql =
    "SELECT parents.* FROM parents INNER JOIN students_parents ON parents.person_id = students_parents.parent_id WHERE students_parents.student_id = ?";
  connection.query(sql, req.params.studentId, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/createUser", async (req, res) => {
  try {
      const { username, email, password, role_name } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `
          INSERT INTO users (username, email, password_hash, role_name)
          VALUES (?, ?, ?, ?)
      `;

      await queryAsync(sql, [username, email, hashedPassword, role_name]);
      
      res.json({ success: true, message: 'User created successfully' });

  } catch (error) {
      res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

app.get("/userState", (req, res) => {
    const userId = req.session.userId; 

    if (!userId) {
        res.status(401).json({ error: "User not logged in" });
        return;
    }

    const sql = `
        SELECT role_name FROM users 
        WHERE user_id = ?
    `;

    connection.query(sql, userId, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const { role_name } = results[0];
        res.json({ role: role_name });
    });
});

const setupDb = () => {
  const tablesCreationQueries = [
    `CREATE TABLE IF NOT EXISTS roles (
      role_name TEXT PRIMARY KEY
    );`,
    `INSERT INTO roles (role_name) VALUES ('admin'), ('manager'), ('staff');`,
    `CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE,
      email VARCHAR(255) UNIQUE,
      password_hash TEXT,
      role_name TEXT,
      FOREIGN KEY (role_name) REFERENCES roles(role_name)
    );`,

    `CREATE TABLE IF NOT EXISTS user_roles (
      user_id BIGINT UNSIGNED,
      role_id BIGINT UNSIGNED,
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (role_id) REFERENCES roles(role_id)
    );`,
    `
      CREATE TABLE IF NOT EXISTS addresses (
          address_id SERIAL PRIMARY KEY,
          street TEXT,
          city TEXT,
          country TEXT,
          postal_code TEXT
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS people (
          person_id SERIAL PRIMARY KEY,
          name TEXT,
          phone TEXT,
          email TEXT,
          address_id BIGINT UNSIGNED,
          allergies_medical TEXT,
          created_at TIMESTAMP,
          updated_at TIMESTAMP,
          FOREIGN KEY (address_id) REFERENCES addresses(address_id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS schools (
          school_id SERIAL PRIMARY KEY,
          name TEXT,
          address_id BIGINT UNSIGNED,
          phone TEXT,
          email TEXT,
          created_at TIMESTAMP,
          FOREIGN KEY (address_id) REFERENCES addresses(address_id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS people_schools (
          person_id BIGINT UNSIGNED,
          school_id BIGINT UNSIGNED,
          FOREIGN KEY (person_id) REFERENCES people(person_id),
          FOREIGN KEY (school_id) REFERENCES schools(school_id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS staff_roles (
          role_id SERIAL PRIMARY KEY,
          role_name TEXT,
          role_pay_rate TEXT
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS staff (
          person_id BIGINT UNSIGNED,
          role_id BIGINT UNSIGNED,
          primary_location_id BIGINT UNSIGNED,
          FOREIGN KEY (person_id) REFERENCES people(person_id),
          FOREIGN KEY (role_id) REFERENCES staff_roles(role_id),
          FOREIGN KEY (primary_location_id) REFERENCES addresses(address_id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS parents (
          person_id SERIAL PRIMARY KEY,
          FOREIGN KEY (person_id) REFERENCES people(person_id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS students_parents (
          student_id BIGINT UNSIGNED,
          parent_id BIGINT UNSIGNED,
          FOREIGN KEY (student_id) REFERENCES students(person_id),
          FOREIGN KEY (parent_id) REFERENCES parents(person_id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS students (
          person_id SERIAL PRIMARY KEY,
          FOREIGN KEY (person_id) REFERENCES people(person_id)
      );
    `,
  ];

tablesCreationQueries.forEach((query) => {
  connection.query(query, (err) => {
    if (err) throw err;
    console.log("Database table created");
  });
});
};

setupDb();

const initializeGodUser = async () => {
  try {
      const sqlCheckUsers = 'SELECT COUNT(*) as count FROM users';
      const results: any = await queryAsync(sqlCheckUsers);

      if (results[0].count === 0) {
          console.log("No users found. Initializing god user...");

          const godUsername = "goduser"; 
          const godEmail = "goduser@sammysapp.com"; 
          const godPassword = "password"; 
          const hashedPassword = await bcrypt.hash(godPassword, 10);

          const sqlInsertGodUser = `
              INSERT INTO users (username, email, password_hash, role_name)
              VALUES (?, ?, ?, 'admin')
          `;

          await queryAsync(sqlInsertGodUser, [godUsername, godEmail, hashedPassword]);
          console.log("God user initialized!");
      }
  } catch (error) {
      console.error("Error initializing god user:", error);
  }
};

initializeGodUser();


app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});
