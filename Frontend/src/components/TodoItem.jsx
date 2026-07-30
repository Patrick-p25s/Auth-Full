export function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li style={{ textDecoration: task.is_completed ? "line-through" : "none" }}>
      <span onClick={() => onToggle(task.id)} style={{ cursor: "pointer" }}>
        {task.tache}
      </span>
      <button onClick={() => onDelete(task.id)}>Supprimer</button>
    </li>
  );
}
