import { createContext, useState, useEffect } from "react";
import { Admin } from "../types/types";
import { axiosInstance } from "../lib/axios";

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
        const response = await axiosInstance.get(`/admin/profile`);

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
    setIsLoading(true);
    try {
      await axiosInstance.post(`/admin/logout`);
    } catch (error) {
      console.error("Admin logout failed", error);
    } finally {
      setAdmin(null);
      setIsLoading(false);
    }
  };

  return (
    <AdminContext.Provider value={{ admin, setAdmin, logout, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
