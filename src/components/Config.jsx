import React, { useState } from "react";
import {
  sessionCounterState,
  breakState,
  timerCounterState,
} from "../atoms/atom";
import { useRecoilState } from "recoil";
import { Button, Container } from "react-bootstrap";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const Config = () => {
  const [sessionCounter, setSessionCounter] =
    useRecoilState(sessionCounterState);
  const [breakCounter, setBreakCounter] = useRecoilState(breakState);
  const [timerType, setTimerType] = useRecoilState(timerCounterState);
  const [timeLeft, setTimeLeft] = useState(sessionCounter * 60);

  const handleBreakCounterDecre = () => {
    if (breakCounter > 1) {
      setBreakCounter(breakCounter - 1);
      if (timerType === "BREAK") {
        setTimeLeft((breakCounter - 1) * 60);
      }
    } else {
      return;
    }
  };

  const handleBreakCounterIncre = () => {
    setBreakCounter(breakCounter + 1);
    if (timerType === "BREAK") {
      setTimeLeft((breakCounter + 1) * 60);
    }
  };

  const handleSessionCounterDecre = () => {
    if (sessionCounter > 1) {
      setSessionCounter((sessionCounter) => sessionCounter - 1);
      if (timerType === "SESSION") {
        setTimeLeft((sessionCounter - 1) * 60);
      }
    } else {
      return;
    }
  };

  const handleSessionCounterIncre = () => {
    setSessionCounter((sessionCounter) => sessionCounter + 1);
    if (timerType === "SESSION") {
      setTimeLeft((sessionCounter + 1) * 60);
    }
  };

  return (
    <div>
      <Container>
        <Container id="break-label">Break Length</Container>
        <Container id="break-length">{breakCounter}</Container>
        <Button
          id="break-increment"
          data-breaker="up"
          onClick={handleBreakCounterIncre}
        >
          <AiFillPlusCircle />
        </Button>
        <Button
          id="break-decrement"
          data-breaker="down"
          onClick={handleBreakCounterDecre}
        >
          <AiFillMinusCircle />
        </Button>
      </Container>

      <Container>
        <Container id="session-label">Session Length</Container>
        <Container id="session-length">{sessionCounter}</Container>
        <Button
          id="session-increment"
          data-session="up"
          onClick={handleSessionCounterIncre}
        >
          <AiFillPlusCircle />
        </Button>
        <Button
          id="session-decrement"
          data-session="down"
          onClick={handleSessionCounterDecre}
        >
          <AiFillMinusCircle />
        </Button>
      </Container>
    </div>
  );
};

export default Config;
