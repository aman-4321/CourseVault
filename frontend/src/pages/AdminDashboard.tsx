import axios from "axios";
import { Book, DollarSign, Plus, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../config";
import { Course } from "../types/types";

const AdminDashboardCardTopNav = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminCourses, setAdminCourses] = useState<Course[] | null>(null);
  const [earnings, setEarnings] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, earningsResponse] = await Promise.all([
          axios.get(`${apiUrl}/admin/courses`, { withCredentials: true }),
          axios.get(`${apiUrl}/admin/earnings`, { withCredentials: true }),
        ]);
        setAdminCourses(coursesResponse.data.courses || []);
        setEarnings(earningsResponse.data.totalEarnings);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteCourse = async (courseId: string) => {
    try {
      await axios.delete(`${apiUrl}/admin/course/${courseId}`, {
        withCredentials: true,
      });
      setAdminCourses(
        adminCourses?.filter((course) => course._id !== courseId) || []
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data?.message || "Error deleting course");
      }
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-[#fffdf1]">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-[#fffdf1]">
        {error}
      </div>
    );

  const defaultImageUrl =
    "https://bairesdev.mo.cloudinary.net/blog/2022/01/programming-languages-1.jpg?tx=w_1920,q_auto";

  // Function to handle image load errors
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = defaultImageUrl;
  };

  return (
    <div className="min-h-screen bg-[#fffdf1]">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <button className="bg-[#ffc36a] text-black px-4 py-2 rounded-md hover:bg-[#ffb347] transition duration-200 flex items-center space-x-2">
              <Plus size={20} />
              <Link to="/create-course">Add New Course</Link>
            </button>
          </div>

          <div className="flex flex-wrap -mx-4 mb-8">
            <div className="w-full md:w-1/3 px-4 mb-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-[#ffc36a] bg-opacity-20">
                    <Book size={24} className="text-[#ffc36a]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 uppercase">
                      Total Courses
                    </p>
                    <p className="text-2xl font-semibold">
                      {adminCourses?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-[#ffc36a] bg-opacity-20">
                    <DollarSign size={24} className="text-[#ffc36a]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 uppercase">
                      Total Earnings
                    </p>
                    <p className="text-2xl font-semibold">
                      ${earnings?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-[#ffc36a] bg-opacity-20">
                    <User size={24} className="text-[#ffc36a]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 uppercase">
                      Total Students
                    </p>
                    <p className="text-2xl font-semibold">0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Your Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminCourses?.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={course.imageUrl || defaultImageUrl}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                  onError={handleImageError}
                />
                <div className="p-4 flex flex-col flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <p className="text-lg font-bold text-[#ffc36a] mb-4">
                      ${course.price}
                    </p>
                  </div>
                  <div className="mt-auto pt-2">
                    <button
                      onClick={() => deleteCourse(course._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200 flex items-center space-x-1"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardCardTopNav;
