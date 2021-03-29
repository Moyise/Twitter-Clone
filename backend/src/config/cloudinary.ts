import dotenv from "dotenv";
dotenv.config();
import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

export const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "Twitter",
    allowed_formats: ["jpeg", "png", "jpg"],
  },
});
