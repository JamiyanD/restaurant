import { createContext, useState } from "react";

interface UserContextType {
  showUser: any[];
  setShowUser: (like: any) => void;
  USERS_URL: any;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: any) => {
  const [showUser, setShowUser] = useState([]);
  const USERS_URL = `${process.env.BACKEND_URL}/users`;
  return (
    <UserContext.Provider value={{ showUser, setShowUser, USERS_URL }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
