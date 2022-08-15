import React from "react";
import { Container, Button } from "react-bootstrap";

function Time() {
  return (
    <Container id="timer-label">
      <h2 id="time-left">25:00</h2>
      <Button id="start_stop">STOP</Button>
      <Button id="reset">Reset</Button>
    </Container>
  );
}

export default Time;
