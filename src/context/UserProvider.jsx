import { useState, useEffect } from "react";
import userContext from "./userContext";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
function UserProvider({ children }) {
  const [user, setUsers] = useState({ data: {}, login: false });
  useEffect(() => {
    setUsers({
      data: getCurrentUserDetail(),
      login: isLoggedIn(),
    });
  }, []);
  return (
    <userContext.Provider value={{ user, setUsers }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
