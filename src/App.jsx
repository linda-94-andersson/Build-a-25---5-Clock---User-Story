import React from "react";
import { Container } from "react-bootstrap";
import Time from "./components/Time";

function App() {
  return (
    <Container fluid className="app">
      <h1>25 + 5 Clock</h1>
      <Time />
    </Container>
  );
}

export default App;
