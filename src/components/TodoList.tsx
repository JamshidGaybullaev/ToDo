// src/components/TodoList.tsx
import React, { useState } from "react";
import { observer } from "mobx-react";
import TodoStore from "../stores/TodoStore";
import styles from "./TodoList.module.css";

interface TodoListProps {
  store: TodoStore;
  title: string;
  className: string;
}

const TodoList: React.FC<TodoListProps> = ({ store, title, className }) => {
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      store.addTodo(newTodo);
      setNewTodo("");
      setIsAdding(false);
    }
  };

  const handleEditTodo = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSaveTodo = (id: number) => {
    if (editingText.trim() !== "") {
      store.updateTodo(id, editingText);
      setEditingId(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter") {
      handleSaveTodo(id);
    }
  };

  const toggleAddTodo = () => {
    setIsAdding(!isAdding);
  };

  return (
    <div className={`${styles.todoList} ${className}`}>
      <h1>{title}</h1>
      {!isAdding && (
        <button onClick={toggleAddTodo}>New</button>
      )}
      {isAdding && (
        <div>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
          />
          <button onClick={handleAddTodo}>Submit</button>
        </div>
      )}
      <div className={styles.taskContainer}>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {store.todos.map((todo) => (
            <li key={todo.id} style={{ marginBottom: "10px" }}>
              {editingId === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, todo.id)}
                  />
                  <div className={styles.buttonGroup}>
                    <button onClick={() => handleSaveTodo(todo.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className={styles.buttonGroup}>
                  <span>{todo.text}</span>
                  <div>
                    <button onClick={() => handleEditTodo(todo.id, todo.text)}>Edit</button>
                    <button onClick={() => store.removeTodo(todo.id)}>Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default observer(TodoList);
