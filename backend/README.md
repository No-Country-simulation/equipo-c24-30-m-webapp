# Proyecto Adopción de Mascotas

## Comandos para correr el proyecto

1. **Instalar dependencias:**

   ```bash
   npm install

2. **Ejecutar el proyecto en modo desarrollo (usando ts-node):**

   ```bash
   npx ts-node src/server.ts

3. **Compilar el proyecto (TypeScript a JavaScript):**

   bash
   npx tsc


4. **Ejecutar el proyecto en producción (después de compilar):**

   bash
   node dist/server.js

5. **Acceder a la documentación de la API (Swagger):**

   Abre en tu navegador: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

*Comentarios:*  
- Este proyecto utiliza **TypeScript**, **Node.js** con **Express** y **MongoDB** (usando Mongoose).  
- Asegúrarse de configurar las variables de entorno en un archivo `.env` (por ejemplo, el `PORT` y `MONGO_URI`).

