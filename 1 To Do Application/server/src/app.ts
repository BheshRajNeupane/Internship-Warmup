import express, { Express } from "express";
import { json } from "body-parser";
import "express-async-errors";
import todoRoutes from "./routes/index";
import authRoutes from "./routes/auth";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import swaggerDocs from "./utils/swagger";
import cookieSession from "cookie-session";
import { morganRequestLogger } from "./log/request-logger";

const app: Express = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["asdf"], // Array of keys used to encrypt cookies
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  })
);

app.use(json());
morganRequestLogger(app);
//Routes
app.use(authRoutes);
app.use(todoRoutes);

swaggerDocs(app, 3003);

//Route not found
app.all("*", async (req, res) => {
  throw new NotFoundError("Route not found");
});

//Globle Error Handler
app.use(errorHandler);

export { app };
