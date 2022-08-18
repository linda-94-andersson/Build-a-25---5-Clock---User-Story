import React, { useRef, useState, useEffect } from "react";
import { breakState, sessionState, playState } from "../atoms/atom";
import { useRecoilState } from "recoil";
import { Button, Container } from "react-bootstrap";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillPauseCircle,
  AiFillPlayCircle,
} from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";

function Time() {
  const [breakTime, setBreakTime] = useRecoilState(breakState);
  const [session, setSession] = useRecoilState(sessionState);
  const [timer, setTimer] = useState(1500);
  const [play, setPlay] = useRecoilState(playState);

  const handleBreakDec = () => {
    if (breakTime <= 1) {
      return;
    }
    setBreakTime(breakTime - 1);
  };

  const handleBreakInc = () => {
    if (breakTime >= 60) {
      return;
    }
    setBreakTime(breakTime + 1);
  };

  const handleSessionDec = () => {
    if (session <= 1) {
      return;
    }
    setSession(session - 1);
  };

  const handleSessionInc = () => {
    if (session >= 60) {
      return;
    }
    setSession(session + 1);
  };

  const timeCounter = () => {
    let minuets = Math.floor(session);
    let seconds = timer % 60;

    if (minuets < 10) {
      minuets = "0" + minuets;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${minuets}:${seconds}`;
  };

  const handleReset = () => {
    setBreakTime(5);
    setSession(25);
    setTimer(1500);
    setPlay(true);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  };

  const playTimer = () => {
    if (timer === 0) {
      console.log("Finished!");
      playSound();
    }
    setPlay(false);
  };

  const pauseTimer = () => {
    setPlay(true);
  };

  const handlePlayPause = () => {
    if (!play) {
      playTimer();
    }
    pauseTimer();
  };

  const playSound = () => {
    document.getElementById("beep").play();
  };

  // useEffect(
  //   () => {
  //     setTimer(timer - 1);
  //   },[playTimer],
  //   1000
  // );

  return (
    <Container>
      <Container>
        <p id="break-label">Break Length</p>
        <p id="break-length">{breakTime}</p>
        <Button id="break-decrement" onClick={handleBreakDec}>
          <AiFillMinusCircle />
        </Button>
        <Button id="break-increment" onClick={handleBreakInc}>
          <AiFillPlusCircle />
        </Button>
        <p id="session-label">Session Length</p>
        <p id="session-length">{session}</p>
        <Button id="session-decrement" onClick={handleSessionDec}>
          <AiFillMinusCircle />
        </Button>
        <Button id="session-increment" onClick={handleSessionInc}>
          <AiFillPlusCircle />
        </Button>
      </Container>
      <Container>
        <p id="timer-label">{timer ? "Session" : "Break"}</p>
        <h2 id="time-left">{timeCounter(timer)}</h2>
      </Container>
      <Container>
        <Button id="start_stop" onClick={handlePlayPause}>
          {play ? <AiFillPlayCircle /> : <AiFillPauseCircle />}
        </Button>
        <Button id="reset" onClick={handleReset}>
          <VscDebugRestart />
        </Button>
      </Container>
      <audio id="beep" preload="auto" src="./sound/Tada-sound.mp3"></audio>
    </Container>
  );
}

export default Time;
