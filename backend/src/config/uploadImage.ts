import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import multerStorageCloudinary from "multer-storage-cloudinary";

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuración de Multer con Cloudinary
const storage = multerStorageCloudinary({
  cloudinary: cloudinary,
  params: {
    folder: "pets", // El nombre de la carpeta en Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Formatos permitidos
  } as any,
});

// Configurar Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Tamaño máximo de archivo (opcional)
});

export default upload;
