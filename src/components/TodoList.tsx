// src/components/TodoList.tsx
import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react";
import { useDrop, DragSourceMonitor } from "react-dnd";
import TodoStore from "../stores/TodoStore";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

interface TodoListProps {
  store: TodoStore;
  title: string;
  className: string;
  moveTodo: (id: number, text: string, monitor: DragSourceMonitor) => void;
}

const TodoList: React.FC<TodoListProps> = ({ store, title, className, moveTodo }) => {
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = () => {
    if (newTodo !== "") {
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
    if (editingText !== "") {
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

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const [, drop] = useDrop({
    accept: "TODO",
    drop: () => ({ title }),
  });

  return (
    <div ref={drop} className={`${styles.todoList} ${className}`}>
      <h1>{title}</h1>
      {!isAdding && (
        <button className={styles.new} onClick={toggleAddTodo}>New</button>
      )}
      {isAdding && (
        <div>
          <input
            ref={inputRef}
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
          />
          <button className={styles.submit} onClick={handleAddTodo}>Submit</button>
        </div>
      )}
      <div className={styles.taskContainer}>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {store.todos.map((todo, index) => (
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
                    <button className={styles.save} onClick={() => handleSaveTodo(todo.id)}>Save</button>
                  </div>
                </div>
              ) : (
                <div className={styles.buttonGroup}>
                  <TodoItem id={todo.id} text={todo.text} moveTodo={moveTodo} />
                  <div>
                    <button className={styles.edit} onClick={() => handleEditTodo(todo.id, todo.text)}>Edit</button>
                    <button className={styles.delete} onClick={() => store.removeTodo(todo.id)}>Delete</button>
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
