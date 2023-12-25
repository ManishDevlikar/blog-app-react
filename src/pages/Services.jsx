import Base from "../components/Base";
import userContext from "../context/userContext";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

function Services() {
  return (
    <userContext.Consumer>
      {(u) => (
        <Base>
          <div
            style={{
              padding: "40px 0",
            }}
          >
            <Container>
              <Row>
                <Col>
                  <h2 className="text-center mb-4">Our Services</h2>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Card className="mb-4">
                    <CardBody>
                      <CardTitle tag="h5">Web Development</CardTitle>
                      <CardText>
                        We create modern and responsive websites tailored to
                        your business needs using the latest web development
                        technologies.
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="mb-4">
                    <CardBody>
                      <CardTitle tag="h5">Backend Development</CardTitle>
                      <CardText>
                        Build robust and scalable server-side applications using
                        Spring Boot to support your web and mobile platforms.
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="mb-4">
                    <CardBody>
                      <CardTitle tag="h5">UI/UX Design</CardTitle>
                      <CardText>
                        Our creative design team ensures an intuitive and
                        visually appealing user experience, from wireframes to
                        polished interfaces.
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </Base>
      )}
    </userContext.Consumer>
  );
}

export default Services;
