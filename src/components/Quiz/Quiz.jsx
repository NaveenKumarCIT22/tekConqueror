import React, { useEffect, useState } from "react";
import "./Quiz.css";
import Timer from "../utils/Timer";
// import { setIsQuiz } from "../CardDetails/CardDetails";

function Quiz({ changeState }) {
  const [option, setOption] = useState(false);
  // const [time, setTime] = useState(20);
  var done = 1;
  // time = 20;
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
    // console.log(option);
    changeState();
  }
  function validateQuiz(event) {
    // console.log(event);
    // console.log(
    //   event.target.innerText,
    //   qzObj.correctOption,
    //   event.target.innerText == qzObj.correctOption
    // );
    if (
      event.target.innerText.toLowerCase() === qzObj.correctOption.toLowerCase()
    ) {
      event.target.classList.add("correct-option");
      console.log("hit");
      event.target.classList.remove("wrong-option");
      setOption(() => true);
    } else {
      event.target.classList.add("wrong-option");
      event.target.classList.remove("correct-option");
      setOption(() => true);
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
  return (
    <div className="quiz-container">
      <div className="quiz-title-pane">
        <div className="quiz-title">{qzObj.quizTitle}</div>
        <div className="quiz-timer">
          <span className="counter">{<Timer option={option} />}</span>secs
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