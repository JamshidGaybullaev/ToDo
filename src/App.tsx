// src/App.tsx
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragSourceMonitor } from "react-dnd";
import TodoList from "./components/TodoList";
import TodoStore from "./stores/TodoStore";
import styles from "./components/TodoList.module.css";

const App: React.FC = () => {
  const backlogStore = new TodoStore('backlog');
  const todoStore = new TodoStore('todo');
  const inProgressStore = new TodoStore('inProgress');
  const testStore = new TodoStore('test');
  const doneStore = new TodoStore('done');

  const stores = [
    { store: backlogStore, title: "Backlog", className: styles.backlog },
    { store: todoStore, title: "Todo", className: styles.todo },
    { store: inProgressStore, title: "In Progress", className: styles.inProgress },
    { store: testStore, title: "Test", className: styles.test },
    { store: doneStore, title: "Done", className: styles.done },
  ];

  // Функция перемещения задач между списками
  const moveTodo = (id: number, text: string, monitor: DragSourceMonitor) => {
    const sourceStore = stores.find((s) => s.store.todos.find((todo) => todo.id === id));
    if (sourceStore) {
      sourceStore.store.removeTodo(id);
    }
    const targetTitle = monitor.getDropResult<{ title: string }>()?.title;
    const targetStore = stores.find((s) => s.title === targetTitle);
    if (targetStore) {
      targetStore.store.addTodoToList(id, text);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.todoListContainer}>
        {stores.map((item, index) => (
          <TodoList
            key={index}
            store={item.store}
            title={item.title}
            className={item.className}
            moveTodo={moveTodo}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default App;
