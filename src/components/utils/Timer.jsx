import React, { useEffect, useState } from "react";

var pts = 0;

export default function Timer({ option, seconds }) {
  const [time, setTime] = useState(seconds);
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

export function MemoryTimer({ toggleMemory }) {
  const [time, setTime] = useState(10);
  useEffect(() => {
    if (time <= 0) {
      toggleMemory();
      return;
    }
    const timer = setInterval(() => {
      setTime((pre) => pre - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);
  pts = time;
  return time;
}
