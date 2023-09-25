import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css";
import Timer, { MemoryTimer, points } from "../utils/Timer";
import axios from "axios";
import { payRent } from "../utils/payRent";

const txtQzObj = {
  quizTitle: "Memory_Quiz",
  quizQuestion:
    "<img src=https://drive.google.com/uc?export=view&id=1ia5zLrPzoSX_rFcucKQD87FYgy07L6wl class='imgElem'/>",
};

function changeState() {
  console.log("changeState");
}

const currentParticipant = {
  a: "currentParticipant",
};

const next = () => {
  console.log("next");
};
const property = {
  a: "property",
};

function TextQuiz(
  {
    // changeState,
    // currentParticipant,
    // property,
    // next,
    // txtQzObj,
  }
) {
  const [option, setOption] = useState(false);
  const [memory, setMemory] = useState(true);
  let pts = 0;

  const crtOpt = useRef(false);

  var done = 1;
  console.log(txtQzObj);
  function checkAnagram() {
    return property.propertyName === "Tech Anagrams";
  }
  function finalize() {
    pts = checkAnagram() ? (crtOpt.current ? points() : 0) : pts;
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
        !crtOpt.current && payRent(currentParticipant, property);
      });
    crtOpt.current && next();
    console.log("value of crtOpt", crtOpt);
    changeState();
  }
  function validateQuiz(event) {
    if (checkAnagram()) {
      if (
        event.target.value.toLowerCase() ===
        txtQzObj?.correctAnswer.toLowerCase()
      ) {
        crtOpt.current = true;
        event.target.classList.add("correct-option");
        console.log("hit");
        event.target.classList.remove("wrong-option");
        setOption(() => true);
      } else {
        crtOpt.current = false;
        console.log("wrong hit");
        event.target.classList.add("wrong-option");
        event.target.classList.remove("correct-option");
        setOption(() => true);
      }
    } else {
      pts = parseInt(event.target.value);
      setOption(() => true);
    }
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
            {txtQzObj && checkAnagram() && <Timer option={option} />}
            {txtQzObj && !checkAnagram() && (
              <MemoryTimer option={option} setMemory={setMemory} />
            )}
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
          >
            {/* {txtQzObj?.quizQuestion} */}
          </div>
        )}
        <div className="options-area">
          <input
            type="text"
            name="option"
            id="option"
            className="options"
            onChange={validateQuiz}
          />
        </div>
        {!memory && !checkAnagram() && (
          <button type="button" className="btn" onClick={setMemory(() => true)}>
            Show Answer
          </button>
        )}
        <button type="button" className="btn" onClick={finalize}>
          Finalize
        </button>
      </div>
    </div>
  );
}

export default TextQuiz;
