import jwt from "jsonwebtoken";
import { Payload } from "../interface/auth/payload.interface";

// Generate JWT
export const generateToken = (payload: Payload) => {
  return jwt.sign(
    {
      id: payload.id,
      email: payload.email,
    },
    "asdf"
    // process.env.JWT_KEY!
  );
};
