import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../../context/AdminContext";
import axios from "axios";

export const AdminProtectedWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("AdminContext is not found");
  }

  const { setAdmin } = context;

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const respone = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/profile`,
          {
            withCredentials: true,
          },
        );

        if (respone.data.admin) {
          setAdmin(respone.data.admin);
        } else {
          throw new Error("No admin data");
        }
      } catch (err) {
        console.error(err);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };
    verifyAdmin();
  }, [navigate, setAdmin]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AdminProtectedWrapper;
