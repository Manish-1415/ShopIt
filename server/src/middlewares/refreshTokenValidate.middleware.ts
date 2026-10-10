import { Request, Response, NextFunction } from "express";
import { verifyRefreshToken } from "../utilities/tokens.js";
// import { PayloadObj } from "../utilities/tokens.js";
import ApiError from "../utilities/ApiError.js";

const verifyRefToken = (req : Request, res : Response, next : NextFunction) => {
    try {
        const refToken = req.cookies.refreshToken;

        if(!refToken) return next(new ApiError(400, "Please Provide a Refresh Token"));

        const payload = verifyRefreshToken(refToken);

        if(!payload) return next(new ApiError(400, "Refresh Token Expired Or Invalid"));

        req.user_id = payload;

        next();

    } catch (error) {
        console.log("Refresh Token Check Middleware - ", error);
        next(error);
    }
}

export default verifyRefToken;