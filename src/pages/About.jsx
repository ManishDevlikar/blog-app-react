import Base from "../components/Base";
import userContext from "../context/userContext";
import { Container, Row, Col } from "reactstrap";
function About() {
  return (
    <userContext.Consumer>
      {(u) => (
        <Base>
          <Container className="mt-5">
            <Row>
              <Col>
                <h2>About PlainPost</h2>
                <p>
                  Welcome to PlainPost, a blogging platform created by Manish
                  Devlikar. Here, we provide a space for individuals to share
                  their thoughts, experiences, and insights on various topics.
                  Our aim is to create a community of writers and readers
                  passionate about clear thoughts and simple words.
                </p>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col>
                <h3>About the Creator</h3>
                <p>
                  Hi, I'm Manish Devlikar, the founder, and developer behind
                  PlainPost. With a passion for creating user-friendly
                  applications, I've designed PlainPost to be a platform where
                  content creation is straightforward and enjoyable.
                </p>
                <p>
                  PlainPost reflects my commitment to simplicity and clarity. I
                  believe that technology should empower individuals to express
                  themselves without unnecessary complexity.
                </p>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col>
                <h3>What PlainPost Offers</h3>
                <p>
                  PlainPost is your go-to platform for expressing your thoughts
                  in a clean and straightforward manner. Whether you're a
                  seasoned writer or just starting, you'll find our platform
                  user-friendly and conducive to your creativity.
                </p>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col>
                <h3>Connect with Us</h3>
                <p>
                  We'd love to connect with you! Feel free to reach out through
                  our social media channels:
                </p>
                <p>
                  - Twitter: [@PlainPost]
                  <br />
                  - LinkedIn: [PlainPost]
                  <br />- Instagram: [@PlainPostOfficial]
                </p>
              </Col>
            </Row>
          </Container>
        </Base>
      )}
    </userContext.Consumer>
  );
}

export default About;
