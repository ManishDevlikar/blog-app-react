import { useEffect, useState } from "react";
import userContext from "./userContext";
import { getCurrentUserDetail } from "../auth";
function UserProvider({ children }) {
  const [user, setUsers] = useState({ data: {}, login: false });

  // useEffect(() => {
  //   const user = getCurrentUserDetail();
  //   setUsers(user);
  // }, []);



  return <userContext.Provider value={{ user ,setUsers}}>{children}</userContext.Provider>;
}

export default UserProvider;
