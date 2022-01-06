import { CircleIcon, CheckCircleIcon, TrashIcon } from '../shared/Icons';

import { useTasks } from '../hooks/useTasks';

export function TaskItem({ task: { id, title, isDone } }) {
  const { deleteTask, updateTask } = useTasks();

  function handleUpdateTask(event) {
    updateTask({ id, title, isDone: !isDone });
  }

  function handleDeleteTask(event) {
    event.stopPropagation();
    deleteTask(id);
  }

  return (
    <li
      className="btn--base items-start gap-x-2 px-2 mt-2 shadow-xl"
      onClick={handleUpdateTask}
    >
      <span className="rounded-2xl p-2">
        {isDone ? (
          <>
            <span className="sr-only">Concluída</span>
            <CheckCircleIcon className="text-2xl text-blue-500" />
          </>
        ) : (
          <>
            <span className="sr-only">Pendente</span>
            <CircleIcon className="text-2xl text-zinc-800" />
          </>
        )}
      </span>

      <p
        className={`flex-1 text-zinc-800 font-medium py-2 break-words ${
          isDone && 'line-through text-zinc-600'
        }`}
      >
        {title}
      </p>

      <button
        className="group bg-zinc-100 rounded-2xl p-2 transition hover:bg-red-100"
        onClick={handleDeleteTask}
      >
        <span className="sr-only">Deletar tarefa</span>
        <TrashIcon className="pointer-events-none text-2xl text-red-500 group-hover:text-red-600" />
      </button>
    </li>
  );
}
