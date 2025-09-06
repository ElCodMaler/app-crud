# 🛠️ Proyecto CRUD - React + Node + MySQL con Docker

[![Docker Status](https://img.shields.io/badge/Docker-Running-brightgreen)](https://www.docker.com/)
[![pnpm](https://img.shields.io/badge/pnpm-v8.0-blue)](https://pnpm.io/)
[![Node](https://img.shields.io/badge/Node-20.0-green)](https://nodejs.org/)

---

## 📖 Tabla de Contenidos
1. [Descripción](#descripción)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Tecnologías](#tecnologías)
4. [Diagrama de Flujo](#diagrama-de-flujo)
5. [Requisitos](#requisitos)
6. [Instalación y Ejecución](#instalación-y-ejecución)
7. [Frontend](./frontend/README.md)
8. [Backend](./backend/README.md)
9. [Docker](#docker)
10. [Comprobaciones rápidas](#comprobaciones-rápidas)
11. [Notas](#notas)

---

## 📝 Descripción [#descripción]
Aplicación CRUD completa:

- **Frontend:** React + TypeScript + Vite + Tailwind CSS  
- **Backend:** Node.js + TypeScript + Express  
- **Base de datos:** MySQL 8.0  
- **Docker Compose:** Levanta todo el stack fácilmente

Permite **crear, leer, actualizar y eliminar usuarios** desde la interfaz web y almacenar los datos en MySQL.

---

## 📂 Estructura del Proyecto (#estructura-del-proyecto)
```markdown
app-crud/
├─ 🟢 backend/
│  ├─ node/
│  │  ├─ src/
│  │  │  ├─ data-source.ts
│  │  │  ├─ env.d.ts
│  │  │  ├─ index.ts
│  │  │  ├─ user.controller.ts
│  │  │  ├─ user.model.ts
│  │  │  └─ user.routes.ts
│  │  ├─ package.json
│  │  ├─ tsconfig.json
│  │  └─ vitest.config.ts
│  ├─ .env.exmaple
│  ├─ .gitignore
│  ├─ 🐳 Dockerfile
│  └─ 📋 README.md
│
├─ 🗃️ db/ # Plantilla sql de las tablas
│
├─ ⚛️ frontend/
│  ├─ src/
│  │  ├─ components/# Componentes reutilizables
│  │  ├─ sections/# Secciones principales
│  │  ├─ services/# Llamadas a la API
│  │  ├─ types/# Tipados de componentes
│  │  ├─ App.tsx
│  │  ├─ index.css
│  │  └─ main.tsx
│  ├─ index.html
│  ├─ 🐳 Dockerfile
│  ├─ 📋 README.md
│  ├─ tsconfig.json
│  └─ vite.config.ts
│
├─ 🐳 .dockerignore
├─ 🐳 docker-compose.yml
└─ 📋 README.md
```

---

## 🛠️ Tecnologías {#tecnologías}
- React 18 + TypeScript  
- Vite  
- Tailwind CSS + Flowbite  
- Node.js + TypeScript + Express  
- MySQL 8.0  
- Docker & Docker Compose  
- pnpm  

---

## 🔄 Diagrama de Flujo {#diagrama-de-flujo}

```text
[Navegador / React 5170]
        │
        ▼
[Frontend React]
        │  fetch → VITE_API_URL=http://localhost:3000
        ▼
[Backend Node/Express 3000]
        │  MySQL client
        ▼
[MySQL Container 3306]
```

## ✅ Requisitos {#requisitos}

- Docker y Docker Compose
- pnpm
- node.js v20
- Conexión a Internet para instalar dependencias

---

## ⚡ Instalación y Ejecución {#instalación-y-ejecución}

#### 1️⃣ Con Docker (recomendado) {#docker}
Levanta todo el stack con:
```bash
docker-compose up -d
```

| Servicio | Puerto | URL                                            |
| -------- | ------ | ---------------------------------------------- |
| MySQL    | 3307   | -                                              |
| Backend  | 3000   | [http://localhost:3000](http://localhost:3000) |
| Frontend | 5170   | [http://localhost:5170](http://localhost:5170) |

---

#### 2️⃣ Desarrollo local sin Docker

Backend
```bash
cd backend
pnpm install
pnpm dev
```

Frontend
```bash
cd frontend
pnpm install
pnpm dev
```

Asegúrate de que `.env` del frontend apunte al backend correcto `VITE_API_URL=http://localhost:3000.`

---

## 💻 Frontend
- Rutas principales definidas en `src/sections`
- Componentes reutilizables en `src/components`
- Consumo de API en `src/services/api.ts`
- Hot reload con `pnpm dev`

---

## 🖥️ Backend
- Rutas REST en `/api/users`
- Conexión MySQL usando `dotenv` y variables de entorno
- Soporte CORS limitado al frontend (`http://localhost:5170`)
- Hot reload con `nodemon` (`pnpm dev`)

---

## 🐳 Docker
- Levanta backend, frontend y MySQL
- Contenedores en la red app-net
- Healthcheck para asegurar que MySQL esté listo antes del backend
- Volúmenes para persistencia de datos:
```yaml
volumes:
  db_data:
  backend_logs:
```

---

## 🔧 Comprobaciones rápidas {#comprobaciones-rápidas}
- Backend funcionando:
```bash
curl http://localhost:3000/api/users
```

- Frontend funcionando: abrir http://localhost:5170
- Contenedores Docker:
```bash
docker ps
```

---

## ⚠️ Notas {#notas}
- Variables de entorno deben estar sincronizadas entre .env y docker-compose.yml

- Hot reload backend con nodemon evita reconstrucciones constantes

- Frontend debe apuntar siempre al puerto del backend (VITE_API_URL)

- CORS configurado para seguridad en desarrollo

