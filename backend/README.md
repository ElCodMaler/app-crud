# 🛠️ Backend - App CRUD

[![Node](https://img.shields.io/badge/Node.js-v20.0-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-ready-brightgreen)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📖 Descripción

Este es el **backend** de la aplicación CRUD.  
Expone una **API REST** para gestionar usuarios y se conecta a una base de datos **MySQL**.  
Está construido con **Node.js + TypeScript + Express** y configurado para ejecutarse fácilmente con **Docker**.

---

## 📦 Tecnologías principales

- **Node.js** v20
- **Express.js**
- **TypeScript**
- **MySQL**
- **dotenv** para variables de entorno
- **CORS** configurado para seguridad

---

## 📂 Estructura del proyecto
```
🟢 backend/
  ├─ node/
  │  ├─ src/
  │  │  ├─ data-source.ts
  │  │  ├─ env.d.ts
  │  │  ├─ index.ts
  │  │  ├─ user.controller.ts
  │  │  ├─ user.model.ts
  │  │  └─ user.routes.ts
  │  │
  │  ├─ package.json
  │  ├─ pnpm-lock.yaml
  │  ├─ pnpm-workspace.yaml
  │  ├─ README.md
  │  ├─ tsconfig.json
  │  └─ vitest.config.ts
  │
  ├─ .env.exmaple
  ├─ .gitignore
  └─ 🐳 Dockerfile
```

---

## ⚙️ Variables de entorno

Crea un archivo `.env` dentro de `backend/` con el siguiente contenido:

```env
PORT=3000
DB_HOST=db
DB_PORT=3306
DB_USER=user
DB_PASSWORD=userpass
DB_NAME=miapp
```

| Comando      | Descripción                            |
| ------------ | -------------------------------------- |
| `pnpm dev`   | Levanta el servidor en modo desarrollo |
| `pnpm build` | Compila TypeScript a JavaScript        |
| `pnpm start` | Inicia el servidor en producción       |

---

## 🌐 Rutas principales de la API
| Método | Endpoint         | Descripción               |
| ------ | ---------------- | ------------------------- |
| GET    | `/api/user`     | Listar todos los usuarios |
| GET    | `/api/user/:id` | Obtener usuario por ID    |
| POST   | `/api/user`     | Crear un nuevo usuario    |
| PUT    | `/api/user/:id` | Actualizar usuario por ID |
| DELETE | `/api/user/:id` | Eliminar usuario por ID   |

---

## 🐳 Docker
El backend está dockerizado. Para levantar solo el backend:
```bash
docker-compose up -d backend
```

Quedará disponible en:
```arduino
http://localhost:3000
```

---

## 🔄 Diagrama de flujo
```text
[Frontend React] → (fetch API)
        │
        ▼
[Backend Express 3000] → [MySQL Container 3306]
```

---

## ✅ Pruebas rápidas
```bash
curl http://localhost:3000/api/users
```

---

## CORS
```ts
app.use(cors({
  origin: "http://localhost:5170",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));
```
