import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routerFactory, { queryAsync } from "./routerFactory";
import expressSession, { SessionData } from "express-session";
import createMemoryStore from "memorystore";
import bcrypt from "bcrypt";
require("dotenv").config();

declare module "express-session" {
  interface SessionData {
    userId?: number;  
  }
}

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const MemoryStore = createMemoryStore(expressSession);

const sessionStore = new MemoryStore({
  checkPeriod: 86400000,
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

app.get("/students/:studentId/parents", async (req: Request, res: Response) => {
  const sql =
    "SELECT parents.* FROM parents INNER JOIN students_parents ON parents.person_id = students_parents.parent_id WHERE students_parents.student_id = ?";
  try {
    const results = await queryAsync(sql, [req.params.studentId]);
    res.json(results);
  } catch (err) {
    throw err;
  }
});

const authorizeAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.session.userId;
  if (!userId) {
    return res
      .status(401)
      .json({ error: { code: 401, message: "User not logged in" } });
  }

  const roleCheckSql = "SELECT role_name FROM users WHERE user_id = ?";
  try {
    const results = (await queryAsync(roleCheckSql, [userId])) as { role_name: string }[];
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: { code: 404, message: "User not found" } });
    }
    const role = results[0].role_name;
    if (role !== "admin") {
      return res
        .status(403)
        .json({ error: { code: 403, message: "Unauthorized" } });
    }
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal Server Error" } });
  }
};

app.post("/user", authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { username, email, password, role_name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (username, email, password_hash, role_name) VALUES (?, ?, ?, ?)";
    await queryAsync(sql, [username, email, hashedPassword, role_name]);
    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: "Something went wrong" } });
  }
});

app.get("/user-state", async (req: Request, res: Response) => {
  const userId = req.session.userId;
  if (!userId) {
    res.status(200).json({ error: "User not logged in" });
    return;
  }

  const sql = "SELECT role_name FROM users WHERE user_id = ?";
  try {
    const results = (await queryAsync(sql, [userId])) as { role_name: string }[];
    const { role_name } = results[0];
    res.json({ role: role_name });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const setupDb = async () => {
  const tablesCreationQueries = [
    `CREATE TABLE IF NOT EXISTS roles (
      role_name VARCHAR(10) PRIMARY KEY
    );`,
    `INSERT INTO roles (role_name) VALUES ('admin'), ('manager'), ('staff');`,
    `CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE,
      email VARCHAR(255) UNIQUE,
      password_hash TEXT,
      role_name VARCHAR(10),
      FOREIGN KEY (role_name) REFERENCES roles(role_name)
    );`,
    `CREATE TABLE IF NOT EXISTS addresses (
          address_id SERIAL PRIMARY KEY,
          street TEXT,
          city TEXT,
          country TEXT,
          postal_code TEXT
      );`,
    `CREATE TABLE IF NOT EXISTS people (
          person_id SERIAL PRIMARY KEY,
          name TEXT,
          phone TEXT,
          email TEXT,
          address_id BIGINT UNSIGNED,
          allergies_medical TEXT,
          created_at TIMESTAMP,
          updated_at TIMESTAMP,
          FOREIGN KEY (address_id) REFERENCES addresses(address_id)
      );`,
    `CREATE TABLE IF NOT EXISTS schools (
          school_id SERIAL PRIMARY KEY,
          name TEXT,
          address_id BIGINT UNSIGNED,
          phone TEXT,
          email TEXT,
          created_at TIMESTAMP,
          FOREIGN KEY (address_id) REFERENCES addresses(address_id)
      );`,
    `CREATE TABLE IF NOT EXISTS people_schools (
          person_id BIGINT UNSIGNED,
          school_id BIGINT UNSIGNED,
          FOREIGN KEY (person_id) REFERENCES people(person_id),
          FOREIGN KEY (school_id) REFERENCES schools(school_id)
      );`,
    `CREATE TABLE IF NOT EXISTS staff (
          person_id BIGINT UNSIGNED,
          role_name VARCHAR(10),
          primary_location_id BIGINT UNSIGNED,
          FOREIGN KEY (person_id) REFERENCES people(person_id),
          FOREIGN KEY (role_name) REFERENCES roles(role_name),
          FOREIGN KEY (primary_location_id) REFERENCES addresses(address_id)
      );`,
    `CREATE TABLE IF NOT EXISTS parents (
          person_id SERIAL PRIMARY KEY,
          FOREIGN KEY (person_id) REFERENCES people(person_id)
      );`,
    `CREATE TABLE IF NOT EXISTS students (
        person_id SERIAL PRIMARY KEY,
        FOREIGN KEY (person_id) REFERENCES people(person_id)
    );`,
    `CREATE TABLE IF NOT EXISTS students_parents (
          student_id BIGINT UNSIGNED,
          parent_id BIGINT UNSIGNED,
          FOREIGN KEY (student_id) REFERENCES students(person_id),
          FOREIGN KEY (parent_id) REFERENCES parents(person_id)
      );`,
  ];

  for (const query of tablesCreationQueries) {
    try {
      await queryAsync(query);
      console.log("Database table created");
    } catch (err) {
      throw err;
    }
  }
};

setupDb();

const initializeGodUser = async () => {
  try {
    const sqlCheckUsers = "SELECT COUNT(*) as count FROM users";
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

      await queryAsync(sqlInsertGodUser, [
        godUsername,
        godEmail,
        hashedPassword,
      ]);
      console.log("God user initialized!");
    }
  } catch (error) {
    console.error("Error initializing god user:", error);
  }
};

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: { code: 500, message: "Internal Server Error" } });
});

initializeGodUser();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
