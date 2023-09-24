import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css";
import Timer, { points } from "../utils/Timer";
import axios from "axios";
import { payRent } from "../utils/payRent";

function OptQuiz({ changeState, currentParticipant, property, next, qzObj }) {
  const [option, setOption] = useState(false);
  const [expl, setExpl] = useState(false);
  const crtOpt = useRef(false);
  // const [time, setTime] = useState(20);
  // time = 20;
  //   function handleClick(event) {
  //     event.classList.toggle("clicked-option");
  //     setOption;
  //   }
  function finalize() {
    // console.log(option);
    axios
      .post(
        "/updatePoints",
        { currentParticipant, points: crtOpt.current ? points() : 0 },
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
    // console.log(event);
    // console.log(
    //   event.target.innerText,
    //   qzObj.correctOption,
    //   event.target.innerText == qzObj.correctOption
    // );
    if (
      event.target.innerText.toLowerCase() === qzObj.correctOption.toLowerCase()
    ) {
      crtOpt.current = true;
      event.target.classList.add("correct-option");
      console.log("hit");
      event.target.classList.remove("wrong-option");
      setOption(() => true);
    } else {
      crtOpt.current = false;
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
  var cond = qzObj && qzObj.explanation && expl;
  useEffect(() => {
    // setExpl(()=>)
    cond = qzObj && qzObj.explanation && expl;
    qzObj && console.log(qzObj.explanation, expl, cond);
  }, [expl]);
  return (
    <div className="quiz-container">
      <div className="quiz-title-pane">
        <div className="quiz-title">{qzObj && qzObj.quizTitle}</div>
        <div className="quiz-disclaimer">
          {cond ? "explanation:" : "Double click the option to select it"}
        </div>
        {cond ? (
          <></>
        ) : (
          <div className="quiz-timer">
            <span className="counter">{<Timer option={option} />}</span>secs
          </div>
        )}
      </div>
      <span className="divider"></span>
      <div className="quiz-arena">
        {qzObj && (
          <div
            className="qn-area"
            dangerouslySetInnerHTML={{ __html: qzObj.quizQuestion }}
          ></div>
        )}
        <div className="options-area">
          {cond ? (
            <>
              <span className="divider"></span>
              <div className="options">{qzObj && qzObj.explanation}</div>
            </>
          ) : (
            <ul className="options">
              {qzObj &&
                qzObj.quizOptions &&
                qzObj.quizOptions.map((ele) => {
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
          )}
        </div>
        <button
          type="button"
          className="btn"
          onClick={
            !cond
              ? () => {
                  setExpl(() => true);
                }
              : finalize
          }
        >
          Finalize
        </button>
      </div>
    </div>
  );
}

export default OptQuiz;
