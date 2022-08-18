import React, { useEffect, useState } from "react";
import {
  sessionCounterState,
  breakState,
  pauseState,
  timerCounterState,
} from "../atoms/atom";
import { useRecoilState } from "recoil";
import { Container } from "react-bootstrap";
import Config from "./Config";
import Data from "./Data";

const Time = () => {
  const [sessionCounter, setSessionCounter] =
    useRecoilState(sessionCounterState);
  const [breakCounter, setBreakCounter] = useRecoilState(breakState);
  const [timerType, setTimerType] = useRecoilState(timerCounterState);
  const [timeLeft, setTimeLeft] = useState(sessionCounter * 60);
  const [pause, setPause] = useRecoilState(pauseState);

  const handleSessionCounter = () => {
    if (timeLeft > 0) {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }
    if (timeLeft === 0) {
      if (timerType == "SESSION") {
        console.log(timeLeft);
        setTimerType("BREAK");
        setTimeLeft(breakCounter * 60);
        audioPlay();
      } else {
        setTimeLeft(sessionCounter * 60);
        setTimerType("SESSION");
        audioPlay();
      }
    }
  };

  useEffect(() => {
    if (!pause) {
      const interval = setInterval(handleSessionCounter, 1000);
      return () => clearInterval(interval);
    }
  });

  const audioPlay = () => {
    const sound = document.getElementById("beep");
    sound.play();
  };

  return (
    <Container>
      <Config />
      <Data />
    </Container>
  );
};

export default Time;
