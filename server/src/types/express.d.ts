import { PayloadObj } from "../utilities/tokens.ts";


declare global {
  namespace Express {
    interface Request {
      user?: PayloadObj; // Appends 'user' safely to the existing Request interface
      user_id?: {id : number}
    }
  }
}
