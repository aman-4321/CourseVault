import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminContext from "../context/AdminContext";

const AdminSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  const { setAdmin } = context;

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const newAdmin = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/signin`,
        newAdmin,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const data = response.data;
        setAdmin(data.admin);
        navigate("/home");
      }
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Signup failed. Please try again");
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex w-full min-h-screen">
      <div className="justify-center px-10 py-10">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3>Email</h3>
          <input
            required
            type="email"
            placeholder="johndoes@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3>Enter a Password</h3>
          <input
            required
            type="password"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminSignin;
