import React, { useEffect, useRef } from "react";
import { clockState } from "../atoms/atom";
import { useRecoilState } from "recoil";
import { Container, Button } from "react-bootstrap";

function Time() {
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const Ref = useRef(null);
  const [clock, setClock] = useRecoilState(clockState);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setClock(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setClock("25:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 1500);
    return deadline;
  };

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  return (
    <Container id="timer-label">
      <h2 id="time-left">{clock}</h2>
      <Button id="start_stop">START/STOP</Button>
      <Button id="reset" onClick={onClickReset}>Reset</Button>
    </Container>
  );
}

export default Time;
