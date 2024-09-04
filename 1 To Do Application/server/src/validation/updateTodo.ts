import { body } from "express-validator";

export const updateTodoRequestionValidation = [
  body("name").optional().notEmpty().withMessage("name cannot be empty"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("status").optional().notEmpty().withMessage(" status cannot be empty"),
];
