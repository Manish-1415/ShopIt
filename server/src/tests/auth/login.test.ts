import {expect, it, describe, beforeEach} from "vitest";
import { users } from "../../db/schema";
import { db } from "../../db/connectDB";
import request from "supertest";
import { eq } from "drizzle-orm";
import app from "../../app";
import { email } from "zod";


describe("api/v1/auth", () => {


    beforeEach( async () => {
        await db.delete(users);
    });

    it("should successfully let user login with same creds & return JWT tokens", async () => {
        const userPayload = {
            email : "sam@gmail.com",
            password : "apiuser",
            fname : "sam",
            lname : "altman"
        }

        const response = await request(app).post("/api/v1/auth/signup").send(userPayload);

        console.log(response.body);

        expect(response.body.data.email).toBe(userPayload.email);
        expect(response.body.data).not.toHaveProperty("hashPassword");

        // now do the login for performing the original test


        const wrongLoginCreds = await request(app).post("/api/v1/auth/login").send({email : "andy@gmail.com", password : "andy123"});

        console.log("Wrong Creds Login Attempt = ",wrongLoginCreds.body);

        expect(wrongLoginCreds.body.statusCode).toBe(404);
        expect(wrongLoginCreds.body.message).toBe("User Not Found");



        // check registered mail but with invalid pass 

        const validMailButInvalidPass = await request(app).post("/api/v1/auth/login").send({email : "sam@gmail.com", password : "andy123"});

        console.log("Valid Mail But Wrong Pass ", validMailButInvalidPass.body);

        expect(validMailButInvalidPass.body.statusCode).toBe(403);
        expect(validMailButInvalidPass.body.message).toBe("Password is Incorrect");


        // now do the login req with right creds
        
        const loginReq = await request(app).post("/api/v1/auth/login").send({email : userPayload.email, password : userPayload.password});

        console.log(loginReq.body);

        expect(loginReq.status).toBe(200);
        expect(loginReq.body.data).toHaveProperty("accessToken");
        expect(loginReq.body.data).not.toHaveProperty("refreshToken");
        expect(loginReq.body.data).not.toHaveProperty("hashPassword");
        expect(loginReq.body.data).toHaveProperty("accessToken");
    })
})

