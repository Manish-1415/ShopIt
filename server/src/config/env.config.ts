import "dotenv/config"  // import or not doesnt matter, cause in server.ts we make it there.


if (!process.env.DATABASE_URL) {
  throw new Error("❌ Missing environment variable: DATABASE_URL is required!");
}

// if (!process.env.JWT_SECRET) {
//   throw new Error("❌ Missing environment variable: JWT_SECRET is required!");
// }

if(!process.env.PORT) throw new Error(" Missing PORT from .env");

export const ENV = {
  DATABASE_URL: process.env.DATABASE_URL,
//   JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 8080,
};



// this will definitely wont cause any problem.
// cause we will have .env in gitignore so it wont go on github & this ENV will only work for internal purpose which doesnt cause 