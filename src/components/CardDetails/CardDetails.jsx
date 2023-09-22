import React, { useState } from "react";
import "./CardDetails.css";
import Quiz from "../Quiz/Quiz";
import axios from "axios";

function CardDetails({ propertyInfo, currentParticipant, chzObj, next }) {
  const [isQuiz, setIsQuiz] = useState(false);
  const { owner, price, category, propertyName } = propertyInfo;
  function changeState() {
    setIsQuiz((prev) => !prev);
  }
  function buy() {
    axios
      .post(
        "/buy",
        { currentParticipant, price, propertyInfo },
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
  function handleClick() {
    if (owner === "") {
      buy();
    } else {
      setIsQuiz(() => true);
    }
  }
  return (
    <>
      <div className="card-details">
        <div className="card-det">
          <span id="propertyName">{propertyName}</span>
          <span id="category">Category: {category}</span>
          {owner !== "" && <span id="owner">{owner}</span>}
          <span id="price">Price: ${price}</span>
          {chzObj ? (
            <>
              <button id="cardBtn" onClick={() => setIsQuiz(true)}>
                Face It
              </button>
              <button id="cardBtn" onClick={next}>
                Next
              </button>
            </>
          ) : (
            <>
              <button id="cardBtn" onClick={handleClick}>
                {owner !== "" ? "Face It" : "Buy It"}
              </button>
              <button id="cardBtn" onClick={next}>
                Next
              </button>
            </>
          )}
        </div>
      </div>
      {isQuiz && owner !== "" ? (
        <Quiz
          changeState={changeState}
          currentParticipant={currentParticipant}
        />
      ) : (
        <></>
      )}
      {/* <Quiz /> */}
    </>
  );
}

// export setIsQuiz;
export default CardDetails;
// export changeState;
