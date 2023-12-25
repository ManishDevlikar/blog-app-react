import { useContext, useEffect, useState } from "react";
import Base from "../../components/Base";
import userContext from "../../context/userContext";
import { useParams } from "react-router-dom";
import { getUserById } from "../../services/user-service";
import { Col, Container, Row } from "reactstrap";
import ViewUserProfile from "../../components/ViewUserProfile";
const Profileinfo = () => {
  const userDetailsObject = useContext(userContext);
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUserById(userId)
      .then((res) => {
        setUser({ ...res });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(user);

  const userProfile = () => {
    return (
      <Container className="mt-5">
        <Row className="">
          <Col md={{ size: 8, offset: 2 }}>
            <ViewUserProfile user={user} />
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Base>{user?.id == userId ? userProfile() : "Loading user data..."}</Base>
  );
};

export default Profileinfo;
