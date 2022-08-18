import React, { useState, useRef } from "react";
import {
  sessionCounterState,
  breakState,
  pauseState,
  timerCounterState,
} from "../atoms/atom";
import { useRecoilState } from "recoil";
import { Button, Container } from "react-bootstrap";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";

const Data = () => {
  const [sessionCounter, setSessionCounter] =
    useRecoilState(sessionCounterState);
  const [breakCounter, setBreakCounter] = useRecoilState(breakState);
  const [timerType, setTimerType] = useRecoilState(timerCounterState);
  const [timeLeft, setTimeLeft] = useState(sessionCounter * 60);
  const [pause, setPause] = useRecoilState(pauseState);
  const activate = useRef(null);

  const timeCounter = () => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft - minutes * 60;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  };

  const startTime = () => {
    console.log(sessionCounter, breakCounter, timeLeft);
    setPause(false);
  };

  const stopTime = () => {
    setPause(true);
    clearInterval(activate.current);
  };

  const handlePause = () => {
    if (pause) {
      startTime();
    } else {
      stopTime();
    }
  };

  const handleClear = () => {
    stopTime();
    setBreakCounter(5);
    setSessionCounter(25);
    setTimerType("SESSION");
    setTimeLeft(1500);
  };

  return (
    <div>
      <Container id="timer-label">{timerType}</Container>
      <Container id="time-left">{timeCounter(timeLeft)}</Container>
      <audio id="beep" preload="auto" src="./sound/Tada-sound.mp3"></audio>
      <Container>
        {pause === true ? (
          <Button id="start_stop" onClick={handlePause}>
            <AiFillPlayCircle />
          </Button>
        ) : (
          <Button id="start_stop" onClick={handlePause}>
            <AiFillPauseCircle />
          </Button>
        )}
        <Button id="reset" onClick={handleClear}>
          <VscDebugRestart />
        </Button>
      </Container>
    </div>
  );
};

export default Data;
