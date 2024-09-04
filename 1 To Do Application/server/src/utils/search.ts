import { Todo } from "../model/task";

export class SearchClass {
  private todos: Todo[];
  private queryString: { [key: string]: any };

  constructor(todos: Todo[], queryString: { [key: string]: any }) {
    this.todos = todos;
    this.queryString = queryString;
  }

  // Method to search todos based on query parameters
  filter(): Todo[] | null {
    if (this.queryString.name) {
      const name = this.queryString.name.toLowerCase();
      this.todos = this.todos.filter((todo) =>
        todo.name.toLowerCase().includes(name)
      );
    }

    return this.todos;
  }
}
