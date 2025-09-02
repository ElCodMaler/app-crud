import { AppDataSource as db } from "./data-source.js";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  is_active?: boolean;
  created_at?: Date;
}

export const UserModel = {
  async getAll() {
    const rows = await db.query("SELECT * FROM user");
    return rows;
  },

  async getById(id: number) {
    const rows = await db.query("SELECT * FROM user WHERE id = ?", [id]);
    console.log(rows);
    console.log(typeof rows);
    return rows;
  },

  async create(user: User) {
    try{
      const result = await db.query(
        `INSERT INTO user (name, email, password, phone, address, is_active, created_at)
         VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [
          user.name,
          user.email,
          user.password,
          user.phone,
          user.address || null,
          user.is_active ?? true,
        ]
      );
      return result;
    } catch(err){
      console.error("Hubo un error en el envio: ",err);
    }
  },

  async update(id: number, data: Partial<User>) {
    const fields = Object.keys(data).map((key) => `${key} = ?`).join(", ");
    const values = Object.values(data);
    const result = await db.query(
      `UPDATE user SET ${fields} WHERE id = ?`,
      [...values, id]
    );
    return result;
  },

  async delete(id: number) {
    const result = await db.query("DELETE FROM user WHERE id = ?", [id]);
    return result;
  },
};
