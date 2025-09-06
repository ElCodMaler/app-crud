# 🎨 Frontend - App CRUD

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)](https://tailwindcss.com/)
[![Flowbite](https://img.shields.io/badge/Flowbite-UI%20Components-orange)](https://flowbite-react.com/)
[![Docker](https://img.shields.io/badge/Docker-ready-brightgreen)](https://www.docker.com/)

---

## 📖 Descripción

Este es el **frontend** de la aplicación CRUD, construido con **React + TypeScript + Vite + Tailwind CSS**.  
Se conecta a la API REST del backend para gestionar usuarios y visualizar datos.

---

## 📦 Tecnologías principales

- **React 18**
- **TypeScript**
- **Vite**
- **Tailwind CSS + Flowbite**
- **Docker** (para despliegue)

---

## 📂 Estructura del proyecto
```
⚛️ frontend/
  ├─ src/
  │  ├─ components/# Componentes reutilizables
  │  ├─ sections/# Secciones principales
  │  ├─ services/# Llamadas a la API
  │  ├─ types/# Tipados de componentes
  │  ├─ App.tsx # Configuración de rutas
  │  ├─ index.css # Control de los estilos
  │  ├─ main.tsx # Punto de entrada principal
  │  └─ vite-env.d.ts
  │  
  ├─ 🐳 Dockerfile
  ├─ index.html
  ├─ package.json
  ├─ pnpm-lock.yaml
  ├─ pnpm-workspace.yaml
  ├─ README.md
  ├─ tsconfig.app.json
  ├─ tsconfig.json
  ├─ tsconfig.node.json
  └─ vite.config.ts
```

---

## ⚙️ Variables de entorno

Crea un archivo `.env` dentro de `frontend/` con el siguiente contenido:

```env
VITE_API_URL=http://localhost:3000
```

---

## 🚀 Scripts disponibles
| Comando        | Descripción                            |
| -------------- | -------------------------------------- |
| `pnpm dev`     | Levanta el frontend en modo desarrollo |
| `pnpm build`   | Genera la build de producción          |
| `pnpm preview` | Previsualiza la build de producción    |

---

## 🖥️ Ejecución local
```bash
pnpm install
pnpm dev
```

Abre en tu navegador:
```arduino
http://localhost:5170
```

---

## 🐳 Docker

Para levantar solo el frontend:
```bash
docker-compose up -d frontend
```

La app estará disponible en:
```arduino
http://localhost:5170
```

---

## 🔄 Diagrama de flujo
```text
[Frontend React 5170] → (fetch) → [Backend Express 3000]
```

---

## ✅ Pruebas rápidas

```bash
curl http://localhost:3000/api/users
```
