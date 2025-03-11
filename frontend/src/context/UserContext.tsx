import { createContext, useState, useEffect } from "react";
import { User } from "../types/types";
import { axiosInstance } from "../lib/axios";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axiosInstance.get(`/user/profile`);

        if (response.data && response.data.user) {
          setUser(response.data.user);
        }
      } catch {
        console.log("User not authenticated");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const logout = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.post(`/user/logout`);
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
