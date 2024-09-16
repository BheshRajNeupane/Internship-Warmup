import { Response, Request } from "express";
import { Todo, TodoModel } from "../model/task";
import { BadRequestError } from "../errors/bad-request-error";
import { AlreadyExistError } from "../errors/already-exist";
import { SearchClass } from "../utils/search";

import jwt from "jsonwebtoken";

import { User } from "../model/user";
import { Password } from "../services/password";
import { generateToken } from "../services/tokenGenerate";
import { Payload } from "../interface/auth/payload.interface";
import { Session } from "../services/session-set";

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AlreadyExistError("Email in use");
  }

  const user = User.build({ email, password });

  await user.save();

  const payload: Payload = {
    id: user.id,
    email: user.email,
  };

  // JWT token Store it on session object
  Session(req, payload);

  res.status(201).json({
    message: "Success",
    user: user,
  });
};
//---signin--
const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError("Invalid credentials");
  }

  const passwordsMatch = await Password.compare(
    existingUser.password,
    password
  );
  if (!passwordsMatch) {
    throw new BadRequestError("Invalid Credentials");
  }

  const payload: Payload = {
    id: existingUser.id,
    email: existingUser.email,
  };

  // JWT token Store it on session object
  Session(req, payload);

  res.status(201).json({
    message: "Signin Success",
    user: existingUser,
  });
};
const signout = (req: Request, res: Response) => {
  req.session = null;

  res.status(200).json({
    message: "Signout Success",
  });
};

export { signup, signin, signout };
