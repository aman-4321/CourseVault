import axios from "axios";
import {
  AlertCircle,
  Book,
  CheckCircle,
  DollarSign,
  Loader,
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

  const { admin } = useAdmin();
  const { user } = useUser();
  const navigate = useNavigate();

  const currentUser = user || admin;

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
        { withCredentials: true },
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
        <div className="text-red-500 flex items-center space-x-2">
          <AlertCircle size={24} />
          <span>Error in opening course</span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#fffdf1]">
        <div className="text-[#ffc36a] flex items-center space-x-2">
          <Loader className="animate-spin" size={24} />
          <span>Loading course details...</span>
        </div>
      </div>
    );
  }

  const isCreator = currentUser?._id === currentCourse?.creatorId;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#fffdf1]">
      <main className="flex-grow p-8 md:w-2/3">
        <h1 className="text-3xl font-bold mb-6">{currentCourse?.title}</h1>
        <img
          src={
            currentCourse?.imageUrl || "/placeholder.svg?height=400&width=600"
          }
          alt={currentCourse?.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Course Description</h2>
            <p className="text-gray-700">{currentCourse?.description}</p>
          </section>
          {/* Add more sections here for course content, syllabus, etc. */}
        </div>
      </main>

      <aside className="md:w-1/3 p-8">
        <div className="sticky top-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Course Details</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Book className="text-[#ffc36a]" size={20} />
                <span className="text-gray-700">{currentCourse?.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="text-[#ffc36a]" size={20} />
                <span className="text-2xl font-bold">
                  ${currentCourse?.price}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="text-[#ffc36a]" size={20} />
                <span className="text-gray-700">
                  {isCreator
                    ? "You are the creator"
                    : "Created by: [Creator Name]"}
                </span>
              </div>
            </div>
            {!alreadyPurchased && !isCreator && (
              <button
                className={`w-full mt-6 px-4 py-2 rounded text-white font-semibold ${
                  isPurchasing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#ffc36a] hover:bg-[#ffb347]"
                } transition-colors`}
                onClick={purchase}
                disabled={isPurchasing}
              >
                {isPurchasing ? "Purchasing..." : "Purchase Course"}
              </button>
            )}
            {alreadyPurchased && (
              <div className="mt-6 flex items-center justify-center space-x-2 text-green-500">
                <CheckCircle size={20} />
                <span>You have purchased this course</span>
              </div>
            )}
            {isCreator && (
              <div className="mt-6 text-center text-gray-700">
                You are the creator of this course
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CourseDetails;
