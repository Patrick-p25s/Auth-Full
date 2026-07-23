import { useState } from "react";

const CATEGORIES = ["perso", "pro", "autre"]; // ⚠️ remplace par les vraies valeurs de ton enum Category

export function TodoForm({ onAdd }) {
  const [tache, setTache] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tache.trim()) return;
    await onAdd({ tache, category });
    setTache("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={tache}
        onChange={(e) => setTache(e.target.value)}
        placeholder="Nouvelle tâche"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button type="submit">Ajouter</button>
    </form>
  );
}
