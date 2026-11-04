import { describe, expect, it, beforeEach } from "vitest";
import { users } from "../../db/schema";
import { db } from "../../db/connectDB";
import request from "supertest";
// import { eq } from "drizzle-orm";
import app from "../../app";
// import { email } from "zod";


describe("api/v1/auth", () => {
    
    beforeEach(async () => {
        await db.delete(users);
    });


    it("should successfully update user information which is prewritten", async () => {
        const userPayload = {
            email : "carry@gmail.com",
            password : "apiuser",
            fname : "altered",
            lname : "carry"
        }

        let token;

        const response = await request(app).post("/api/v1/auth/signup").send(userPayload);

        // console.log(response.body);

        expect(response.body.data.email).toBe(userPayload.email);

        // the response.body = response is an promise which contains the actual result of a req.
        // the body is an actual response payload.

        expect(response.body.data).not.toHaveProperty("hashPassword");






        const loginRes = await request(app).post("/api/v1/auth/login").send({email : userPayload.email, password : userPayload.password});

        // console.log(response.body);

        expect(loginRes.body.data).toHaveProperty("accessToken");
        expect(loginRes.body.data.user).not.toHaveProperty("refreshToken");
        expect(loginRes.body.data.user).not.toHaveProperty("hashPaasword");

        token = loginRes.body.data.accessToken;

        
        const updateUserInfo = await request(app).patch("/api/v1/auth/update_user_info").set('Authorization', `Bearer ${token}`).send({fname : "carbon"});

        console.log(updateUserInfo.body);

        expect(updateUserInfo.status).toBe(200);
        expect(updateUserInfo.body.message).toBe("User Info Updated Successfully");

        expect(updateUserInfo.body.data).not.toHaveProperty("refreshToken");
        expect(updateUserInfo.body.data).not.toHaveProperty("hashPassword");

        // console.log(`Now User Obj After Tweaking it - ${updateUserInfo.body.data}`);
    })
})