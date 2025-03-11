import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../config";
import useAdmin from "../../hooks/useAdmin";

export const AdminProtectedWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { setAdmin, admin } = useAdmin();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/profile`, {
          withCredentials: true,
        });

        if (response.data.admin) {
          setAdmin(response.data.admin);
        } else {
          throw new Error("No admin data");
        }
      } catch (err) {
        console.error(err);
        navigate("/admin-signin", { replace: true });
        return;
      } finally {
        setIsLoading(false);
      }
    };

    if (!admin) {
      verifyAdmin();
    } else {
      setIsLoading(false);
    }
  }, [navigate, setAdmin, admin]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AdminProtectedWrapper;
