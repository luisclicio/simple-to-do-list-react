import { createContext } from 'react';

import { generateId } from '../helpers/generateId';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const TasksContext = createContext({});

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  function addTask({ title, isDone }) {
    const task = {
      id: generateId(),
      title,
      isDone,
      createdAt: Date.now(),
    };

    setTasks((prevTasks) => [task, ...prevTasks]);
  }

  function updateTask({ id, title, isDone }) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title, isDone } : task
    );

    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
}
