import { useContext, useEffect, useState } from "react";
import { CourseContext } from "../context/CourseContext";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};

export default useCourse;

export const useAllCourses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { courses, setCourses } = useCourse();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get(`/course/all`);
        setCourses(response.data.courses);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch courses");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [setCourses]);

  return { loading, courses, error };
};

export const useSpecificCourse = (_id: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentCourse, setCurrentCourse } = useCourse();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get(`/course/${_id}`);
        setCurrentCourse(response.data.course);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch course");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [_id, setCurrentCourse]);

  return {
    loading,
    currentCourse,
    error,
  };
};
