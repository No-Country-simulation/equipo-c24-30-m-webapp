# 📌 Proyecto Backend

Este proyecto es un backend desarrollado en Node.js con Express y TypeScript.

## 🚀 Instalación y configuración

Sigue estos pasos para configurar y ejecutar la aplicación en tu entorno local.

### 1️⃣ Clonar el repositorio

```sh
git clone <URL_DEL_REPOSITORIO>
cd nombre-del-repositorio
```

### 2️⃣ Instalar dependencias

```sh
npm install
```

### 3️⃣ Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto y define las variables necesarias.
Si ya existe un archivo de ejemplo `.env.example`, puedes copiarlo y modificarlo:

```sh
cp .env.example .env
```

Edita el `.env` y asegúrate de configurar correctamente las variables necesarias, como la conexión a la base de datos.

### 4️⃣ Ejecutar la aplicación en modo desarrollo

Para iniciar la aplicación con `nodemon` y `ts-node`, usa:

```sh
npm run dev
```

Este comando ejecutará:

```sh
nodemon --exec ts-node src/index.ts
```

De esta manera, cualquier cambio en el código reiniciará automáticamente el servidor.

### 5️⃣ Ejecutar en modo producción

Para compilar y ejecutar la aplicación en producción:

```sh
npm run build  # Transpila TypeScript a JavaScript
npm start      # Ejecuta la versión compilada
```

## 📜 Scripts disponibles en `package.json`

- `npm run dev` → Inicia el servidor en modo desarrollo con `nodemon` y `ts-node`.
- `npm run build` → Compila TypeScript a JavaScript.
- `npm start` → Ejecuta el servidor en producción.

## 🛠️ Tecnologías utilizadas

- **Node.js** + **Express**
- **TypeScript**
- **MongoDB (o la base de datos que uses)**
- **Nodemon** para el desarrollo en caliente

## 📌 Notas adicionales

- Si `nodemon` no está instalado globalmente, puedes instalarlo con:
  ```sh
  npm install -g nodemon
  ```
- Si tienes problemas con permisos en los puertos, intenta ejecutar el comando con `sudo` en sistemas Unix:
  ```sh
  sudo npm run dev
  ```

---


