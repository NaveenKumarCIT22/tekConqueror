import React, { useEffect, useState } from "react";
import "./Quiz.css";

function Quiz() {
  const [option, setOption] = useState("");
  const [time, setTime] = useState(20);
  const qzObj = {
    quizTitle: "Tech Question",
    quizQuestion: "What Question is this?",
    quizOptions: [
      "Some Question",
      "This Question",
      "That Question",
      "No Question",
    ],
    correctOption: "Some Question",
  };
  //   function handleClick(event) {
  //     event.classList.toggle("clicked-option");
  //     setOption;
  //   }
  function finalize() {
    console.log(option);
  }
  function validateQuiz(event) {
    console.log(event);
    console.log(
      event.target.innerText,
      qzObj.correctOption,
      event.target.innerText == qzObj.correctOption
    );
    if (event.target.innerText == qzObj.correctOption) {
      event.target.classList.add("correct-option");
      event.target.classList.remove("wrong-option");
      setOption(true);
    } else {
      event.target.classList.add("wrong-option");
      event.target.classList.remove("correct-option");
      setOption(false);
    }
  }
  //   var count = 20;
  //   var timer = setInterval(() => {
  //     // count -= 1;
  //     setTime((pre) => pre - 1);
  //     if (count < 0) {
  //       clearInterval(timer);
  //     }
  //   }, 1000);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((pre) => pre - 1);
    }, 1000);
    if (time <= 0) {
      clearInterval(timer);
      alert("Time Over");
    }
    return () => clearInterval(timer);
  }, [time]);
  return (
    <div className="quiz-container">
      <div className="quiz-title-pane">
        <div className="quiz-title">{qzObj.quizTitle}</div>
        <div className="quiz-timer">
          <span className="counter">{time}</span>secs
        </div>
      </div>
      <span className="divider"></span>
      <div className="quiz-arena">
        <div className="qn-area">{qzObj.quizQuestion}</div>
        <div className="options-area">
          <ul className="options">
            {qzObj.quizOptions.map((ele) => {
              return (
                <li
                  className="option"
                  key={crypto.randomUUID()}
                  value={ele}
                  onClick={(e) => validateQuiz(e)}
                >
                  {ele}
                </li>
              );
            })}
          </ul>
        </div>
        <button type="button" className="btn" onClick={finalize}>
          Finalize
        </button>
      </div>
    </div>
  );
}

export default Quiz;
