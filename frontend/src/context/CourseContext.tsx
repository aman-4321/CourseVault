import { createContext, useState } from "react";
import { Course } from "../types/types";

interface CourseContextType {
  course: Course | null;
  setCourse: (course: Course | null) => void;
}

export const CourseContext = createContext<CourseContextType>({
  course: null,
  setCourse: () => {},
});

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [course, setCourse] = useState<Course | null>(null);

  return (
    <CourseContext.Provider value={{ course, setCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
