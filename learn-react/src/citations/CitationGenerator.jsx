import React from "react";
import { citations } from "../data.js";
import DisplayText from "./DisplayText.jsx";

export default function CitationGenerator({ children }) {
  const [index, setIndex] = React.useState(0);
  const quotes = citations[index];
  const next = () => {
    setIndex((ind) => (ind + 1) % citations.length);
  };
  return (
    <div>
      <DisplayText text={quotes.citation} />
      <button onClick={next}>Next</button>
      {children}
    </div>
  );
}
