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
  function handleClick(e) {
    if (owner === "") {
      buy();
      e.target.disabled = true;
      e.target.innerText = "Bought 😉";
      e.target.style.opacity = 1;
    } else {
      setIsQuiz(() => true);
      e.target.disabled = false;
    }
  }
  return (
    <>
      <div className="card-details">
        <div className="card-det">
          <span id="propertyName">{propertyName}</span>
          <span id="category">Category: {category}</span>
          {owner !== "" && <span id="owner">{owner}</span>}
          {owner === "" ? (
            <span id="price">Price: ${price}</span>
          ) : (
            <span id="price">Rent: ${price / 2}</span>
          )}
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
              <button
                id="cardBtn"
                onClick={handleClick}
                // {...(owner !== "" && "disabled")}
              >
                {owner !== "" ? "Face It" : "Buy It"}
              </button>
              {owner === "" && (
                <button id="cardBtn" onClick={next}>
                  Next
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {isQuiz && owner !== "" ? (
        <Quiz
          changeState={changeState}
          currentParticipant={currentParticipant}
          property={propertyInfo}
          next={next}
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
