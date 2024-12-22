import { createContext, useState } from "react";
import { Course } from "../types/types";

interface CourseContextType {
  courses: Course[] | null;
  setCourses: (course: Course[] | null) => void;
  currentCourse: Course | null;
  setCurrentCourse: (course: Course | null) => void;
}

export const CourseContext = createContext<CourseContextType | null>(null);

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  return (
    <CourseContext.Provider
      value={{ courses, setCourses, currentCourse, setCurrentCourse }}
    >
      {children}
    </CourseContext.Provider>
  );
};
