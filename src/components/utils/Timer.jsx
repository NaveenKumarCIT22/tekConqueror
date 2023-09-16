import React, { useEffect, useState } from "react";

var pts = 0;

export default function Timer({ option }) {
  const [time, setTime] = useState(20);
  useEffect(() => {
    if (time <= 0 || option) return;
    const timer = setInterval(() => {
      setTime((pre) => pre - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);
  pts = time;
  return time;
}

export function points() {
  return pts;
}
