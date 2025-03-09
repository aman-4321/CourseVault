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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Features */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#fff8e1] to-[#fffdf1] flex flex-col justify-center items-center p-8 md:p-12 shadow-inner">
        <div className="max-w-md w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800">
            Welcome Back to Your Learning Journey
          </h1>
          <div className="space-y-10 w-full">
            <div className="flex items-center space-x-5 transform transition hover:translate-x-2 duration-300">
              <div className="bg-gradient-to-br from-[#ffc36a] to-[#ffb347] p-4 rounded-full shadow-md">
                <Book className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Continue Your Progress
                </h3>
                <p className="text-gray-600">
                  Pick up right where you left off
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-5 transform transition hover:translate-x-2 duration-300">
              <div className="bg-gradient-to-br from-[#ffc36a] to-[#ffb347] p-4 rounded-full shadow-md">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Discover New Courses</h3>
                <p className="text-gray-600">Explore our latest offerings</p>
              </div>
            </div>
            <div className="flex items-center space-x-5 transform transition hover:translate-x-2 duration-300">
              <div className="bg-gradient-to-br from-[#ffc36a] to-[#ffb347] p-4 rounded-full shadow-md">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Achieve Your Goals</h3>
                <p className="text-gray-600">Track your learning milestones</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Signin Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8 md:p-12">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Sign In to Your Account
          </h2>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md animate-pulse">
              <p className="text-red-600">{error}</p>
            </div>
          )}
          <form onSubmit={submitHandler} className="space-y-6 w-full">
            <div className="transition-all duration-200 focus-within:scale-105">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc36a] focus:border-transparent shadow-sm"
                required
              />
            </div>
            <div className="transition-all duration-200 focus-within:scale-105">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc36a] focus:border-transparent shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ffc36a] to-[#ffb347] text-white font-medium py-3 px-4 rounded-lg hover:from-[#ffb347] hover:to-[#ffa41b] transition duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="mt-8 text-center space-y-3">
            <p className="text-gray-600">
              New User?{" "}
              <Link
                to="/user-signup"
                className="text-amber-600 hover:text-amber-700 font-medium hover:underline transition-colors"
              >
                Sign up
              </Link>
            </p>
            <p className="text-gray-600">
              Login as admin{" "}
              <Link
                to="/admin-signin"
                className="text-amber-600 hover:text-amber-700 font-medium hover:underline transition-colors"
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
