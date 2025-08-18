import { Request, Response } from 'express';
import { AppDataSource } from './data-source.js';
import { User } from './user.entiti.js';
import * as bcrypt from 'bcrypt';

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { name, password, phone, email, address } = req.body;
      
      // Validación básica
      if (!name || !password || !phone || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      const userRepository = AppDataSource.getRepository(User);
      const newUser = userRepository.create({
        name,
        password: hashedPassword,
        phone,
        email,
        address,
        is_active: true
      });

      await userRepository.save(newUser);

      // No devolver la contraseña ni siquiera hasheada
      const { password: _, ...userWithoutPassword } = newUser;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already exists' });
      }
      res.status(500).json({ message: 'Error creating user' });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find({
        select: ['id', 'name', 'email', 'phone', 'address', 'is_active', 'created_at']
      });
      
      // Asegura que la respuesta tenga el formato correcto
      res.status(200).json({
        status: 'success',
        data: users,
        message: 'Users retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error fetching users',
        error: error.message
      });
    }
  }
}