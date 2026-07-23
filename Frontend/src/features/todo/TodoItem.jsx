// Couleurs distinctes selon la catégorie
const categoryStyles = {
  perso: "bg-purple-50 text-purple-700 border-purple-200",
  pro: "bg-blue-50 text-blue-700 border-blue-200",
  autre: "bg-slate-100 text-slate-700 border-slate-200",
};

export function TodoItem({ task, onToggle, onDelete }) {
  const badgeStyle = categoryStyles[task.category] || categoryStyles.autre;

  return (
    <li className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-slate-300 transition-all group mb-2">
      <div className="flex items-center gap-3 min-w-0 flex-1 mr-3">
        {/* Checkbox personnalisé pour valider la tâche */}
        <input
          type="checkbox"
          checked={task.is_completed}
          onChange={() => onToggle(task.id)}
          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer shrink-0"
        />

        {/* Intitulé de la tâche */}
        <span
          onClick={() => onToggle(task.id)}
          className={`text-sm cursor-pointer truncate transition-all ${
            task.is_completed
              ? "line-through text-slate-400"
              : "text-slate-800 font-medium"
          }`}
        >
          {task.tache}
        </span>

        {/* Badge de catégorie si présent dans task */}
        {task.category && (
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full border capitalize shrink-0 font-medium ${badgeStyle}`}
          >
            {task.category}
          </span>
        )}
      </div>

      {/* Bouton de suppression */}
      <button
        onClick={() => onDelete(task.id)}
        className="text-xs text-slate-400 hover:text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
        title="Supprimer la tâche"
      >
        Supprimer
      </button>
    </li>
  );
}
