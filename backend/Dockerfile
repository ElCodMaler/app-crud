FROM node:20-alpine

RUN npm install -g pnpm

# Carpeta de trabajo
WORKDIR /app

# Copiamos los archivos de dependencias del backend
COPY node/package.json node/pnpm-lock.yaml ./ 

# Instalamos dependencias
RUN pnpm install

# Copiamos todo el código del backend
COPY node/ .

# Compilamos TypeScript
RUN pnpm build

# Ejecutamos el backend
CMD ["node", "dist/index.js"]

