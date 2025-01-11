import { AlertCircle, Book, DollarSign, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAllCourses } from "../../hooks/useCourses";

const ExploreCourses = () => {
  const { courses, error, loading } = useAllCourses();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#fffdf1] flex items-center justify-center">
        <div className="flex items-center space-x-2 text-[#ffc36a]">
          <Loader className="animate-spin" size={24} />
          <span className="text-lg font-semibold">Loading courses...</span>
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
            Error in getting all courses
          </span>
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#fffdf1] flex items-center justify-center">
        <div className="text-center">
          <Book size={48} className="mx-auto text-gray-400 mb-4" />
          <span className="text-xl font-semibold text-gray-600">
            No Courses available yet
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#fffdf1] p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Explore Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105"
            onClick={() => navigate(`/course/${course._id}`)}
          >
            <img
              src={course.imageUrl || "/placeholder.svg?height=200&width=400"}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[#ffc36a]">
                  <DollarSign size={20} />
                  <span className="text-lg font-bold">{course.price}</span>
                </div>
                <button
                  className="bg-[#ffc36a] text-white px-4 py-2 rounded-md hover:bg-[#ffb347] transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/course/${course._id}`);
                  }}
                >
                  View Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCourses;
