import { Router } from "express";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controller/crud";
import { validateRequest } from "../middlewares/validate-request";
import { addTodoRequestionValidation } from "../validation/addTodo";
import { updateTodoRequestionValidation } from "../validation/updateTodo";
import { authGuard } from "../guard/auth-guard";
import { currentUser } from "../middlewares/current-user";
currentUser;
const router: Router = Router();
/**
 * @openapi
 * /api/todos:
 *   get:
 *     tags:
 *       - Todo
 *     summary: Retrieve all todos
 *     description: Get a list of all todos from the system
 *     responses:
 *      200:
 *         description: Successfully retrieved list of todos
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: "#/components/schemas/Todo"
 *
 *      500:
 *        description: Internal Server Error
 *
 */

router.get("/api/todos", currentUser, authGuard, getTodos);

/**
 * @openapi
 * /api/add-todo:
 *   post:
 *     tags:
 *       - Todo
 *     summary: Add a new todo
 *     description: Add a new todo with a name, description, and status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the todo
 *                 example: " task 1"
 *               description:
 *                 type: string
 *                 description: A description of the todo
 *                 example: "create node api..."
 *               status:
 *                 type: boolean
 *                 description: The status of the todo (true for completed, false for pending)
 *                 example: false
 *     responses:
 *       201:
 *         description: Successfully added your todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Todo"
 *       400:
 *         description: Bad Request- Invalid request body
 *       403:
 *         description: Forbidden- Not allowed to create todo with the same name
 *       500:
 *         description: Internal Server Error
 */

router.post(
  "/api/add-todo",
  currentUser,
  authGuard,
  addTodoRequestionValidation,
  validateRequest,
  addTodo
);

/**
 * @openapi
 * /api/edit-todo/{id}:
 *   put:
 *     tags:
 *       - Todo
 *     summary: Edit an existing todo
 *     description: Edit a todo's name, description, or status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the todo
 *               description:
 *                 type: string
 *                 description: The updated description of the todo
 *               status:
 *                 type: boolean
 *                 description: The updated status of the todo
 *     responses:
 *       200:
 *         description: Successfully updated the todo
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal Server Error
 */

router.put(
  "/api/edit-todo/:id",
  currentUser,
  authGuard,
  updateTodoRequestionValidation,
  validateRequest,
  updateTodo
);

/**
 * @openapi
 * /api/delete-todo/{id}:
 *   delete:
 *     tags:
 *       - Todo
 *     summary: Delete a todo
 *     description: Delete a todo by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successfully deleted the todo
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal Server Error
 */

router.delete("/api/delete-todo/:id", currentUser, authGuard, deleteTodo);

export default router;
