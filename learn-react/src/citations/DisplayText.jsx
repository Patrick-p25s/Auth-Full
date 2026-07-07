import React from "react";

export default function DisplayText({ titre, text }) {
  return titre ? (
    <h1 className="text-red-500 underline">{text}</h1>
  ) : (
    <h3 className="text-blue-500 italic">{text}</h3>
  );
}
