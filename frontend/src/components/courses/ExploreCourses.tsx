import { AlertCircle, Book, Loader } from "lucide-react";
import { useAllCourses } from "../../hooks/useCourses";
import { Navbar } from "../Home/Navbar";
import CourseCard from "./CourseCard";

const ExploreCourses = () => {
  const { courses, error, loading } = useAllCourses();

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
    <div className="min-h-screen bg-[#fffdf1]">
      <Navbar />
      <div className="container mx-auto px-4 py-10 pt-28 md:pt-32">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Explore Our Courses
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover high-quality courses designed to help you advance your
            skills and achieve your goals
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-10">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              _id={course._id}
              imageUrl={course.imageUrl}
              title={course.title}
              description={course.description}
              price={course.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;
