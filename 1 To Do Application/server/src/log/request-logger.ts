import morgan from "morgan";
import fs from "fs";
import path from "path";
import { Express } from "express";

const customFormat =
  ":date[iso] :method :url :status :res[content-length] - :response-time ms :user-agent";

// Create a write stream for logging requests to a file (append mode)
const logFilePath = path.join(__dirname, "../", "log_file.log");
const accessLogStream = fs.createWriteStream(logFilePath, { flags: "a" });

export const morganRequestLogger = (app: Express): void => {
  // Log requests with the custom format to the log file
  app.use(morgan(customFormat, { stream: accessLogStream }));

  // Optionally log requests with the custom format to the console (for development)
  app.use(morgan(customFormat));
};
