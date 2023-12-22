import Base from "../components/Base";
import userContext from "../context/userContext";

function About() {
  return (
    <userContext.Consumer>
      {(user) => (
        <Base>
          <div>
            <h1>we are bulidingwe are about</h1>
            <p>{user?.about}</p>
            <p>{user?.name}</p>
          </div>
        </Base>
      )}
    </userContext.Consumer>
  );
}

export default About;
