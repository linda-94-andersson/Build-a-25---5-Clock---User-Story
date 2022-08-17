import React from "react";
import { Button, Container } from "react-bootstrap";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const Config = ({
  handleBreakCount,
  handleSessionCount,
  sessionCount,
  breakCount,
}) => {
  return (
    <div>
      <Container>
        <Container id="break-label">Break Length</Container>
        <Container id="break-length">{Math.floor(breakCount / 60)}</Container>
        <Button
          id="break-increment"
          data-breaker="up"
          onClick={handleBreakCount}
        >
          <AiFillPlusCircle />
        </Button>
        <Button
          id="break-decrement"
          data-breaker="down"
          onClick={handleBreakCount}
        >
          <AiFillMinusCircle />
        </Button>
      </Container>

      <Container>
        <Container id="session-label">Session Length</Container>
        <Container id="session-length">
          {Math.floor(sessionCount / 60)}
        </Container>
        <Button
          id="session-increment"
          data-session="up"
          onClick={handleSessionCount}
        >
          <AiFillPlusCircle />
        </Button>
        <Button
          id="session-decrement"
          data-session="down"
          onClick={handleSessionCount}
        >
          <AiFillMinusCircle />
        </Button>
      </Container>
    </div>
  );
};

export default Config;
