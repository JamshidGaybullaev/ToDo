// src/components/TodoItem.tsx
import React from "react";
import { useDrag } from "react-dnd";
import styles from "./TodoList.module.css";

export interface TodoItemProps {
  id: number;
  text: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text }) => {
  const [, drag] = useDrag(() => ({
    type: "TODO",
    item: { id, text },
  }));

  return (
    <div ref={drag} className={styles.buttonGroup}>
      <span>{text}</span>
    </div>
  );
};

export default TodoItem;
