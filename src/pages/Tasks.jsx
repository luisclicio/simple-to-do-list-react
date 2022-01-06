import { useState } from 'react';

import { PlusIcon, CheckCircleIcon, CloseIcon } from '../shared/Icons';
import { TaskItem } from '../components/TaskItem';
import { FormattedDateTime } from '../components/FormattedDateTime';

import { useNowTime } from '../hooks/useNowTime';
import { useTasks } from '../hooks/useTasks';
import { useForm } from '../hooks/useForm';

export function Tasks() {
  const { tasks, addTask } = useTasks();
  const nowTime = useNowTime();

  const [newTaskModelIsOpen, setNewTaskModelIsOpen] = useState(false);

  const {
    formData: taskFormData,
    handleFormData: handleTaskFormData,
    resetFormData: resetTaskFormData,
  } = useForm({
    title: '',
    isDone: false,
  });

  function toggleModalVisibility() {
    setNewTaskModelIsOpen((prev) => !prev);
  }

  function taskFormDataIsValid() {
    if (!taskFormData.title.trim()) {
      return false;
    }

    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!taskFormDataIsValid()) {
      return;
    }

    addTask(taskFormData);
    resetTaskFormData();
    toggleModalVisibility();
  }

  return (
    <div className="container">
      <header className="bg-gradient-to-tr from-blue-700 to-blue-500 text-zinc-50 p-4 rounded-2xl shadow-xl sticky top-4 sm:top-6">
        <div className="flex items-center justify-between gap-x-6">
          <h1 className="text-2xl font-bold">Minhas Tarefas</h1>

          <button
            className="btn--base px-3 sm:px-4"
            onClick={toggleModalVisibility}
          >
            <span className="sr-only sm:not-sr-only font-semibold">
              Nova tarefa
            </span>

            <PlusIcon className="h-8 text-2xl" />
          </button>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-x-6 gap-y-1 mt-12">
          <h4>
            <span className="font-medium">Pendentes: </span>
            <span className="font-bold">
              {tasks.filter((task) => !task.isDone).length}
            </span>
          </h4>

          <h4 className="font-medium">
            <FormattedDateTime dateTime={nowTime} />
          </h4>
        </div>
      </header>

      <main className="mt-4">
        {tasks.length <= 0 ? (
          <div className="h-[calc(100vh-300px)] flex flex-col items-center justify-center">
            <CheckCircleIcon className="text-9xl text-blue-500" />

            <h2 className="text-2xl text-center text-blue-500 font-medium mt-4 max-w-xs">
              Nenhuma tarefa criada
            </h2>
          </div>
        ) : (
          <ul>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        )}
      </main>

      {newTaskModelIsOpen && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center bg-zinc-900 bg-opacity-30"
          onClick={toggleModalVisibility}
        >
          <div className="container">
            <section
              className="container bg-zinc-50 rounded-2xl shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Adicionar tarefa</h3>

                <button
                  type="button"
                  className="btn--base group px-3 bg-zinc-100 hover:bg-red-100"
                  onClick={toggleModalVisibility}
                >
                  <span className="sr-only">Fechar</span>

                  <CloseIcon className="text-2xl h-8 text-red-500 group-hover:text-red-600" />
                </button>
              </header>

              <form
                className="flex flex-col gap-3 mt-2"
                onSubmit={handleSubmit}
              >
                <label className="flex flex-col">
                  <span className="font-semibold text-zinc-700 mb-1">
                    Título
                  </span>

                  <input
                    type="text"
                    name="title"
                    placeholder="Beber água, Fazer exercícios, etc."
                    className="input--text"
                    value={taskFormData.title}
                    onChange={handleTaskFormData}
                  />
                </label>

                <label>
                  <span className="font-semibold text-zinc-700 mb-1">
                    Estado
                  </span>

                  <input
                    type="checkbox"
                    name="isDone"
                    className="sr-only"
                    value={taskFormData.isDone}
                    checked={taskFormData.isDone}
                    onChange={handleTaskFormData}
                  />

                  <span
                    className={`btn--base h-10 font-semibold border-2 transition ${
                      taskFormData.isDone
                        ? 'border-blue-500 bg-blue-100 text-blue-600'
                        : 'border-red-500 bg-red-100 text-red-600'
                    }`}
                  >
                    {taskFormData.isDone ? 'Finalizada' : 'Pendente'}
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!taskFormDataIsValid()}
                  className="btn--base font-semibold bg-blue-500 text-zinc-50"
                >
                  Criar tarefa
                </button>
              </form>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
