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
      <audio id="beep" src="../assets/sound/spooky-gongwav-14904.mp3"></audio>
      <Container>
        {play === false ? (
          <button id="start_stop" onClick={handleCounterScreen}>
            <AiFillPlayCircle />
          </button>
        ) : (
          <button id="start_stop" onClick={handleCounterScreen}>
            <AiFillPauseCircle />
          </button>
        )}
        <Button id="reset" onClick={handleClear}>
          <VscDebugRestart />
        </Button>
      </Container>
    </div>
  );
};

export default Data;
