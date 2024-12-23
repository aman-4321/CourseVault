import axios from "axios";
import { apiUrl } from "../../config";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSpecificCourse } from "../../hooks/useCourses";
import useAdmin from "../../hooks/useAdmin";
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
    return <div>Error in opening course</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const isCreator = currentUser?._id === currentCourse?.creatorId;

  return (
    <div className="flex justify-center w-full min-h-screen flex-col items-center">
      <p>{currentCourse?.title}</p>
      <p>{currentCourse?.description}</p>
      <p>{currentCourse?.price}</p>
      <p>{currentCourse?.imageUrl}</p>

      {!alreadyPurchased && !isCreator && (
        <button
          className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded"
          onClick={purchase}
          disabled={isPurchasing}
        >
          {isPurchasing ? "Purchasing..." : "Purchase course"}
        </button>
      )}
      {alreadyPurchased && <p>You have already purchased this course</p>}
      {isCreator && <p>You are the creator of this course</p>}
    </div>
  );
};

export default CourseDetails;
