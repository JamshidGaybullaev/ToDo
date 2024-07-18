// src/App.tsx
import React from "react";
import TodoList from "./components/TodoList";
import TodoStore from "./stores/TodoStore";
import styles from "./components/TodoList.module.css";

const App: React.FC = () => {
  const backlogStore = new TodoStore();
  const todoStore = new TodoStore();
  const inProgressStore = new TodoStore();
  const testStore = new TodoStore();
  const doneStore = new TodoStore();

  const stores = [
    { store: backlogStore, title: "Backlog", className: styles.I },
    { store: todoStore, title: "Todo", className: styles.Am },
    { store: inProgressStore, title: "In Progress", className: styles.Very },
    { store: testStore, title: "Test", className: styles.Very2 },
    { store: doneStore, title: "Done", className: styles.Clever },
  ];

  return (
    <div className={styles.todoListContainer}>
      {stores.map((item, index) => (
        <TodoList key={index} store={item.store} title={item.title} className={item.className} />
      ))}
    </div>
  );
};

export default App;
