import React from "react";

export default function QuizContent({ data, onSelect }) {
  return (
    <div>
      <h1>{data.question}</h1>
      {data.options.map((option, index) => (
        <div key={option} onClick={() => onSelect(index, data.answer)}>
          <p>{option}</p>
        </div>
      ))}
    </div>
  );
}
