import { Payload } from "../interface/auth/payload.interface";
import { generateToken } from "./tokenGenerate";
import { Request, Response } from "express";

export const Session = (req: Request, payload: Payload) => {
  const token = generateToken(payload);
  // Store it on session object
  req.session = {
    jwt: token,
  };
};
