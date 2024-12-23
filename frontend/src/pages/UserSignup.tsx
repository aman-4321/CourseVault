import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Book, Lightbulb, Rocket } from "lucide-react";
import { apiUrl } from "../config";

const MinimalistSplitScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newUser = { email, password, firstName, lastName };

    try {
      const response = await axios.post(`${apiUrl}/user/signup`, newUser, {
        withCredentials: true,
      });

      if (response.status === 200) {
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
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-[#fffdf1] flex flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Embark on Your Learning Journey
        </h1>
        <div className="space-y-8 w-full max-w-md">
          <div className="flex items-center space-x-4">
            <div className="bg-[#ffc36a] p-3 rounded-full">
              <Book className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-semibold">Diverse Courses</h3>
              <p className="text-sm text-gray-600">
                Explore a wide range of subjects
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-[#ffc36a] p-3 rounded-full">
              <Lightbulb className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-semibold">Expert Instructors</h3>
              <p className="text-sm text-gray-600">
                Learn from industry professionals
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-[#ffc36a] p-3 rounded-full">
              <Rocket className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-semibold">Grow Your Skills</h3>
              <p className="text-sm text-gray-600">
                Advance your career with new knowledge
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={submitHandler} className="space-y-4 w-full max-w-md">
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
            {loading ? "Embarking..." : "Start Your Journey"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="mb-2">
            Already on board?{" "}
            <Link to="/user-signin" className="text-[#ffb347] hover:underline">
              Sign in
            </Link>
          </p>
          <p>
            <Link to="/admin-signup" className="text-[#ffb347] hover:underline">
              Signup as a course creator
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MinimalistSplitScreen;
