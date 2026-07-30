import { useTodos } from "../context/useTodos";
import TodoForm from "./TodoForm";
import { TodoItem } from "./TodoItem";

export default function TodoList() {
  const { tasks, loading, erreur, addTask, removeTask, finishToogle } =
    useTodos();
  if (loading) {
    return <h1>chargement ...</h1>;
  }
  if (erreur) {
    return <h1 className="text-red-600">{erreur}</h1>;
  }
  console.log(tasks);
  return (
    <div>
      <TodoForm onAdd={addTask} />
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onDelete={removeTask}
          onToggle={finishToogle}
        />
      ))}
    </div>
  );
}
