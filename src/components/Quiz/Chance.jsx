import React from "react";
import "./Quiz.css";

function Chance({ chzObj }) {
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

export default Chance;
