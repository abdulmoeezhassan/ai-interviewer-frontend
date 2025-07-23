import React from "react";
import { UserContextType } from "../constants/types";
import userService from "../services/user.service";

export const userContext = React.createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = React.useState<any>(undefined);

  const getSingleUser = async () => {
    try {
      const email = localStorage.getItem("email");
      const getSingleUser = await userService.getSingleUser(email);
      if (getSingleUser) {
        console.log("User data fetched successfully");
        setUserData(getSingleUser.user);
      } else {
        console.error("Error in getting user data");
      }
    } catch (error) {
      console.error("Error in fetching user data", error);
    }
  };

  React.useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <userContext.Provider value={{ userData, setUserData, getSingleUser }}>
      {children}
    </userContext.Provider>
  );
};

