import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Admin } from "../types/types";
import { apiUrl } from "../config";

interface AdminContextType {
  admin: Admin | null;
  setAdmin: (admin: Admin | null) => void;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/profile`, {
          withCredentials: true,
        });

        if (response.data && response.data.admin) {
          setAdmin(response.data.admin);
        }
      } catch {
        console.log("Admin not authenticated");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        `${apiUrl}/admin/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setAdmin(null);
    } catch (error) {
      console.error("Admin logout failed", error);
    }
  };

  return (
    <AdminContext.Provider value={{ admin, setAdmin, logout, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
