import {
  pgTable,
  integer,
  text,
  serial,
  timestamp,
  check,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(), // why do we keep using same name in data type ? this because the first id : is for js & the datatype(id) is the column name in psql
  fname: text("fname").notNull(), // even if u dont give colname in datatype but the key should be single word not camelcase then it will infer the key as col name.
  lname: text("lname").notNull(),
  email: text("email").notNull().unique(),
  hashPassword: text("hash_password").notNull(),
  avatarUrl: text("avatar_url"),
  role: roleEnum("role").default("user").notNull(),
  avatarPublicId: text("avatar_public_id"), // why like that, cause the field name in js/ts as avatarPublicId but in psql table it will be avatar_public_id).

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  phone: text("phone"),
  refreshToken : text("refresh_token"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferSelect;

// in drizzle orm only 1 timestamp function is there, if u want to use timestamptz then u must give additional options to use diff data type utility.
