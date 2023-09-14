import React, { useState } from "react";
import "./CardDetails.css";
import Quiz from "../Quiz/Quiz";

function CardDetails({ propertyName, category, owner, price }) {
  owner = "hello";
  const [isQuiz, setIsQuiz] = useState(false);
  function changeState() {
    setIsQuiz((prev) => !prev);
  }
  return (
    <>
      <div className="card-details">
        <div className="card-det">
          <span id="propertyName">{"propertyName"}</span>
          <span id="category">{"category"}</span>
          {owner !== "" && <span id="owner">{"owner"}</span>}
          <span id="price">{"price"}</span>
          <button id="cardBtn" onClick={() => setIsQuiz(true)}>
            {owner !== "" ? "Face It" : "Buy It"}
          </button>
        </div>
      </div>
      {isQuiz && owner !== "" ? <Quiz changeState={changeState} /> : <></>}
      {/* <Quiz /> */}
    </>
  );
}

// export setIsQuiz;
export default CardDetails;
