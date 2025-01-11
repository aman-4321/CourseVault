import axios from "axios";
import { AlertCircle, Book, Calendar, DollarSign, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config";
import { Course } from "../types/types";

interface Purchase {
  _id: string;
  courseId: Course;
  userId: string;
  __v: number;
}

const UserPurchasedCourses = () => {
  const [purchased, setPurchased] = useState<Purchase[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const purchasedCourses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/purchased`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          console.log("fetched all courses");
          setPurchased(response.data.purchases);
        } else {
          setError("Failed to fetch purchased courses of user");
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ||
              "Failed to fetch purchased courses of user",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    purchasedCourses();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#fffdf1] flex items-center justify-center">
        <div className="flex items-center space-x-2 text-[#ffc36a]">
          <Loader className="animate-spin" size={24} />
          <span className="text-lg font-semibold">Loading your courses...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-[#fffdf1] flex items-center justify-center">
        <div className="flex items-center space-x-2 text-red-500">
          <AlertCircle size={24} />
          <span className="text-lg font-semibold">
            Error getting your courses
          </span>
        </div>
      </div>
    );
  }

  if (!purchased || purchased.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#fffdf1] flex items-center justify-center">
        <div className="text-center">
          <Book size={48} className="mx-auto text-gray-400 mb-4" />
          <span className="text-xl font-semibold text-gray-600">
            You haven't purchased any courses yet
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#fffdf1] p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Purchased Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {purchased.map((purchase) => (
          <div
            key={purchase.courseId._id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105"
            onClick={() => navigate(`/course/${purchase.courseId._id}`)}
          >
            <img
              src={
                purchase.courseId.imageUrl ||
                "/placeholder.svg?height=200&width=400"
              }
              alt={purchase.courseId.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                {purchase.courseId.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {purchase.courseId.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[#ffc36a]">
                  <DollarSign size={20} />
                  <span className="text-lg font-bold">
                    {purchase.courseId.price}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Calendar size={20} />
                  <span className="text-sm">
                    Purchased on:{" "}
                    {new Date(
                      purchase._id.substring(0, 8),
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPurchasedCourses;
