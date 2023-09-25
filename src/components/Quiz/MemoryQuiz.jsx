import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css";
import Timer, { MemoryTimer, points } from "../utils/Timer";
import axios from "axios";

// const txtQzObj = {
//   quizTitle: "Memory_Quiz",
//   quizQuestion:
//     "<img src=https://drive.google.com/uc?export=view&id=1ia5zLrPzoSX_rFcucKQD87FYgy07L6wl class='imgElem'/>",
// };

// function changeState() {
//   console.log("changeState");
// }

// const currentParticipant = {
//   a: "currentParticipant",
// };

// const next = () => {
//   console.log("next");
// };
// const property = {
//   a: "property",
// };

function MemoryQuiz({ changeState, currentParticipant, next, txtQzObj }) {
  const [memory, setMemory] = useState(true);
  let pts = 0;
  function toggleMemory() {
    console.log("inside toggle");
    setMemory((prev) => !prev);
  }

  function finalize() {
    axios
      .post(
        "/updatePoints",
        { currentParticipant, points: pts },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((r) => {
        console.log(r.data);
      });
    next();
    changeState();
  }
  function validateQuiz(event) {
    pts = parseInt(event.target.value);
  }

  return (
    <div className="quiz-container">
      <div className="quiz-title-pane">
        <div className="quiz-title">{txtQzObj?.quizTitle}</div>
        {/* <div className="quiz-disclaimer">
          Double click the option to select it
        </div> */}
        <div className="quiz-timer">
          <span className="counter">
            {txtQzObj && <MemoryTimer toggleMemory={toggleMemory} />}
          </span>
          secs
        </div>
      </div>
      <span className="divider"></span>
      <div className="quiz-arena">
        {memory && (
          <div
            className="qn-area"
            style={{ textAlign: "center" }}
            dangerouslySetInnerHTML={{ __html: txtQzObj?.quizQuestion }}
            onClick={toggleMemory}
          ></div>
        )}
        <div className="options-area">
          <input
            type="text"
            name="option"
            id="option"
            className="txtOptions"
            onChange={validateQuiz}
          />
        </div>
        {!memory && (
          <button type="button" className="btn" onClick={toggleMemory}>
            Show Image
          </button>
        )}
        <button type="button" className="btn" onClick={finalize}>
          Finalize
        </button>
      </div>
    </div>
  );
}

export default MemoryQuiz;
