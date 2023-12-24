import { useContext, useState } from "react";
import Base from "../components/Base";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login = () => {
  const userContexData = useContext(userContext);
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e, prop) => {
    let actualValue = e.target.value;
    setLoginDetails({
      ...loginDetails,
      [prop]: actualValue,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(loginDetails);
    //validation
    if (
      loginDetails.username.trim() == "" ||
      loginDetails.password.trim() == ""
    ) {
      toast.error(" email address and password  require");
      return;
    }

    // submit data to server
    loginUser(loginDetails)
      .then((jwtTokenData) => {
        console.log(jwtTokenData);
        doLogin(jwtTokenData, () => {
          console.log("saved to local storage");
          // redirect to dashboard
          userContexData.setUsers({ data: jwtTokenData.user, login: true });
          navigate("/user/dashboard");
        });
        toast.success("login successfully");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 400 || err.response.status) {
          toast.error(err.response.data.message);
        } else {
          toast.error("invalid credential");
        }
      });
  };
  const handleReset = () => {
    setLoginDetails({ username: "", password: "" });
  };
  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card outline color="dark">
              <CardHeader>
                <h3>Login</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      id="email"
                      value={loginDetails.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      id="password"
                      value={loginDetails.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button className="me-2" color="dark">
                      Login
                    </Button>
                    <Button
                      color="secondary"
                      type="reset"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login;
