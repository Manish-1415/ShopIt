import { ENV } from "../config/env.config.js"
import {v2 as cloudinary} from "cloudinary";
import ApiError from "./ApiError.js";

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});


type DestroyedResult = "ok" | "not_found";

interface CloudinaryDestroyResponse {
    result : DestroyedResult;
}

const deleteFileFromCloudinary = async (publicId : string) => {
    const deletedFile = await cloudinary.uploader.destroy(publicId) as CloudinaryDestroyResponse;

    if(deletedFile.result === "not_found") throw new ApiError(500, "File Not Found For Deletion");

    return;
}


export default deleteFileFromCloudinary;