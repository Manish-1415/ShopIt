import "dotenv/config"; // import or not doesnt matter, cause in server.ts we make it there.
import ApiError from "../utilities/ApiError.js";

if (!process.env.DATABASE_URL) {
  throw new Error("❌ Missing environment variable: DATABASE_URL is required!");
}

// if (!process.env.JWT_SECRET) {
//   throw new Error("❌ Missing environment variable: JWT_SECRET is required!");
// }

if (!process.env.PORT) throw new Error(" Missing PORT from .env");

if (
  !process.env.ACCESS_TOKEN_SECRET_KEY ||
  !process.env.REFRESH_TOKEN_SECRET_KEY ||
  !process.env.REFRESH_TOKEN_EXPIRY ||
  !process.env.ACCESS_TOKEN_EXPIRY
)
  throw new Error(" Missing Token Rotation Information");


  if(!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_CLOUD_NAME) throw new Error(" Missing Cloudinary Info SDK");


  if(!process.env.COOKIE_SECRET) throw new Error(" Missing Cookie Secret For Unsigning the cookie");

export const ENV = {
  DATABASE_URL: process.env.DATABASE_URL!,
  //   JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT! || 8080,
  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY!,
  REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY!,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY!,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY!,
  CLOUDINARY_CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET!,
  COOKIE_SECRET : process.env.COOKIE_SECRET!
};

// this will definitely wont cause any problem.
// cause we will have .env in gitignore so it wont go on github & this ENV will only work for internal purpose which doesnt cause
