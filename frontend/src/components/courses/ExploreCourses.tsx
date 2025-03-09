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
    <div>
      <Navbar />
      <div className="w-full min-h-screen bg-[#fffdf1] p-8 pt-40">
        <h1 className="text-3xl font-bold mb-8 text-center">Explore Courses</h1>
        <div className="grid grid-cols-2 gap-8 max-w-7xl mx-auto">
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
