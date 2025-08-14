import 'dotenv/config';
import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  port: Number(process.env.DB_PORT)
});

export function query(arg0: string): [any] | PromiseLike<[any]> {
    throw new Error("Function not implemented.");
}
export function getConnection() {
    throw new Error("Function not implemented.");
}

