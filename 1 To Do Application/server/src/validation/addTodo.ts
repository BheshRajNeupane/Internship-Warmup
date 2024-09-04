import { body } from "express-validator";

export const addTodoRequestionValidation = [
  body("name").exists().notEmpty().withMessage("TODO must have name"),
  body("description")
    .exists()
    .notEmpty()
    .withMessage("TODO must have description"),
  body("status").exists().notEmpty().withMessage(" TODO must have status"),
];
