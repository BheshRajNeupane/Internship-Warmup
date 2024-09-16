import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Payload } from "../interface/auth/payload.interface";

// interface UserPayload {
//   id: string;
//   email: string;
// }

declare global {
  namespace Express {
    interface Request {
      currentUser?: Payload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      "asdf"
      //  process.env.JWT_KEY!
    ) as Payload;

    req.currentUser = payload;
  } catch (err) {}

  next();
};
