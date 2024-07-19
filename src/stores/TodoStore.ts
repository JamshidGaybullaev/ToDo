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
  key: string;

  constructor(key: string) {
    this.key = key;
    makeObservable(this, {
      todos: observable,
      nextId: observable,
      addTodo: action,
      removeTodo: action,
      updateTodo: action,
      addTodoToList: action,
      loadTodos: action,
      saveTodos: action,
    });
    this.loadTodos();
  }

  addTodo = (text: string) => {
    this.todos.push({ id: this.nextId++, text, completed: false });
    this.saveTodos(); 
  };

  removeTodo = (id: number) => {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos(); 
  };

  updateTodo = (id: number, newText: string) => {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.text = newText;
      this.saveTodos(); 
    }
  };

  addTodoToList = (id: number, text: string) => {
    this.todos.push({ id, text, completed: false });
    this.saveTodos(); 
  };

  saveTodos = () => {
    localStorage.setItem(this.key, JSON.stringify(this.todos));
  };

  loadTodos = () => {
    const todos = localStorage.getItem(this.key);
    if (todos) {
      this.todos = JSON.parse(todos);
    }
    
  };
}

export default TodoStore;
