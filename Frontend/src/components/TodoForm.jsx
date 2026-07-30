import { useState } from "react";

const CATEGORY = ["perso", "pro", "groupe"];

export default function TodoForm({ onAdd }) {
  const [tache, setTache] = useState("");
  const [category, setCategory] = useState(CATEGORY[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tache.trim().length <= 3) {
      return;
    }
    console.log("Patrick");
    await onAdd({ tache, category });
    setTache("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="tache">Le tache ici</label>
        <input
          id="tache"
          type="text"
          value={tache}
          onChange={(e) => {
            setTache(e.target.value);
          }}
        />
      </div>
      <div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORY.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add tache</button>
    </form>
  );
}
