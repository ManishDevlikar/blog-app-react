import React from "react";
import userContext from "./userContext";
function UserProvider({ children }) {
  const [user, setUsers] = React.useState({ name: "manish" });
  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

export default UserProvider;
