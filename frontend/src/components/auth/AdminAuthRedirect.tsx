import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const AdminAuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { admin, isLoading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && admin) {
      navigate("/admin-dashboard");
    }
  }, [admin, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AdminAuthRedirect;
