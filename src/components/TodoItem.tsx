// src/components/TodoItem.tsx
import React from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import styles from "./TodoList.module.css";

export interface TodoItemProps {
  id: number;
  text: string;
  moveTodo: (id: number, text: string, monitor: DragSourceMonitor) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, moveTodo }) => {
  const [, drag] = useDrag(() => ({
    type: "TODO",
    item: { id, text },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        moveTodo(item.id, item.text, monitor);
      }
    },
  }));

  return (
    <div ref={drag} className={styles.todoItem}>
      <span>{text}</span>
    </div>
  );
};

export default TodoItem;
