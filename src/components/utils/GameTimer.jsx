import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// var pts = 0;

export default function GameTimer({ option }) {
  const [time, setTime] = useState(20 * 60);
  const navigate = useNavigate();
  useEffect(() => {
    if (time <= 0 || option) {
      window.alert("Game is Over...!Times up!!🤷‍♂️");
      navigate("/leaderboard");
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
