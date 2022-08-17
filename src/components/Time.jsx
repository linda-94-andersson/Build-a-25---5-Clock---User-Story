import React, { useEffect, useState } from "react";
import {
  sessionCounterState,
  breakState,
  playState,
  sessionState,
} from "../atoms/atom";
import { useRecoilState } from "recoil";
import { Container } from "react-bootstrap";
import Config from "./Config";
import Data from "./Data";

const Time = () => {
  const [sessionCount, setSessionCount] = useRecoilState(sessionCounterState);
  const [breakCount, setBreakCount] = useRecoilState(breakState);
  const [counterScreenSession, setCounterScreenSession] =
    useState(sessionCount);
  const [play, setPlay] = useRecoilState(playState);
  const [session, setSession] = useRecoilState(sessionState);

  useEffect(() => {
    if (play && counterScreenSession > 0) {
      const timer = window.setInterval(() => {
        setCounterScreenSession(
          (counterScreenSession) => counterScreenSession - 1
        );
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [play, counterScreenSession]);

  useEffect(() => {
    if (counterScreenSession === 0 && session) {
      document.getElementById("beep").play();
      setCounterScreenSession(breakCount);
      setSession(!session);
    }
    if (counterScreenSession === 0 && !session) {
      setCounterScreenSession(sessionCount);
      setSession(!session);
    }
  }, [counterScreenSession, session, breakCount, sessionCount]);

  useEffect(() => {
    return setCounterScreenSession(sessionCount);
  }, [sessionCount, breakCount]);

  const handleSessionCount = (e) => {
    let number = e.currentTarget.dataset.session;
    if (number === "up") {
      if (sessionCount < 3600) {
        return setSessionCount(sessionCount + 60);
      }
      return sessionCount;
    } else {
      if (sessionCount >= 120) {
        return setSessionCount(sessionCount - 60);
      }
      return sessionCount;
    }
  };

  const handleBreakCount = (e) => {
    let number = e.currentTarget.dataset.breaker;
    if (number === "up") {
      if (breakCount < 3600) {
        return setBreakCount(breakCount + 60);
      }
      return breakCount;
    } else {
      if (breakCount >= 120) {
        return setBreakCount(breakCount - 60);
      }
      return breakCount;
    }
  };

  const handleClear = () => {
    setPlay(false);
    setSession(true);
    setBreakCount(300);
    setSessionCount(1500);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    return setCounterScreenSession(1500);
  };

  const handleCounterScreen = () => {
    if (play === false) {
      console.log("Pause to play");
    }
    console.log("Play to Pause");
    console.log(counterScreenSession);
    setPlay((play) => !play);
  };

  const timeCounter = () => {
    let minuets = Math.floor(counterScreenSession / 60);
    let seconds = counterScreenSession % 60;

    if (minuets < 10) {
      minuets = "0" + minuets;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${minuets}:${seconds}`;
  };

  return (
    <Container>
      <Config
        handleBreakCount={handleBreakCount}
        handleSessionCount={handleSessionCount}
        sessionCount={sessionCount}
        breakCount={breakCount}
      />
      <Data
        counterScreenSession={counterScreenSession}
        play={play}
        handleCounterScreen={handleCounterScreen}
        handleClear={handleClear}
        session={session}
        sessionCount={sessionCount}
        timeCounter={timeCounter}
        breakCount={breakCount}
      />
    </Container>
  );
};

export default Time;
