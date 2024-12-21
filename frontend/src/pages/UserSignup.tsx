import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUser from "../hooks/useUser";
import { apiUrl } from "../config";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useUser();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newUser = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };

    try {
      const response = await axios.post(`${apiUrl}/user/signup`, newUser, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser(response.data.user);
        navigate("/home");
      }
    } catch (error) {
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
            className={`${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"} text-white px-4 py-2 rounded transition-colors`}
            type="submit"
          >
            Sign Up
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
