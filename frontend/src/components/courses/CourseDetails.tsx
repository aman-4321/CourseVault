import { useParams } from "react-router-dom";
import { useSpecificCourse } from "../../hooks/useCourses";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { currentCourse, error, loading } = useSpecificCourse(courseId || "");

  if (error) {
    console.log(error);
    return <div>Error in opening course</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center w-full min-h-screen flex-col items-center">
      <p>{currentCourse?.title}</p>
      <p>{currentCourse?.description}</p>
      <p>{currentCourse?.price}</p>
      <p>{currentCourse?.imageUrl}</p>
    </div>
  );
};

export default CourseDetails;
