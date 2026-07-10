import React, { useEffect, useState } from "react";

const quizData = [
  {
    id: 1,
    question: "Quelle est la capitale de la France ?",
    options: ["Londres", "Berlin", "Paris", "Madrid"],
    correctIndex: 2,
  },
  {
    id: 2,
    question: "Combien y a-t-il de continents sur Terre ?",
    options: ["5", "6", "7", "8"],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "Quel est le plus grand océan du monde ?",
    options: [
      "Océan Atlantique",
      "Océan Pacifique",
      "Océan Indien",
      "Océan Arctique",
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "Quel animal est connu pour construire des barrages ?",
    options: ["Le castor", "L'ours", "Le singe", "Le lion"],
    correctIndex: 0,
  },
  {
    id: 5,
    question: "Combien de côtés a un triangle ?",
    options: ["3", "4", "5", "6"],
    correctIndex: 0,
  },
];

export default function App() {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [index, setIndex] = useState(0);
  const data = quizData[index];

  useEffect(() => {
    const temps = setInterval(() => {
      setTimer(timer - 1);
      if (timer === 0) {
        clearInterval(timer);
        NextQuestion();
      }
    }, 1000);
    return () => clearInterval(temps);
  });
  function NextQuestion() {
    if (index === quizData.length - 1) {
      setTimer(0);
      console.log("Fin du jeux");
      return;
    }
    setTimer(10);
    setIndex(index + 1);
  }

  function checkResponse(correct, choix) {
    if (correct === choix) {
      console.log("correct");
    } else {
      console.log("Incorrect");
    }
    NextQuestion();
    setTimer(10);
  }
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <div className="w-1/2 border-2 border-black rounded-3xl p-5">
        <div className="flex justify-around">
          <Score data={score} />
          <Timer timer={timer} />
        </div>
        <DisplayData data={data} getResponse={checkResponse} />
      </div>
    </div>
  );
}

function Score({ data }) {
  return (
    <div className="border bg-red-400 text-white text-center font-bold p-5 rounded-2xl shadow-2xl">
      <p>Score</p>
      <h1>{data}</h1>
    </div>
  );
}

function Timer({ timer }) {
  return (
    <div className="border bg-red-400 text-white text-center font-bold p-5 rounded-2xl shadow-2xl">
      <p>Temps</p>
      <h1>{timer}</h1>
    </div>
  );
}

function DisplayData({ data, getResponse }) {
  return (
    <div className="text-center pt-7">
      <h1 className="font-bold text-2xl italic">{data.question}</h1>
      {data.options.map((option, index) => (
        <p
          key={option}
          onClick={() => getResponse(data.correctIndex, index)}
          className="p-4 bg-gray-400 m-2"
        >
          {option}
        </p>
      ))}
    </div>
  );
}
