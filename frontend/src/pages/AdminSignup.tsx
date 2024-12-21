import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAdmin from "../hooks/useAdmin";
import { apiUrl } from "../config";

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setAdmin } = useAdmin();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newAdmin = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };

    try {
      const response = await axios.post(`${apiUrl}/admin/signup`, newAdmin, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setAdmin(response.data.admin);
        navigate("/home");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Signup failed. Please try again");
      }
    } finally {
      setLoading(false);
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
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

          <h3>FirstName</h3>
          <input
            required
            type="text"
            placeholder="john"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <h3>Lastname</h3>
          <input
            type="text"
            placeholder="doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <button
            disabled={loading}
            type="submit"
            className={`${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            } text-white px-4 py-2 rounded transition-colors `}
          >
            {loading ? "Siging in..." : "Sign in"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
