import { useNavigate } from "react-router-dom";
import { Course } from "../types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../config";

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
              "Faild to fetch purchasedCourses of user"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    purchasedCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error gettting all user courses</div>;
  }

  if (!purchased || purchased.length === 0) {
    return <div>No courses made yet</div>;
  }

  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-center">
        <div>
          <div className="space-y-4">
            {purchased.map((purchase) => {
              return (
                <div
                  key={purchase.courseId._id}
                  className="flex rounded flex-col space-y-4 pt-2 pb-2 border-black border-2 cursor-pointer"
                  onClick={() => {
                    navigate(`/course/${purchase.courseId._id}`);
                  }}
                >
                  <p>{purchase.courseId.title}</p>
                  <p>{purchase.courseId.description}</p>
                  <p>{purchase.courseId.price}</p>
                  <p>{purchase.courseId.imageUrl}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPurchasedCourses;
