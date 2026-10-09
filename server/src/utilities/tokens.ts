import { ENV } from "../config/env.config.js";
import jwt from "jsonwebtoken";

type PayloadObj = {
  id: number;
  email: string;
  fullname: string;
};

const accessExpiry: string = ENV.ACCESS_TOKEN_EXPIRY;
const refreshExpiry = ENV.REFRESH_TOKEN_EXPIRY;

export const generateAccessToken = (payload: PayloadObj) => {
  try {
    return jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: accessExpiry as any,   // without as any ts will constantly give red line under sign cause expiresIn only accepts strictly StringValue not genericString thats why it is like that.
    });
  } catch (error) {
    console.log("Access Token Error - ",error);
  }
};


export const generateRefreshToken = (payload : Pick<PayloadObj, "id">) => {
  try {
    return jwt.sign(
      payload,
      ENV.REFRESH_TOKEN_SECRET_KEY,
      {expiresIn : refreshExpiry as any}
    )   
  } catch (error) {
    console.log("Refresh Token Error - ",error);
  }
}



export const verifyAccessToken = (accessToken : string) => {
  try {
    return jwt.verify(accessToken, ENV.ACCESS_TOKEN_SECRET_KEY) as PayloadObj;
  } catch (error) {
    console.log("Validate Error Access Token - ", error);
  }
}


export const verifyRefreshToken = (refreshToken : string) => {
  try {
    return jwt.verify(refreshToken, ENV.REFRESH_TOKEN_SECRET_KEY) as Pick<PayloadObj, "id">;
  } catch (error) {
    console.log("Validate Error Ref Token - ", error);
  }
}

// without as PayloadObj it wouldnt know what it is returning.