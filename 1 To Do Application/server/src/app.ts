import express, { Express } from "express";
import { json } from "body-parser";
import "express-async-errors";
import todoRoutes from "./routes/index";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app: Express = express();

app.use(json());

//Routes
app.use(todoRoutes);

//Route not found
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

//Globle Error Handler
app.use(errorHandler);

export { app };
