import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const UserProtectedWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext is not found");
  }

  const { setUser, user } = context;

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/profile`,
          {
            withCredentials: true,
          }
        );

        if (response.data.user) {
          setUser(response.data.user);
        } else {
          throw new Error("No user data");
        }
      } catch (err) {
        console.error(err);
        navigate("/user-signin", { replace: true });
        return;
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
      verifyUser();
    } else {
      setIsLoading(false);
    }
  }, [navigate, setUser, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
