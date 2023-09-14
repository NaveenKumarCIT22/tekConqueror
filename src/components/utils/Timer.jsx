import React, { useEffect, useState } from "react";

function Timer({ option }) {
  const [time, setTime] = useState(20);
  useEffect(() => {
    if (time <= 0 || option) return;
    const timer = setInterval(() => {
      setTime((pre) => pre - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return time;
}

export default Timer;
