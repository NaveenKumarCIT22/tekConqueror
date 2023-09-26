import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css";
import Timer, { MemoryTimer, points } from "../utils/Timer";
import axios from "axios";
import { payRent } from "../utils/payRent";

function TextQuiz({
  changeState,
  currentParticipant,
  property,
  next,
  txtQzObj,
}) {
  const [option, setOption] = useState(false);
  let pts = 0;

  const crtOpt = useRef(false);

  function checkAnagram() {
    return property.propertyName === "Tech Anagrams";
  }
  function finalize() {
    checkAnagram() && window.alert(`The answer is : ${txtQzObj.Answer}!!`);
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
        (checkAnagram() && checkAnagram && !crtOpt.current) ||
          (pts === 0 && payRent(currentParticipant, property));
      });
    crtOpt.current && next();
    console.log("value of crtOpt", crtOpt);
    changeState();
  }
  function validateQuiz(event) {
    if (checkAnagram()) {
      if (event.target.value.toLowerCase() === txtQzObj?.Answer.toLowerCase()) {
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
            {txtQzObj && <Timer option={option} />}
          </span>
          secs
        </div>
      </div>
      <span className="divider"></span>
      <div className="quiz-arena">
        <div
          className="qn-area"
          style={{ textAlign: "center" }}
          dangerouslySetInnerHTML={{ __html: txtQzObj?.quizQuestion }}
        ></div>

        <div className="options-area">
          <input
            type="text"
            name="option"
            id="option"
            className="txtOptions"
            onChange={validateQuiz}
          />
        </div>
        <button type="button" className="btn" onClick={finalize}>
          Finalize
        </button>
      </div>
    </div>
  );
}

export default TextQuiz;
