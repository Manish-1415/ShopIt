import { describe, it, beforeEach, expect} from "vitest";
import {users} from "../../db/schema";
import request from "supertest";
import { eq } from "drizzle-orm";
import {db} from "../../db/connectDB";
import app from "../../app";
import { email } from "zod";

describe("/api/v1", () => {

    beforeEach(async () => {
        await db.delete(users);
    });

            const newUserPayload = {
            email : "apiuser@gmail.com",
            password : "apiuser",
            fname : "andy",
            lname : "shawfard"
        };

    it("should successfully register a user & entry in the database", async () => {

        const response = await request(app)
        .post("/api/v1/auth/signup")
        .send(newUserPayload);

        console.log(response.body);

        expect(response.status).toBe(201);
        // expect(response.body.user.email).toBe(newUserPayload.email);
        expect(response.body.data).not.toHaveProperty("password");
        expect(response.body.data.email).toBe(newUserPayload.email);

        // Assert the Database
        const [user] = await db.select().from(users).where(eq(users.id, response.body.data.id));

        expect(user).toBeTruthy();
        // expect(user.id).toBe(response.body.user.id);
        expect(user.email).toBe(response.body.data.email);


                const loggedInUser = await request(app).post("/api/v1/auth/signup").send(newUserPayload);

        console.log(loggedInUser.body);

        expect(loggedInUser.status).toBe(400);
        expect(loggedInUser.body.message).toBe("Email is already Taken");

    })
})