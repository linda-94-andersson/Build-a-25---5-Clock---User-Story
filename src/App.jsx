import { Container } from "react-bootstrap";
import { clockState } from "./atoms/atom";
import { useRecoilState } from "recoil";
import Break_length from "./components/Break_length";
import Session_length from "./components/Session_length";
import Time from "./components/Time";

function App() {
  const [clock, setClock] = useRecoilState(clockState);

  return (
    <Container fluid>
      <h1>25 + 5 Clock</h1>
      <Break_length />
      <Session_length />
      <Time />
    </Container>
  );
}

export default App;
