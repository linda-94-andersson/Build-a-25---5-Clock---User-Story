import React, { useState, useEffect, useRef } from "react";
import {
  breakState,
  sessionState,
  intervalState,
  typeState,
} from "../atoms/atom";
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
  const [intervalId, setIntervalId] = useRecoilState(intervalState);
  const [timeLeft, setTimeLeft] = useState(session);
  const [currentType, setCurrentType] = useRecoilState(typeState);
  const audioElement = useRef(null);

  useEffect(() => {
    setTimeLeft(session);
  }, [session]);

  useEffect(() => {
    if (timeLeft === 0) {
      audioElement.current.play();
      if (currentType === "Session") {
        setCurrentType("Break");
        setTimeLeft(breakTime);
      } else if (currentType === "Break") {
        setCurrentType("Session");
        setTimeLeft(session);
      }
    }
  }, [breakTime, currentType, session, timeLeft]);

  const handleBreakDec = () => {
    const newBreakTime = breakTime - 60;
    if (newBreakTime > 0) {
      setBreakTime(newBreakTime);
    }
  };

  const handleBreakInc = () => {
    const newBreak = breakTime + 60;
    if (newBreak <= 60 * 60) {
      setBreakTime(breakTime + 60);
    }
  };

  const breakLenthInMinutes = moment.duration(breakTime, "s").asMinutes();

  const handleSessionDec = () => {
    const newSession = session - 60;
    if (newSession > 0) {
      setSession(newSession);
    }
  };

  const handleSessionInc = () => {
    const newSession = session + 60;
    if (newSession <= 60 * 60) {
      setSession(session + 60);
    }
  };

  const sessionLengthInMinuets = moment.duration(session, "s").asMinutes();

  momentDurationFormatSetup(moment);

  const formattedTimeLeft = moment
    .duration(timeLeft, "s")
    .format("mm:ss", { trim: false });

  const handleReset = () => {
    audioElement.current.load();
    clearInterval(intervalId);
    setIntervalId(null);
    setCurrentType("Session");
    setBreakTime(300);
    setSession(1500);
    setTimeLeft(60 * 25);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  };

  const isStatred = intervalId != null;

  const handlePlayPause = () => {
    if (isStatred) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };

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
        <p id="timer-label">{currentType}</p>
        <h2 id="time-left">{formattedTimeLeft}</h2>
      </Container>
      <Container>
        <Button id="start_stop" onClick={handlePlayPause}>
          {!isStatred ? <AiFillPlayCircle /> : <AiFillPauseCircle />}
        </Button>
        <Button id="reset" onClick={handleReset}>
          <VscDebugRestart />
        </Button>
      </Container>
      <audio
        id="beep"
        preload="auto"
        src="./sound/Tada-sound.mp3"
        ref={audioElement}
      ></audio>
    </Container>
  );
}

export default Time;
