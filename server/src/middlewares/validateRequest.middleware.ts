import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utilities/ApiError.js";


const validateSchema = (schema : ZodSchema) => (req : Request, res : Response, next : NextFunction) => {
    const result = schema.safeParse(req.body);

    if(!result.success) {
        const errMsg = result.error.issues.map( err => err.message).join(",");

         return next(new ApiError(422, errMsg));
    }

    next();
}


export default validateSchema;