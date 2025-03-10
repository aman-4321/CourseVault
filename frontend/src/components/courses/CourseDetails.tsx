import axios from "axios";
import {
  AlertCircle,
  Book,
  CheckCircle,
  Clock,
  Loader,
  Star,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../../config";
import useAdmin from "../../hooks/useAdmin";
import { useSpecificCourse } from "../../hooks/useCourses";
import useUser from "../../hooks/useUser";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { currentCourse, error, loading } = useSpecificCourse(courseId || "");
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);

  const { admin, setAdmin } = useAdmin();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const currentUser = user || admin;

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check for user authentication
        const userResponse = await axios.get(`${apiUrl}/user/profile`, {
          withCredentials: true,
        });

        if (userResponse.data.user) {
          setUser(userResponse.data.user);
        }
      } catch {
        // Not authenticated as user
      }

      try {
        // Check for admin authentication
        const adminResponse = await axios.get(`${apiUrl}/admin/profile`, {
          withCredentials: true,
        });

        if (adminResponse.data.admin) {
          setAdmin(adminResponse.data.admin);
        }
      } catch {
        // Not authenticated as admin
      }
    };

    checkAuthStatus();
  }, [setUser, setAdmin]);

  useEffect(() => {
    const checkIfPurchased = async () => {
      try {
        if (user) {
          const response = await axios.get(`${apiUrl}/user/check/${courseId}`, {
            withCredentials: true,
          });
          if (response.status === 200 && response.data.purchased) {
            setAlreadyPurchased(true);
          } else {
            setAlreadyPurchased(false);
          }
        }
      } catch (error) {
        console.error("Error checking if course is purchased", error);
        setAlreadyPurchased(false);
      }
    };

    checkIfPurchased();
  }, [courseId, user]);

  const purchase = async () => {
    if (!user) {
      navigate("/user-signup");
      return;
    }

    if (alreadyPurchased) return;
    setIsPurchasing(true);
    try {
      const response = await axios.post(
        `${apiUrl}/user/purchase/${courseId}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("Course purchased successfully");
        setAlreadyPurchased(true);
      } else if (response.status === 404) {
        alert(response.data.message || "Course not found");
      } else {
        alert("Failed to purchase course");
      }
    } catch (err) {
      console.error("Error in purchasing course", err);
      alert("Error in purchasing course");
    } finally {
      setIsPurchasing(false);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#fffdf1]">
        <div className="text-red-500 flex items-center space-x-2 bg-white p-4 rounded-lg shadow-md">
          <AlertCircle size={24} />
          <span className="font-medium">Error in opening course</span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#fffdf1]">
        <div className="text-[#ffc36a] flex items-center space-x-2 bg-white p-4 rounded-lg shadow-md">
          <Loader className="animate-spin" size={24} />
          <span className="font-medium">Loading course details...</span>
        </div>
      </div>
    );
  }

  const isCreator =
    currentUser?._id && currentCourse?.creatorId
      ? currentUser._id === currentCourse.creatorId
      : false;

  return (
    <div className="min-h-screen bg-[#fffdf1]">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <main className="flex-grow lg:w-2/3 space-y-8">
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[#ffc36a]">
                <Star size={20} />
                <span className="text-sm font-medium">Featured Course</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                {currentCourse?.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span>8 weeks</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Book size={16} />
                  <span>12 modules</span>
                </div>
              </div>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <img
                src={
                  currentCourse?.imageUrl ||
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop"
                }
                alt={currentCourse?.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Course Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {currentCourse?.description}
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  What You'll Learn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Master key concepts",
                    "Build real projects",
                    "Learn best practices",
                    "Get hands-on experience",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="text-[#ffc36a]" size={16} />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>

        <aside className="lg:w-1/3">
          <div className="sticky top-8">
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-gray-900">
                    ${currentCourse?.price}
                  </span>
                  {alreadyPurchased && (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                      Purchased
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Book className="text-[#ffc36a]" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Full Course Access
                      </h3>
                      <p className="text-sm text-gray-600">
                        Lifetime access to all content
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <User className="text-[#ffc36a]" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {isCreator ? "Course Creator" : "Course Instructor"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isCreator
                          ? "You created this course"
                          : "Expert instructor support"}
                      </p>
                    </div>
                  </div>
                </div>

                {!alreadyPurchased && !isCreator && (
                  <button
                    className={`w-full px-6 py-3 rounded-xl text-white font-semibold transition-all transform hover:scale-[1.02] ${
                      isPurchasing
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#ffc36a] hover:bg-[#ffb347] shadow-lg hover:shadow-xl"
                    }`}
                    onClick={purchase}
                    disabled={isPurchasing}
                  >
                    {isPurchasing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Loader className="animate-spin" size={20} />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Enroll Now"
                    )}
                  </button>
                )}

                {alreadyPurchased && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle size={20} />
                      <span className="font-medium">
                        Course purchased successfully
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-green-600">
                      You have full access to this course
                    </p>
                  </div>
                )}

                {isCreator && (
                  <div className="bg-[#fff8e6] p-4 rounded-lg">
                    <div className="flex items-center space-x-2 text-[#ffc36a]">
                      <Star size={20} />
                      <span className="font-medium">Course Creator</span>
                    </div>
                    <p className="mt-2 text-sm text-[#ffc36a]">
                      You are the creator of this course
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetails;
