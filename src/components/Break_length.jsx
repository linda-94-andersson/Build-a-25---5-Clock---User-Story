import React from "react";
import { Container, Button } from "react-bootstrap";

function Break_length() {
  return (
    <Container>
      <section id="break-label">Break Length</section>
      <Button id="break-decrement">Down</Button>
      <span id="break-length">5</span>
      <Button id="break-increment">Up</Button>
    </Container>
  );
}

export default Break_length;
