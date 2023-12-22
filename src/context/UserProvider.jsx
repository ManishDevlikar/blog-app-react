import React, { useEffect } from "react";
import userContext from "./userContext";
import { getCurrentUserDetail } from "../auth";
function UserProvider({ children }) {
  const [user, setUsers] = React.useState({ name: "manish" });

  useEffect(() => {
    const user = getCurrentUserDetail();
    setUsers(user);
  }, []);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

export default UserProvider;
