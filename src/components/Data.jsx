import React from "react";
import { Button, Container } from "react-bootstrap";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";

const Data = ({
  play,
  handleCounterScreen,
  handleClear,
  session,
  timeCounter,
}) => {
  return (
    <div>
      <Container id="timer-label">{session ? "Session" : "Break"}</Container>
      <Container id="time-left">{timeCounter()}</Container>
      <audio id="beep" preload="auto" src="./sound/Tada-sound.mp3"></audio>
      <Container>
        {play === false ? (
          <Button id="start_stop" onClick={handleCounterScreen}>
            <AiFillPlayCircle />
          </Button>
        ) : (
          <Button id="start_stop" onClick={handleCounterScreen}>
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
