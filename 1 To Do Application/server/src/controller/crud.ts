import { Response, Request } from "express";
import { Todo, TodoModel } from "../model/task";
import { BadRequestError } from "../errors/bad-request-error";
import { AlreadyExistError } from "../errors/already-exist";
import { SearchClass } from "../utils/search";

// GET
const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    //if query

    const todos = new SearchClass(await TodoModel.find(), req.query).filter();

    //
    // const todos: Todo[] = await TodoModel.find();
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

// POST

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<Todo, "name" | "description" | "status">;

    const existing_todo = await TodoModel.findOne({ name: body.name });
    if (existing_todo) {
      throw new AlreadyExistError(
        `Todo with  name : ${body.name} is already exist , try with new name.`
      );
    }

    const todo = new TodoModel({
      name: body.name,
      description: body.description,
      status: body.status,
    });

    const newTodo = await todo.save();

    res.status(201).json({ message: "Todo added", todo: newTodo });
  } catch (error) {
    throw error;
  }
};

// PUT

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTodo = await TodoModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
      runValidator: true,
    });

    if (!updateTodo) throw new BadRequestError("TODO NOT FOUND ");

    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
    });
  } catch (error) {
    throw error;
  }
};

// DELETE
// Allows you to delete a Todo from the database.
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: Todo | null = await TodoModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTodo) throw new BadRequestError("TODO NOT FOUND ");

    res.status(204).json({
      message: "Todo deleted ",
    });
  } catch (error) {
    throw error;
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
