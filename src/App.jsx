import { TasksProvider } from './contexts/TasksContext';

import { Tasks } from './pages/Tasks';

export function App() {
  return (
    <TasksProvider>
      <Tasks />
    </TasksProvider>
  );
}
