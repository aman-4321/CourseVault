import axios from "axios";
import { Book, Lightbulb, Rocket } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../config";
import useUser from "../hooks/useUser";

const UserSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useUser();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const loginUser = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${apiUrl}/user/signin`, loginUser, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser(response.data.user);
        setEmail("");
        setPassword("");
        navigate("/home");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Signin failed. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-[#fffdf1] flex flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Welcome Back to Your Learning Journey
        </h1>
        <div className="space-y-8 w-full max-w-md">
          <div className="flex items-center space-x-4">
            <div className="bg-[#ffc36a] p-3 rounded-full">
              <Book className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-semibold">Continue Your Progress</h3>
              <p className="text-sm text-gray-600">
                Pick up right where you left off
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-[#ffc36a] p-3 rounded-full">
              <Lightbulb className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-semibold">Discover New Courses</h3>
              <p className="text-sm text-gray-600">
                Explore our latest offerings
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-[#ffc36a] p-3 rounded-full">
              <Rocket className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-semibold">Achieve Your Goals</h3>
              <p className="text-sm text-gray-600">
                Track your learning milestones
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc36a]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc36a]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#ffc36a] text-black py-2 rounded-md hover:bg-[#ffb347] transition duration-200 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="mb-2">
              New User?{" "}
              <Link
                to="/user-signup"
                className="text-[#ffb347] hover:underline"
              >
                Sign up
              </Link>
            </p>
            <p>
              Login as admin{" "}
              <Link
                to="/admin-signin"
                className="text-[#ffb347] hover:underline"
              >
                here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignin;
