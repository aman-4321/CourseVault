import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const UserAuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/purchased");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserAuthRedirect;
