import React, { useState } from "react";
import "./CardDetails.css";
import Quiz from "../Quiz/Quiz";
import axios from "axios";

function CardDetails({ propertyInfo, currentParticipant, chzObj, next }) {
  const [isQuiz, setIsQuiz] = useState(false);
  const [msg, setMsg] = useState();
  const GO_BOX = 0;
  const COMMUNITY_CHEST_1 = 2;
  const INCOME_TAX = 4;
  const CRYPTO_LOCKER = 8;
  const CHANCES_1 = 11;
  const NO_INTERNET_CONNECTION = 16;
  const COMMUNITY_CHEST_2 = 20;
  const KRONOS = 24;
  const CHANCES_2 = 25;
  const RIP = 10;

  const { owner, price, category, propertyName, position } = propertyInfo;
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
        setMsg(() => r.data);
      });
  }
  function handleClick(e) {
    if (owner === "") {
      buy();
      // e.target.disabled = true;
      e.target.innerText = "Bought 😉";
      e.target.style.opacity = 1;
    } else {
      setIsQuiz(() => true);
      // e.target.disabled = false;
    }
  }

  return (
    <>
      <div className="card-details">
        <div className="card-det">
          <span id="propertyName">{propertyName}</span>
          {category && <span id="category">Category: {category}</span>}
          {owner && owner !== "" && <span id="owner">Owner: {owner}</span>}
          {owner === ""
            ? price && <span id="price">Price: ${price}</span>
            : price && <span id="price">Rent: ${price / 2}</span>}

          {/* {msg && <span id="price">{msg}</span>} */}
          {chzObj ? (
            <>
              <div className="chz-wrapper">
                <div id="category">{chzObj.title}</div>
                <div id="price">{chzObj.message}</div>
              </div>
              <button id="cardBtn" onClick={next}>
                Next
              </button>
            </>
          ) : (
            <>
              {owner !== currentParticipant["teamName"] &&
                !(
                  position === GO_BOX ||
                  position === COMMUNITY_CHEST_1 ||
                  position === INCOME_TAX ||
                  position === CRYPTO_LOCKER ||
                  position === CHANCES_1 ||
                  position === NO_INTERNET_CONNECTION ||
                  position === COMMUNITY_CHEST_2 ||
                  position === KRONOS ||
                  position === CHANCES_2 ||
                  position === RIP
                ) && (
                  <button
                    id="cardBtn"
                    onClick={handleClick}
                    // {...(owner !== "" && "disabled")}
                  >
                    {owner !== "" ? "Face It" : "Buy It"}
                  </button>
                )}
              {/* {(!owner ||
                owner === "" ||
                owner === currentParticipant["teamName"]) && ( */}
              <button id="cardBtn" onClick={next}>
                Next
              </button>
              {/* )} */}
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
