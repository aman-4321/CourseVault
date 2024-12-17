import { Navbar } from "../Home/Navbar";
import { course } from "./courses";

const ExploreCoursesCard = ({ course }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
      <p className="text-gray-600 text-sm mb-4">{course.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-700 mb-4">
        <span>Mentor: {course.name}</span>
        <span>{course.money}</span>
        <span>{course.time}</span>
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
          Certificate
        </span>
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download Offline
        </button>
      </div>
    </div>
  </div>
);

const ExploreCourses = () => {
  return (
    <div className="bg-[#fffdf1] min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-12">
          Explore Courses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {course.map((course, index) => (
            <ExploreCoursesCard key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;
