import { useEffect, useState } from "react";

function QuizProt({ data }) {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const activeData = data[index];

  // Gestion du timer
  useEffect(() => {
    if (isFinished) return;

    if (timer === 0) {
      handleNextQuestion(false);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isFinished]);

  function handleNextQuestion(isCorrect) {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (index + 1 < data.length) {
      setIndex((prev) => prev + 1);
      setTimer(10); // Réinitialise le timer pour la question suivante
    } else {
      setIsFinished(true);
    }
  }

  function responseHandler(correctIndex, choiceIndex) {
    const isCorrect = correctIndex === choiceIndex;
    handleNextQuestion(isCorrect);
  }

  function restartQuiz() {
    setScore(0);
    setIndex(0);
    setTimer(10);
    setIsFinished(false);
  }

  // Écran de fin
  if (isFinished) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl text-center space-y-6 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-800">
          Quiz Terminé ! 🎉
        </h2>
        <div className="py-4 bg-indigo-50 rounded-xl">
          <p className="text-gray-600 text-sm font-medium">Votre Score final</p>
          <p className="text-5xl font-black text-indigo-600 mt-1">
            {score}{" "}
            <span className="text-2xl text-gray-400 font-normal">
              / {data.length}
            </span>
          </p>
        </div>
        <button
          onClick={restartQuiz}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition active:scale-95"
        >
          Rejouer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl space-y-6 border border-gray-100">
      {/* En-tête : Timer + Score */}
      <section className="flex justify-between items-center pb-4 border-b border-gray-100">
        <Timer timeleft={timer} />
        <Score score={score} total={data.length} />
      </section>

      {/* Barre de progression visuelle */}
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        <div
          className="bg-indigo-600 h-full transition-all duration-300"
          style={{ width: `${((index + 1) / data.length) * 100}%` }}
        ></div>
      </div>

      {/* Question et options */}
      <DisplayQuestion
        data={activeData}
        currentIndex={index + 1}
        totalQuestions={data.length}
        onSelectOption={responseHandler}
      />
    </div>
  );
}

function Timer({ timeleft }) {
  const isUrgent = timeleft <= 3;
  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Temps
      </span>
      <span
        className={`text-lg font-bold px-3 py-1 rounded-lg transition-colors ${
          isUrgent
            ? "bg-red-100 text-red-600 animate-pulse"
            : "bg-indigo-50 text-indigo-600"
        }`}
      >
        {timeleft}s
      </span>
    </div>
  );
}

function Score({ score, total }) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Score
      </span>
      <span className="text-lg font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">
        {score} / {total}
      </span>
    </div>
  );
}

function DisplayQuestion({
  data,
  currentIndex,
  totalQuestions,
  onSelectOption,
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
          Question {currentIndex} sur {totalQuestions}
        </span>
        <h1 className="text-xl font-bold text-gray-800 leading-snug">
          {data.question}
        </h1>
      </div>

      <div className="space-y-2.5 pt-2">
        {data.options.map((option, index) => (
          <button
            key={`option-${index}`}
            onClick={() => onSelectOption(data.correctIndex, index)}
            className="w-full text-left p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-indigo-50 hover:border-indigo-300 font-medium text-gray-700 transition duration-150 active:scale-[0.99] flex items-center justify-between group"
          >
            <span>{option}</span>
            <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-400 group-hover:border-indigo-500 group-hover:text-indigo-500 transition">
              {String.fromCharCode(65 + index)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

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

export default function Quiz() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <QuizProt data={quizData} />
    </div>
  );
}
