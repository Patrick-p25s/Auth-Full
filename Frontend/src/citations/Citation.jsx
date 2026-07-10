import React from "react";

export default function Citation() {
  const [index, setIndex] = React.useState(0);
  const Actuel = citations[index];
  const next = () => {
    setIndex((ind) => (ind + 1) % citations.length);
  };
  return (
    <div>
      <p>{Actuel.citation}</p>
      <p>{Actuel.auteur}</p>
      <button onClick={next}>Next</button>
    </div>
  );
}
