import React from "react";
const citations = [
  {
    id: 1,
    citation:
      "La connaissance s'acquiert par l'expérience, tout le reste n'est que de l'information.",
    auteur: "Albert Einstein",
    classe: "science-innovation",
  },
  {
    id: 2,
    citation:
      "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte.",
    auteur: "Winston Churchill",
    classe: "motivation-resilience",
  },
  {
    id: 3,
    citation:
      "L'éducation est l'arme la plus puissante que vous puissiez utiliser pour changer le monde.",
    auteur: "Nelson Mandela",
    classe: "education-impact",
  },
  {
    id: 4,
    citation:
      "On ne peut pas changer la direction du vent, mais on peut ajuster ses voiles pour toujours atteindre sa destination.",
    auteur: "Sénèque",
    classe: "philosophie-sagesse",
  },
  {
    id: 5,
    citation: "L'impossible d'aujourd'hui deviendra possible demain.",
    auteur: "Walt Disney",
    classe: "creativite-futur",
  },
];

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
