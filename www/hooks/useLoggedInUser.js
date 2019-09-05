import { createContext, useContext } from "react";

export const LoggedInUserContext = createContext();

export const LoggedInUserProvider = ({ user, children }) => (
  <LoggedInUserContext.Provider value={user}>
    {children}
  </LoggedInUserContext.Provider>
);

export const useLoggedInUser = () => {
  return useContext(LoggedInUserContext);
};
