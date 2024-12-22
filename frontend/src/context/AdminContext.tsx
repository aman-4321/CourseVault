import { createContext, useState } from "react";
import { Admin } from "../types/types";

interface AdminContextType {
  admin: Admin | null;
  setAdmin: (admin: Admin | null) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
