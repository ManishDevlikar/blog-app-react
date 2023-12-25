import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Table,
} from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
const ViewUserProfile = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    setCurrentUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);
  return (
    <div>
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
          <Table responsive dark hover striped bordered={true} className="mt-5">
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

          {currentUser ? (
            currentUser.id == user.id ? (
              <CardFooter className="text-center">
                <Button clor="dark">Update</Button>
              </CardFooter>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ViewUserProfile;
