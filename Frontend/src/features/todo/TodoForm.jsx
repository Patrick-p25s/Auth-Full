import { useState } from "react";

const CATEGORIES = ["perso", "pro", "autre"];

export function TodoForm({ onAdd }) {
  const [tache, setTache] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModify, setModify] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tache.trim()) return;

    setIsSubmitting(true);
    try {
      await onAdd({ tache, category });
      setTache("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-3 items-center mb-6"
    >
      {/* Champ Texte */}
      <input
        type="text"
        value={tache}
        onChange={(e) => setTache(e.target.value)}
        placeholder="Ajouter une nouvelle tâche..."
        disabled={isSubmitting}
        className="w-full flex-1 px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
      />

      {/* Sélecteur de Catégorie */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isSubmitting}
        className="w-full sm:w-auto px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer capitalize transition-all"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Bouton d'ajout */}
      <button
        type="submit"
        disabled={isSubmitting || !tache.trim()}
        className="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-medium text-sm rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
      >
        {isSubmitting ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
}
