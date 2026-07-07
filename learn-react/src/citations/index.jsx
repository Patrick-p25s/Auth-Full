import React from "react";
import Citation from "./Citation";
import DisplayText from "./DisplayText";
import CitationGenerator from "./CitationGenerator";

export default function App() {
  return (
    <div>
      <DisplayText titre text="Grand titre de l'application" />
      <CitationGenerator>
        <p>Sous partie de la citation</p>
      </CitationGenerator>
    </div>
  );
}
