import React, { useState, useEffect } from "react";
import { breakState, sessionState, playState } from "../atoms/atom";
import { useRecoilState } from "recoil";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
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
  const [timeLeft, setTimeLeft] = useState(session);
  const [timer, setTimer] = useState(1500);
  const [play, setPlay] = useRecoilState(playState);

  const handleBreakDec = () => {
    const newBreakTime = breakTime - 60;
    if (newBreakTime < 0) {
      setBreakTime(0);
    } else {
      setBreakTime(newBreakTime);
    }
  };

  const handleBreakInc = () => {
    setBreakTime(breakTime + 60);
  };

  const breakLenthInMinutes = moment.duration(breakTime, "s").minutes();

  const handleSessionDec = () => {
    const newSession = session - 60;
    if (newSession < 0) {
      setSession(0);
    } else {
      setSession(newSession);
    }
  };

  const handleSessionInc = () => {
    setSession(session + 60);
  };

  const sessionLengthInMinuets = moment.duration(session, "s").minutes();

  momentDurationFormatSetup(moment);

  const formattedTimeLeft = moment.duration(timeLeft, "s").format("mm:ss");

  useEffect(() => {
    setTimeLeft(session);
  }, [session]);

  const handleReset = () => {
    setBreakTime(300);
    setSession(1500);
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
        <p id="break-length">{breakLenthInMinutes}</p>
        <Button id="break-decrement" onClick={handleBreakDec}>
          <AiFillMinusCircle />
        </Button>
        <Button id="break-increment" onClick={handleBreakInc}>
          <AiFillPlusCircle />
        </Button>
        <p id="session-label">Session Length</p>
        <p id="session-length">{sessionLengthInMinuets}</p>
        <Button id="session-decrement" onClick={handleSessionDec}>
          <AiFillMinusCircle />
        </Button>
        <Button id="session-increment" onClick={handleSessionInc}>
          <AiFillPlusCircle />
        </Button>
      </Container>
      <Container>
        <p id="timer-label">{timer ? "Session" : "Break"}</p>
        <h2 id="time-left">{formattedTimeLeft}</h2>
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
