import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { axiosInstance } from "../../lib/axios";

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
        const response = await axiosInstance.get("/admin/profile");

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
