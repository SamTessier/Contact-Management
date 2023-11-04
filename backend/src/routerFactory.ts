import { Router } from "express";
import mysql from "mysql";
import { z } from "zod";
require("dotenv").config();

export const connection = mysql.createConnection({
  host: process.env.DB_HOST || process.env.RDS_HOSTNAME, 
  port: parseInt(process.env.DB_PORT || process.env.RDS_PORT || "3306", 10),
  user: process.env.DB_USER || process.env.RDS_USERNAME,
  password: process.env.DB_PASS || process.env.RDS_PASSWORD,
  database: process.env.DB_NAME || process.env.RDS_DB_NAME
});

type Role = "admin" | "teacher" | "student";
type Success = { type: "success"; role: Role };
type Failure = { type: "failure"; message: string };
type Result = Success | Failure;

export const queryAsync = (sql: string, data: any = []) => {
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
    customGetHandler,
    customPostHandler,
    customPutHandler,
    customDeleteHandler,
  }: {
    userCheck?: (req: any) => Result;
    customGetHandler?: Function;
    customPostHandler?: Function;
    customPutHandler?: Function;
    customDeleteHandler?: Function;
  } = {}
) => {
  const router = Router();

  router.get("/", (req, res, next) => {
    if (customGetHandler) {
      customGetHandler(req, res, next).catch(next);
      return;
    }

    queryAsync(`SELECT * FROM ${table}`)
      .then((results) => res.json(results))
      .catch(next);
  });

  router.post("/", (req, res, next) => {
    if (customPostHandler) {
      customPostHandler(req, res, next).catch(next);
    } else {
      const addressInsertSql = `
                INSERT INTO addresses (street, city, country, postalCode) 
                VALUES (?, ?, ?, ?);
            `;
      const addressData = [
        req.body.street,
        req.body.city,
        req.body.country,
        req.body.postalCode,
      ];
      queryAsync(addressInsertSql, addressData)
        .then((addressResult) => {
          const schoolData = { ...req.body };
          delete schoolData.street;
          delete schoolData.city;
          delete schoolData.country;
          delete schoolData.postalCode;
          return queryAsync(`INSERT INTO ${table} SET ?`, schoolData);
        })
        .then(() => res.json({ status: "ok" }))
        .catch(next);
    }
  });

  router.put("/:id", (req, res, next) => {
    if (customPutHandler) {
      customPutHandler(req, res, next).catch(next);
      return;
    }

    queryAsync(`UPDATE ${table} SET ? WHERE id = ?`, [req.body, req.params.id])
      .then(() => res.json({ status: "ok" }))
      .catch(next);
  });

  router.delete("/:id", (req, res, next) => {
    if (customDeleteHandler) {
      customDeleteHandler(req, res, next).catch(next);
      return;
    }

    queryAsync(`DELETE FROM ${table} WHERE id = ?`, req.params.id)
      .then(() => res.json({ status: "ok" }))
      .catch(next);
  });

  return router;
};

export default routerFactory;
