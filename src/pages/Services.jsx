import Base from "../components/Base";
import userContext from "../context/userContext";

function Services() {
  return (
    <userContext.Consumer>
      {(u) => (
        <Base>
          <div>
            <h1>
              this is Servies page {u?.user.login && u?.user.data.user.name}
            </h1>
          </div>
        </Base>
      )}
    </userContext.Consumer>
  );
}

export default Services;
