import {expect, it, beforeEach, describe} from "vitest";
import request from "supertest";
import {db} from "../../db/connectDB";
import { users } from "../../db/schema";
import app from "../../app";

describe("/api/v1/auth", () => {
    
    beforeEach( async () => {
        await db.delete(users);
    });


    it("should delete the user entry fully", async () => {
            
        const userPayload = {
            email : "ajx@gmail.com",
            password : "ajx123",
            fname : "ajax",
            lname : "cariok"
        }

        let token : string;


        const user = await request(app).post("/api/v1/auth/signup").send(userPayload);

        expect(user.status).toBe(201);
        expect(user.body.message).toBe("User Registered Successfully");
        

        // without login someone is trying to delete the user without any tokens -

        const deleteUser = await request(app).delete("/api/v1/auth/delete_my_profile");

        console.log("Trying to delete the User Without Login / Tokens - ", deleteUser.body);

        expect(deleteUser.status).toBe(400);
        expect(deleteUser.body.message).toBe("No Access Token Provided");



        // login
        const userLogin = await request(app).post("/api/v1/auth/login").send({email : userPayload.email, password : userPayload.password});

        expect(userLogin.body.data).toHaveProperty("accessToken");
        expect(userLogin.status).toBe(200);
        expect(userLogin.body.message).toBe("User Logged In Successfully");

        token = userLogin.body.data.accessToken;


        const cookies = userLogin.get("Set-Cookie");
        expect(cookies).toBeDefined();


        // deleting user with Tokens
        const deletingUserWithToken = await request(app).delete("/api/v1/auth/delete_my_profile").set("Authorization", `Bearer ${token}`).set("Cookie", cookies!);

        expect(deletingUserWithToken.status).toBe(200);
        expect(deletingUserWithToken.body.message).toBe("User Entry Deleted From DB");
        expect(deletingUserWithToken.body.data).toHaveProperty("id");
    });
})