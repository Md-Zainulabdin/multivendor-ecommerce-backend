import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({
        path: "config/.env",
    });
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath, subfolderName) => {
    try {
        if (!localFilePath) return null;

        // Construct the folder path on Cloudinary
        const folderPath = subfolderName ? `multivendor-app/${subfolderName}` : 'multivendor-app';

        // Upload the file on Cloudinary with the specified folder path
        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: folderPath,
            resource_type: "auto"
        });

        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
};

export { uploadOnCloudinary, cloudinary };
