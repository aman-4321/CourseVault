import { useNavigate } from "react-router-dom";
import { useAllCourses } from "../../hooks/useCourses";

const ExploreCourses = () => {
  const { courses, error, loading } = useAllCourses();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error in getting all courses</div>;
  }

  if (!courses || courses.length === 0) {
    return <div>No Courses made yet</div>;
  }

  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-center">
        <div>
          {courses?.map((course) => {
            return (
              <div
                key={course._id}
                className="flex flex-col space-y-4 pt-2 pb-2 border-black border-2 cursor-pointer"
                onClick={() => navigate(`/course/${course._id}`)}
              >
                <p>{course.title}</p>
                <p>{course.description}</p>
                <p>{course.price}</p>
                <p>{course.imageUrl}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;
