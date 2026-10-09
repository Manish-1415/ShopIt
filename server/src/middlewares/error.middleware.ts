import { Request, Response, NextFunction } from "express";
import ApiError from "../utilities/ApiError.js";
// import { success } from "zod";


const errorMiddleware = (err : unknown, req : Request, res : Response, next : NextFunction) => {


    if(err instanceof ApiError) {
        let statuCode = err.statusCode;
        let message = err.message;
        const success = false;


        return res.status(statuCode).json({message, statuCode, success});
    }

    console.log(`System Error ⚙️ - ${err}`);

    return res.status(500).json(
        {
            message : "Something went wrong on our end. Please try again later.",
            statusCode : 500,
            success : false
        }
    );
}   

export default errorMiddleware;