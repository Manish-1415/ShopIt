import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../utilities/ApiError.js";
import { PayloadObj, verifyAccessToken } from "../utilities/tokens.js";

const validateAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let authHeader = req.headers.authorization;

    if (!authHeader) return next(new ApiError(400, "No Access Token Provided"));

    if (!authHeader || !authHeader.includes("Bearer "))
      return next(new ApiError(400, "Access Token Format is Mismatched"));

    const accessToken = authHeader.split(" ")[1];

    const result = verifyAccessToken(accessToken);
    if (result as PayloadObj) {
      req.user = result as PayloadObj;

      next();
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export default validateAccessToken;
