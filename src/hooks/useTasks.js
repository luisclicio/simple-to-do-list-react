import { useContext } from 'react';

import { TasksContext } from '../contexts/TasksContext';

export const useTasks = () => useContext(TasksContext);
