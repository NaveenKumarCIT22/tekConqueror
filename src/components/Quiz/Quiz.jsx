import React, { useEffect, useState } from "react";
import "./Quiz.css";
import Timer, { points } from "../utils/Timer";
import axios from "axios";
// import { setIsQuiz } from "../CardDetails/CardDetails";

const qzObj = {
  quizTitle: "Tech Question",
  quizQuestion: "What Question is this?",
  quizOptions: [
    "This Question",
    "That Question",
    "Some Question",
    "No Question",
  ],
  correctOption: "Some Question",
};

function Quiz({ changeState, currentParticipant }) {
  // function Quiz({ changeState, currentParticipant, qzObj }) {
  const [option, setOption] = useState(false);
  var crtOpt = false;
  // const [time, setTime] = useState(20);
  var done = 1;
  // time = 20;
  //   function handleClick(event) {
  //     event.classList.toggle("clicked-option");
  //     setOption;
  //   }
  function finalize() {
    // console.log(option);
    changeState();

    axios
      .post(
        "/updatePoints",
        { currentParticipant, points: crtOpt ? points() : 0 },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((r) => {
        console.log(r.data);
      });
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
      crtOpt = true;
      event.target.classList.add("correct-option");
      console.log("hit");
      event.target.classList.remove("wrong-option");
      setOption(() => true);
    } else {
      crtOpt = false;
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
        <div className="quiz-disclaimer">
          Double click the option to select it
        </div>
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
