import Base from "../components/Base";
import userContext from "../context/userContext";

function About() {
  return (
    <userContext.Consumer>
      {(u) => (
        <Base>
          <div>
            <h1>we are bulidingwe are about</h1>
            <p>{}</p>
            <p>{u.user.login && u.user.data.name}</p>
          </div>
        </Base>
      )}
    </userContext.Consumer>
  );
}

export default About;
