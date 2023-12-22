import Base from "../components/Base";
import NewFeed from "../components/newFeed";
import { Container } from "reactstrap";
function Home() {
  return (
    <Base>
      <Container className="my-2">
        <NewFeed />
      </Container>
    </Base>
  );
}

export default Home;
