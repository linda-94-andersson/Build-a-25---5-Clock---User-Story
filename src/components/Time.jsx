import React, { useRef, useState } from "react";
import {
  displayState,
  breakState,
  sessionState,
  timerOnState,
  onBreakState,
} from "../atoms/atom";
import { useRecoilState } from "recoil";
import { Button, Container } from "react-bootstrap";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";
import Control from "./Control";
import { accurateInterval } from "../utils/data";

function Time() {
  // const [displayTime, setDisplayTime] = useRecoilState(displayState);
  // const [breakTime, setBreakTime] = useRecoilState(breakState);
  // const [sessionTime, setSessionTime] = useRecoilState(sessionState);
  // const [timerOn, setTimerOn] = useRecoilState(timerOnState);
  // const [onBreak, setOnBreak] = useRecoilState(onBreakState);
  const [displayTime, setDisplayTime] = useState(60*25);
  const [breakTime, setBreakTime] = useState(60*5);
  const [sessionTime, setSessionTime] = useState(60*25);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const myAudio = useRef();
  const displayTimerRef = useRef();
  const timeoutRef = useRef();
  const onBreakRef = useRef(null);
  const displayVisualTimerRef = useRef();

  const timerControl = () => {
    if (!timerOn) {
      setTimerOn(true);
      beginCountDown();
    } else if (timeoutRef.current.timeoutID) {
      timeoutRef.current.cancel();
      setTimerOn(false);
    }
  };

  const beginCountDown = () => {
    let timeOutInfo = accurateInterval(() => {
      phaseControl();
    }, 1000);
    timeoutRef.current = timeOutInfo;
  };

  const displayElapsedPercentage = (isBreak, currentTick) => {
    let percentage = "0%";
    if (isBreak) {
      percentage =
        Math.abs(((currentTick - breakTime) / breakTime) * 100) + "%";
    } else {
      percentage =
        Math.abs(((currentTick - sessionTime) / sessionTime) * 100) + "%";
    }
    displayVisualTimerRef.current = percentage;
  };

  const phaseControl = () => {
    let time;

    setDisplayTime((prev) => {
      displayTimerRef.current = prev;
      return prev - 1;
    });

    time = displayTimerRef.current;

    if (time <= 0) {
      setOnBreak((prev) => {
        let previousState = prev;
        onBreakRef.current = !previousState;
        return !prev;
      });

      if (timeoutRef.current) {
        timeoutRef.current.cancel();

        if (onBreakRef.current === false) {
          displayTimerRef.current = sessionTime;
          playBuzzer();
        } else if (onBreakRef.current === true) {
          displayTimerRef.current = breakTime;
          playBuzzer();
        }
        setDisplayTime(displayTimerRef.current);
        beginCountDown();
      }
    }
    displayElapsedPercentage(onBreakRef.current, time);
  };

  const resetPomodoro = () => {
    setDisplayTime(60 * 25);
    setBreakTime(60 * 5);
    setSessionTime(60 * 25);
    setOnBreak(false);
    setTimerOn(false);
    if (timeoutRef.current) {
      timeoutRef.current.cancel();
    }
    myAudio.current.pause();
    myAudio.current.currentTime = 0;
    displayVisualTimerRef.current = "0%";
  };

  const changeTime = (timeAmmount, type) => {
    if (type === "break") {
      if (
        (breakTime >= 60 * 60 && timeAmmount > 0) ||
        (breakTime <= 60 && timeAmmount < 0)
      ) {
        return;
      }
      setBreakTime((prev) => prev + timeAmmount);
    } else if (type === "session") {
      if (
        (sessionTime >= 60 * 60 && timeAmmount > 0) ||
        (sessionTime <= 60 && timeAmmount < 0)
      ) {
        return;
      }
      setSessionTime((prev) => prev + timeAmmount);
      if (!timerOn) {
        setDisplayTime(sessionTime + timeAmmount);
      }
    }
  };

  const formatTime = (time, type = "display") => {
    if (type === "display") {
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;

      return (
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds)
      );
    } else if (type === "control") {
      let minutes = Math.ceil(time / 60);
      return minutes;
    }
  };

  const playBuzzer = () => {
    myAudio.current.currentTime = 0;
    myAudio.current.play();
  };

  return (
    <Container>
      <Container>
        <Control
          type="break"
          length={formatTime(breakTime, "control")}
          changeTime={changeTime}
        />
        <Control
          type="session"
          length={formatTime(sessionTime, "control")}
          changeTime={changeTime}
        />
      </Container>
      <Container>
        <p id="timer-label">{onBreak ? "Break" : "Session"}</p>
        <p id="time-left" ref={displayTimerRef}>
          {formatTime(displayTime)}
        </p>
        <span style={{ height: displayVisualTimerRef.current }}></span>
      </Container>
      <Container>
        <Button id="start_stop" onClick={() => timerControl()}>
          {!timerOn ? <AiFillPlayCircle /> : <AiFillPauseCircle />}
        </Button>
        <Button id="reset" onClick={() => resetPomodoro()}>
          <VscDebugRestart />
        </Button>
      </Container>
      <audio
        id="beep"
        preload="auto"
        ref={myAudio}
        src="./sound/Tada-sound.mp3"
      ></audio>
    </Container>
  );
}

export default Time;
