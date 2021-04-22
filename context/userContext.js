import { createContext, useEffect, useState } from "react";

export const userContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const localUser = localStorage.getItem("restorez_user");

    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("restorez_user", JSON.stringify(user));
    }
  }, [user]);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
