import Base from "../components/Base";
import userContext from "../context/userContext";

function Services() {
  return (
    <userContext.Consumer>
      {(user) => (
        <Base>
          <div>
            <h1>this is Servies page {user?.name}</h1>
          </div>
        </Base>
      )}
    </userContext.Consumer>
  );
}

export default Services;
