import React, { useEffect, useState } from "react";
import OptQuiz from "./OptQuiz";
import TextQuiz from "./TextQuiz";
import axios from "axios";
import MemoryQuiz from "./MemoryQuiz";

function Quiz({ changeState, currentParticipant, property, next }) {
  const [qzObj, setQzObj] = useState();
  useEffect(() => {
    axios
      .post(
        "/quiz",
        { property },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((r) => {
        setQzObj(() => r.data.qzObj);
      });
  }, []);
  if (qzObj && qzObj.quizOptions) {
    console.log("true");
    return (
      <OptQuiz
        changeState={changeState}
        currentParticipant={currentParticipant}
        property={property}
        next={next}
        qzObj={qzObj}
      />
    );
  } else if (property.propertyName === "Memory Game") {
    return (
      <MemoryQuiz
        changeState={changeState}
        currentParticipant={currentParticipant}
        next={next}
        txtQzObj={qzObj}
      />
    );
  } else {
    return (
      <TextQuiz
        changeState={changeState}
        currentParticipant={currentParticipant}
        property={property}
        next={next}
        txtQzObj={qzObj}
      />
    );
  }
}

export default Quiz;
