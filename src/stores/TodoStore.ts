// src/stores/TodoStore.ts
import { observable, action, makeObservable } from "mobx";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

class TodoStore {
  todos: Todo[] = [];
  nextId = 1;

  constructor() {
    makeObservable(this, {
      todos: observable,
      nextId: observable,
      addTodo: action,
      removeTodo: action,
      updateTodo: action,
    });
  }

  addTodo = (text: string) => {
    this.todos.push({ id: this.nextId++, text, completed: false });
  };

  removeTodo = (id: number) => {
    this.todos = this.todos.filter(todo => todo.id !== id);
  };

  updateTodo = (id: number, newText: string) => {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.text = newText;
    }
  };
}

export default TodoStore;
