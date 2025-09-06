# app-crud
CRUD, test de backend

## Estructura
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
│  │  ├─ README.md
│  │  ├─ tsconfig.json
│  │  └─ vitest.config.ts
│  ├─ .env.exmaple
│  ├─ .gitignore
│  └─ 🐳 Dockerfile
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

## Requisitos
- Docker & Docker Compose
- pnpm (para desarrollo local sin contenedores)

---

## Pasos para levantar el proyecto

### 1️⃣ Con Docker (recomendado)

```bash
docker-compose up -d
```

Esto levantara:
- MySQL → `localhost:3307`
- Backend → `localhost:3000`
- Frontend → `localhost:5170`

### 2️⃣ Con desarrollo local

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

Asegúrate de que `.env` de frontend apunte al backend correcto.

---

## Notas importantes
- El backend espera que MySQL esté disponible en el contenedor `db`.
- Hot reload en backend con `pnpm dev` y nodemon.
- Las rutas del backend están protegidas con CORS para aceptar solo el frontend.
- Para producción, revisa variables de entorno y puertos.

---

## Comprobaciones rapidas
- Backend funcionando: `curl http://localhost:3000/api/users`
- Frontend funcionando: abrir `http://localhost:5170` en navegador.
- Contenedores Docker: `docker ps`.