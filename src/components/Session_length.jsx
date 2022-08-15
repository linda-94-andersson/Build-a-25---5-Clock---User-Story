import React from "react";
import { Container, Button } from "react-bootstrap";

function Session_length() {
  return (
    <Container>
      <section id="session-label">Session Length</section>
      <Button id="session-decrement">Down</Button>
      <span id="session-length">25</span>
      <Button id="session-increment">Up</Button>
    </Container>
  );
}

export default Session_length;
