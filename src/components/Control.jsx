import React from "react";
import { Button, Container } from "react-bootstrap";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

function Control({ type, length, changeTime }) {
  return (
    <Container>
      <p id={`${type}-label`}>{type} length</p>
      <Button id={`${type}-decrement`} onClick={() => changeTime(-60, type)}>
        <AiFillMinusCircle />
      </Button>
      <span id={`${type}-length`}>{length}</span>
      <Button id={`${type}-increment`} onClick={() => changeTime(60, type)}>
        <AiFillPlusCircle />
      </Button>
    </Container>
  );
}

export default Control;
