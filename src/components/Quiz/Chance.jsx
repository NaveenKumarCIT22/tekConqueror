import React, { useState } from "react";
import "./Quiz.css";

const chzObj = {
  title: "Chance Title",
  message:
    "Do as the chance card says and get benefits. Anyways you can stay still.",
};

function Chance() {
  // function Chance({ changeState, currentParticipant,chzObj }) {
  const [option, setOption] = useState(false);

  var crtOpt = false;
  var done = 1;
  function finalize() {
    changeState();
    // axios
    //   .post(
    //     "/updatePoints",
    //     { currentParticipant, points: crtOpt ? points() : 0 },
    //     {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //       },
    //     }
    //   )
    //   .then((r) => {
    //     console.log(r.data);
    //   });
  }

  return (
    <div className="quiz-container">
      <div className="quiz-title-pane">
        <div className="quiz-title">{chzObj.title}</div>
        {/* <div className="quiz-disclaimer">
          Double click the option to select it
        </div> */}
        {/* <div className="quiz-timer">
          <span className="counter">{<Timer option={option} />}</span>secs
        </div> */}
      </div>
      <span className="divider"></span>
      <div className="quiz-arena">
        <div className="qn-area" style={{ textAlign: "center" }}>
          {chzObj.message}
        </div>
        <button type="button" className="btn" onClick={finalize}>
          Finalize
        </button>
      </div>
    </div>
  );
}

export default Chance;
