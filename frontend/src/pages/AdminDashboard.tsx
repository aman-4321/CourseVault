import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../config";
import { Course } from "../types/types";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminCourse, setAdminCourse] = useState<Course[] | null>(null);
  const [earnings, setEarnings] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllAdminCourses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/courses`, {
          withCredentials: true,
        });
        setAdminCourse(response.data.courses || []);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message || "Failed to fetch admin courses"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    const getAdminEarnings = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/earnings`, {
          withCredentials: true,
        });
        setEarnings(response.data.totalEarnings);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message || "Failed to fetch admin earnings"
          );
        }
      }
    };

    getAllAdminCourses();
    getAdminEarnings();
  }, []);

  const deleteCourse = async (courseId: string) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/admin/course/${courseId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.message || "Course deleted successfully");
      setAdminCourse(
        adminCourse?.filter((course) => course._id !== courseId) || []
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Error deleting course");
      } else {
        console.log("Course not deleted");
      }
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {adminCourse && (
        <div>
          {adminCourse.map((course) => (
            <div
              key={course._id}
              className="flex rounded flex-col space-y-4 pt-2 pb-2 border-black border-2 cursor-pointer w-1/4"
              onClick={() => {
                navigate(`/course/${course._id}`);
              }}
            >
              <p>{course.title}</p>
              <p>{course.description}</p>
              <p>{course.price}</p>
              <p>{course.imageUrl}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCourse(course._id);
                }}
              >
                delete
              </button>
            </div>
          ))}
        </div>
      )}
      {earnings !== null && <p>Total Earnings: ${earnings}</p>}
    </div>
  );
};

export default AdminDashboard;
