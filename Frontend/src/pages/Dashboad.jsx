import { TodoList } from "../features/todo/Todolist";

export default function Dashboard() {
  return (
    <div>
      <h1>Mes tâches</h1>
      <TodoList />
    </div>
  );
}
