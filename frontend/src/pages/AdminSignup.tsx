import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAdmin from "../hooks/useAdmin";
import { apiUrl } from "../config";
import { Book, Users, DollarSign, Rocket } from "lucide-react";

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
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-[#fffdf1] flex flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Become a Course Creator
        </h1>
        <div className="space-y-8 w-full max-w-md">
          <div className="flex items-center space-x-4">
            <div className="bg-[#ffc36a] p-3 rounded-full">
              <Book className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-semibold">Share Your Expertise</h3>
              <p className="text-sm text-gray-600">
                Create engaging courses in your field
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-[#ffc36a] p-3 rounded-full">
              <Users className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-semibold">Reach a Global Audience</h3>
              <p className="text-sm text-gray-600">
                Connect with learners worldwide
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-[#ffc36a] p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-semibold">Earn from Your Knowledge</h3>
              <p className="text-sm text-gray-600">
                Monetize your skills and experience
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-[#ffc36a] p-3 rounded-full">
              <Rocket className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-semibold">Grow Your Brand</h3>
              <p className="text-sm text-gray-600">
                Establish yourself as an industry expert
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Sign Up as a Creator
          </h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc36a]"
                  required
                  placeholder="John"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc36a]"
                  required
                  placeholder="Doe"
                />
              </div>
            </div>
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
              {loading ? "Creating Account..." : "Start Creating Courses"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="mb-2">
              Already a creator?{" "}
              <Link
                to="/admin-signin"
                className="text-[#ffb347] hover:underline"
              >
                Sign in
              </Link>
            </p>
            <p>
              Want to learn instead?{" "}
              <Link
                to="/user-signup"
                className="text-[#ffb347] hover:underline"
              >
                Sign up as a student
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
