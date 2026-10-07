import {pgTable, integer, text, serial, timestamp, check, pgEnum, boolean} from "drizzle-orm/pg-core"
import {sql} from "drizzle-orm";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable(
    "users",
    {
        id : serial("id").primaryKey(),
        fname : text("fname").notNull(),
        lname : text("lname") .notNull(),
        email : text("email").notNull().unique(),
        hashPasword : text("hash_password").notNull(),
        avatarUrl : text("avatar_url"),
        role : roleEnum("role").default("user").notNull(),
        avatarPublicId : text("avatar_public_id"),  // why like that, cause the field name in js/ts as avatarPublicId but in psql table it will be avatar_public_id).

        createdAt : timestamp("created_at", {withTimezone : true}).notNull().defaultNow(),
        updatedAt : timestamp("updated_at", {withTimezone : true}).notNull().defaultNow().$onUpdate( () => new Date() ),
        phone : text("phone"),
    }
)


// in drizzle orm only 1 timestamp function is there, if u want to use timestamptz then u must give additional options to use diff data type utility.