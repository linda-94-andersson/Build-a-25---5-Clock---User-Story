import React from "react";
import { Button, Container } from "react-bootstrap";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const Config = ({
  handleBreakCounter,
  handleSessionCounter,
  sessionCounter,
  breakCounter,
}) => {
  return (
    <div>
      <Container>
        <Container id="break-label">Break Length</Container>
        <Container id="break-length">{Math.floor(breakCounter / 60)}</Container>
        <Button
          id="break-increment"
          data-breaker="up"
          onClick={handleBreakCounter}
        >
          <AiFillPlusCircle />
        </Button>
        <Button
          id="break-decrement"
          data-breaker="down"
          onClick={handleBreakCounter}
        >
          <AiFillMinusCircle />
        </Button>
      </Container>

      <Container>
        <Container id="session-label">Session Length</Container>
        <Container id="session-length">
          {Math.floor(sessionCounter / 60)}
        </Container>
        <Button
          id="session-increment"
          data-session="up"
          onClick={handleSessionCounter}
        >
          <AiFillPlusCircle />
        </Button>
        <Button
          id="session-decrement"
          data-session="down"
          onClick={handleSessionCounter}
        >
          <AiFillMinusCircle />
        </Button>
      </Container>
    </div>
  );
};

export default Config;
