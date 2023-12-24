import { useContext, useEffect, useState } from "react";
import Base from "../../components/Base";
import userContext from "../../context/userContext";
import { useParams } from "react-router-dom";
import { getUserById } from "../../services/user-service";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
const Profileinfo = () => {
  const userDetailsObject = useContext(userContext);
  // console.log(userId);
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
            <Card>
              <CardBody>
                <h3>User Info</h3>
                <Container className="text-center">
                  <img
                    src="\public\img\user.jfif"
                    alt="user profile picture"
                    className="img-fluid rounded-circle"
                    style={{ maxWidth: "10rem", maxHeight: "20rem" }}
                  />
                </Container>
                <Table
                  responsive
                  dark
                  hover
                  striped
                  bordered={true}
                  className="mt-5"
                >
                  <tbody>
                    <tr>
                      <td>User Id</td>
                      <td>{user?.id}</td>
                    </tr>
                    <tr>
                      <td>User Name</td>
                      <td>{user?.name}</td>
                    </tr>
                    <tr>
                      <td>User Gmail</td>
                      <td>{user?.email}</td>
                    </tr>
                    <tr>
                      <td>About</td>
                      <td>{user?.about}</td>
                    </tr>
                    <tr>
                      <td>Role</td>
                      <td>
                        {user?.roles.map((r) => (
                          <span key={r.id}> {r.name}</span>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
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
