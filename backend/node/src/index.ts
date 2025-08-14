import express from "express";
import cors from "cors";
import { pool as db} from './db.js';

const app = express();
app.use(cors());
app.use(express.json());


export async function query(sql: string, params?: any[]) {
    const connection = await db.getConnection();
    const [rows] = await connection.execute(sql, params);
    connection.release();
    return rows;
}

app.get("/usuarios", async (req, res) => {
  const rows = await query("SELECT * FROM usuarios");
  res.json(rows);
});

app.post("/usuarios", async (req, res) => {
  const { nombre, email } = req.body;
  await query("INSERT INTO usuarios (nombre, email) VALUES (?, ?)", [nombre, email]);
  res.json({ message: "Usuario agregado" });
});

app.listen(3000, () => {
  console.log("Backend corriendo en puerto 3000");
});
