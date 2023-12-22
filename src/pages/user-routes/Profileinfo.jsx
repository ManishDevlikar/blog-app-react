import { useContext } from "react";
import Base from "../../components/Base";
import userContext from "../../context/userContext";

const Profileinfo = () => {
  const user = useContext(userContext);
  return (
    <Base>
      <div>Profile info {user?.name}</div>
    </Base>
  );
};

export default Profileinfo;
