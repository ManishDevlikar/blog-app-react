import Base from "../components/Base";
import CategorySideMenu from "../components/CategorySideMenu";
import NewFeed from "../components/newFeed";
import { Col, Container, Row } from "reactstrap";
function Home() {
  return (
    <Base>
      <Container className="my-2">
        <Row>
          <Col md={2}>
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            <NewFeed />
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Home;
