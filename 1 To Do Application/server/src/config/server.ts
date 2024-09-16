import mongoose from "mongoose";

import { app } from "../app";
import swaggerDocs from "../utils/swagger";

// Function to handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error("UNCAUGHT EXCEPTION:\n Shutting down...!!!\n");
  console.error(`Error: ${err.name}, ${err.message}\n`);
  process.exit(1);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/to-do")
  .then(() => console.log("Database connected!"))
  .catch((err: any) => console.log("Database connected Error :"));

const PORT: number = 3003;

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err: Error) => {
  console.error(`\n Error: ${err.name}, ${err.message}`);
  console.error("UNHANDLED REJECTION:\n\n *Shutting Down...!!\n\n");
  server.close(() => {
    process.exit(1);
  });
});
