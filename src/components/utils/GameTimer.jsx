import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useParticipants } from "../../contexts/ParticipantContext";

// var pts = 0;

export default function GameTimer({ option }) {
  const { currentBatch } = useParticipants();
  const [time, setTime] = useState(10 * 60);
  const navigate = useNavigate();
  useEffect(() => {
    if (time <= 0 || option) {
      window.alert("Game is Over...!Times up!!🤷‍♂️");
      navigate(`/leaderboard/${currentBatch}`);
      return;
    }
    const timer = setInterval(() => {
      setTime((pre) => pre - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);
  //   pts = time;
  let mins = parseInt(time / 60);
  let seconds = Math.round((time / 60 - mins) * 60);
  let strTime = `${mins}:${seconds}`;
  return strTime;
}

// export function points() {
//   return pts;
// }
