import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { useTodos } from "./useTodo";

export function TodoList() {
  const { tasks, loading, error, addTask, removeTask, toggleFinish } =
    useTodos();

  if (loading) return <p>Chargement des tâches...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <TodoForm onAdd={addTask} />
      <ul>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={toggleFinish}
            onDelete={removeTask}
          />
        ))}
      </ul>
      {tasks.length === 0 && <p>Aucune tâche pour l'instant.</p>}
    </div>
  );
}
