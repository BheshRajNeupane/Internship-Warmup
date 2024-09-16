import mongoose, { model, Schema } from "mongoose";

/**
 * @openapi
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         status:
 *           type: boolean
 */

export interface Todo extends mongoose.Document {
  name: string;
  description: string;
  status: boolean;
}

const taskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: [20, "A todo name must have less or equal then 20 character"],
      minlength: [5, "A todo name must have more or equal then 5 character"],
    },

    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },

    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v; // hide in response
      },
    },
  }
);

const TodoModel = model<Todo>("TodoModel", taskSchema);

export { TodoModel };
