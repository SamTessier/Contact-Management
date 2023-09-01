import { Router } from "express";
import mysql from "mysql";
require('dotenv').config();

export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

type Role = "admin" | "teacher" | "student";

type Success = {
  type: "success";
  role: Role;
};

type Failure = {
  type: "failure";
  message: string;
};

type Result = Success | Failure;

const queryAsync = (sql: string, data: any = []) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, data, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const routerFactory = (
    table: string,
    {
        userCheck = () => ({ type: "success", role: "student" }),
    }: {
        userCheck?: (req: any) => Result;
    } = {}
) => {
    const router = Router();

    router.get("/", async (req, res) => {
        // const currentUser = req.session.user;

        // if (!currentUser) {
        //   res.status(401).json({ status: "unauthorized" });
        //   return;
        // }

        // const userCheckResult = userCheck(req);

        // if (userCheckResult.type === "failure") {
        //   res.status(403).json({ status: "forbidden", message: userCheckResult.message });
        //   return;
        // }

        const results = await queryAsync(`SELECT * FROM ${table}`);
        res.json(results);
    });

    router.post("/", async (req, res) => {
            const addressInsertSql = `
                INSERT INTO addresses (street, city, country, postalCode) 
                VALUES (?, ?, ?, ?);
            `;
            const addressData = [req.body.street, req.body.city, req.body.country, req.body.postalCode];
            const addressResult = await queryAsync(addressInsertSql, addressData);


            const schoolData = {
                ...req.body,         
            };
            delete schoolData.street; 
            delete schoolData.city;
            delete schoolData.country;
            delete schoolData.postalCode;
    
            await queryAsync(`INSERT INTO ${table} SET ?`, schoolData);
    
            res.json({ status: "ok" });
    });
    
    router.put("/:id", async (req, res) => {
        await queryAsync(`UPDATE ${table} SET ? WHERE id = ?`, [req.body, req.params.id]);
        res.json({ status: "ok" });
    });

    router.delete("/:id", async (req, res) => {
        await queryAsync(`DELETE FROM ${table} WHERE id = ?`, req.params.id);
        res.json({ status: "ok" });
    });

    return router;
};

export default routerFactory;
