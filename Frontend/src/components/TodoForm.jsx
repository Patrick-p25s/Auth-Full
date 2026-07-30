import { useEffect, useState } from "react";

const CATEGORIES = ["perso", "pro", "groupe"];

export default function TodoForm({
  onAdd,
  onUpdate,
  taskToEdit,
  onCancelEdit,
}) {
  const [tache, setTache] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  useEffect(() => {
    if (taskToEdit) {
      setTache(taskToEdit.tache);
      setCategory(taskToEdit.category);
    } else {
      resetForm();
    }
  }, [taskToEdit]);

  const resetForm = () => {
    setTache("");
    setCategory(CATEGORIES[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tache.trim().length <= 3) return;

    if (taskToEdit) {
      await onUpdate(taskToEdit.id, { tache: tache.trim(), category });
    } else {
      await onAdd({ tache: tache.trim(), category });
    }

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="tache">La tâche ici :</label>
        <input
          id="tache"
          type="text"
          value={tache}
          onChange={(e) => setTache(e.target.value)}
          placeholder="Ex: Faire les courses"
        />
      </div>

      <div>
        <label htmlFor="category">Catégorie :</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">{taskToEdit ? "Modifier" : "Ajouter"}</button>

      {taskToEdit && (
        <button type="button" onClick={onCancelEdit}>
          Annuler
        </button>
      )}
    </form>
  );
}
