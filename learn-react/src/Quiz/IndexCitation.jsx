import React, { useState } from "react";
import Timer from "./Timer";
import Score from "./Score";
import { quizData } from "./quizData.js";
import QuizContent from "./QuizContent";
import { esmExternalRequirePlugin } from "vite";
export default function IndexQuiz() {
  const [index, setIndex] = useState(0);
  const [feedBack, setFeedBack] = useState("");
  let data = quizData[index];
  const checkAnswer = (choix, correct) => {
    if (choix === correct) {
      console.log("Bonne reponse");
    } else {
      console.log("Mauvaise");
    }
    setIndex((ind) => ind + 1);
  };
  const getFeedBack = (message, type) => {
    if (type === "info") {
      feedBack.className = "text-green-500";
    } else if (type === "err") {
      feedBack.className = "text-red-500";
    } else {
      feedBack.className = "text-yellow-500";
    }
  };
  return (
    <div className="h-screen w-full flex flex-col content-center items-center bg-blue-400 text-center">
      <div>
        <Timer />
        <Score />
      </div>
      <QuizContent data={data} onSelect={checkAnswer} />
    </div>
  );
}
