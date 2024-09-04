import { Router } from "express";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controller/crud";
import { validateRequest } from '../middlewares/validate-request';
import { addTodoRequestionValidation } from "../validation/addTodo"
import { updateTodoRequestionValidation } from "../validation/updateTodo"


const router: Router = Router();

router.get("/todos", getTodos);

router.post("/add-todo",addTodoRequestionValidation, validateRequest, addTodo);

router.put("/edit-todo/:id", updateTodoRequestionValidation ,validateRequest,updateTodo);

router.delete("/delete-todo/:id", deleteTodo);

export default router;
