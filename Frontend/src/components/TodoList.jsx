import { useState } from "react";
import { useTodos } from "../context/useTodos";
import TodoForm from "./TodoForm";
import { TodoItem } from "./TodoItem";

export default function TodoList() {
  const {
    tasks,
    loading,
    erreur,
    addTask,
    removeTask,
    finishToogle,
    updateTask,
  } = useTodos();

  const [taskToEdit, setTaskToEdit] = useState(null);
  if (loading) {
    return <h1>chargement ...</h1>;
  }
  if (erreur) {
    return <h1 className="text-red-600">{erreur}</h1>;
  }

  const handleUpdate = async (id, dataUpdate) => {
    await updateTask(id, dataUpdate);
    setTaskToEdit(null);
  };

  return (
    <div>
      <TodoForm
        onAdd={addTask}
        taskToEdit={taskToEdit}
        onUpdate={handleUpdate}
        onCancelEdit={() => setTaskToEdit(null)}
      />
      {tasks.length <= 0 ? (
        <p>Aucune tache pour le moment</p>
      ) : (
        tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={removeTask}
            onToggle={finishToogle}
            onUpdate={setTaskToEdit}
          />
        ))
      )}
    </div>
  );
}
