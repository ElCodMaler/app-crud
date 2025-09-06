import express from 'express';
import userRoutes from './user.routes.js';
import { AppDataSource } from './data-source.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: process.env.URL_FRONTEND, // URL exacta de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200 // Para navegadores antiguos
};
// Middlewares esenciales
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear form data
app.use(cors(corsOptions));
// Asegúrate de incluir esto ANTES de tus rutas
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Powered-By', 'Express');
    next();
});
// Rutas
app.use('/api/user', userRoutes);
// Inicialización
AppDataSource.initialize()
    .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
    .catch(error => console.log('Database connection error:', error));
export default app;
