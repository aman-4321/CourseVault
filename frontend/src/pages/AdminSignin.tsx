import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAdmin from "../hooks/useAdmin";
import { apiUrl } from "../config";
import { Book, Users, DollarSign, Rocket } from "lucide-react";

const AdminSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setAdmin } = useAdmin();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const adminCredentials = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/admin/signin`,
        adminCredentials,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setAdmin(response.data.admin);
        navigate("/admin-dashboard");
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

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-[#fffdf1] flex flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Welcome Back, Creator!
        </h1>
        <div className="space-y-8 w-full max-w-md">
          <div className="flex items-center space-x-4">
            <div className="bg-[#ffc36a] p-3 rounded-full">
              <Book className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-semibold">Manage Your Courses</h3>
              <p className="text-sm text-gray-600">
                Update and improve your content
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-[#ffc36a] p-3 rounded-full">
              <Users className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-semibold">Engage with Students</h3>
              <p className="text-sm text-gray-600">
                Interact and support your learners
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-[#ffc36a] p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-semibold">Track Your Earnings</h3>
              <p className="text-sm text-gray-600">
                Monitor your course performance
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-[#ffc36a] p-3 rounded-full">
              <Rocket className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-semibold">Expand Your Reach</h3>
              <p className="text-sm text-gray-600">
                Create new courses and grow your audience
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Sign In as a Creator
          </h2>
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
                placeholder="johndoe@example.com"
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
                placeholder="********"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#ffc36a] text-black py-2 rounded-md hover:bg-[#ffb347] transition duration-200 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Access Your Creator Dashboard"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="mb-2">
              Not a creator yet?{" "}
              <Link
                to="/admin-signup"
                className="text-[#ffb347] hover:underline"
              >
                Sign up here
              </Link>
            </p>
            <p>
              Want to learn instead?{" "}
              <Link
                to="/user-signin"
                className="text-[#ffb347] hover:underline"
              >
                Sign in as a student
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignin;
