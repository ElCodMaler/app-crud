import bcrypt from "bcrypt";
import { UserModel } from "./user.model.js";
export const UserController = {
    async getAll(req, res) {
        const users = await UserModel.getAll();
        res.json({ message: "Sussess response", data: users });
    },
    async getUser(req, res) {
        const { id } = req.params;
        const user = await UserModel.getById(parseInt(id));
        res.json(user);
    },
    async create(req, res) {
        const { name, email, password, phone, address } = req.body;
        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            is_active: true,
        };
        const result = await UserModel.create(newUser);
        res.status(201).json({ message: "Usuario creado", result });
    },
    async update(req, res) {
        const { id } = req.params;
        const result = await UserModel.update(Number(id), req.body);
        res.json({ message: "Usuario actualizado", result });
    },
    async delete(req, res) {
        const { id } = req.params;
        const result = await UserModel.delete(Number(id));
        res.json({ message: "Usuario eliminado", result });
    },
};
