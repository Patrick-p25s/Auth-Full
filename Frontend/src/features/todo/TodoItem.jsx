export function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li style={{ textDecoration: task.finished ? "line-through" : "none" }}>
      <span onClick={() => onToggle(task.id)} style={{ cursor: "pointer" }}>
        {task.title}
      </span>
      <button onClick={() => onDelete(task.id)}>Supprimer</button>
    </li>
  );
}
