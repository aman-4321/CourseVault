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

  const { setAdmin } = useAdmin();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const respone = await axios.get(`${apiUrl}/admin/profile`, {
          withCredentials: true,
        });

        if (respone.data.admin) {
          setAdmin(respone.data.admin);
        } else {
          throw new Error("No admin data");
        }
      } catch (err) {
        console.error(err);
        navigate("/admin-signin");
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
