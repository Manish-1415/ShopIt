import request from "supertest";
import {beforeEach, it, expect, describe} from "vitest";
import { db } from "../../db/connectDB";
import { users } from "../../db/schema";
import app from "../../app";

describe("/api/v1", () => {
    
    beforeEach(async () => {
        await db.delete(users);
    })


    const newUser = {
        email : "apiuser@gmail.com",
        password : "apiuser",
        fname : "andy",
        lname : "shawfard"
    }

    it("should return newly created access token", async () => {
        const result = await request(app).post("/api/v1/auth/signup").send(newUser);

        expect(result.body.data).toHaveProperty("id");
        expect(result.body.data).not.toHaveProperty("hashPassword");
        expect(result.status).toBe(201);



        // login 

        const loginResult = await request(app).post("/api/v1/auth/login").send({email : newUser.email, password : newUser.password});

        expect(loginResult.body.data).toHaveProperty("accessToken");
        expect(loginResult.body.data.user).toHaveProperty("id");
        expect(loginResult.body.message).toBe("User Logged In Successfully");
        expect(loginResult.status).toBe(200);

        
        const cookies = loginResult.get("Set-Cookie");

        expect(cookies).toBeDefined();


        // new access token

        const accessToken = await request(app).post("/api/v1/auth/token_rotation").set("Cookie", cookies!).send();

        console.log("👨‍💻 AccessToken newly generated - ",accessToken.body.data);
    
        expect(accessToken.body.data).toHaveProperty("accessToken");
        expect(accessToken.status).toBe(200);
    });
})




                                                                        

                                                                            




