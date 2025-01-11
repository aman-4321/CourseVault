import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminProtectedWrapper from "./components/auth/AdminProtectedWrapper";
import UserProtectedWrapper from "./components/auth/UserProtectedWrapper";
import CourseDetails from "./components/courses/CourseDetails";
import ExploreCourses from "./components/courses/ExploreCourses";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSignin from "./pages/AdminSignin";
import AdminSignup from "./pages/AdminSignup";
import CreateCourse from "./pages/CreateCourse";
import Home from "./pages/Home";
import UserPurchasedCourses from "./pages/UserPurchasedCourses";
import UserSignin from "./pages/UserSignin";
import UserSignup from "./pages/UserSignup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/user-signup" element={<UserSignup />}></Route>
        <Route path="/user-signin" element={<UserSignin />}></Route>
        <Route path="/courses" element={<ExploreCourses />}></Route>
        <Route path="/course/:courseId" element={<CourseDetails />}></Route>
        <Route
          path="/purchased"
          element={
            <UserProtectedWrapper>
              <UserPurchasedCourses />
            </UserProtectedWrapper>
          }
        ></Route>
        <Route path="/admin-signup" element={<AdminSignup />}></Route>
        <Route path="/admin-signin" element={<AdminSignin />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedWrapper>
              <AdminDashboard />
            </AdminProtectedWrapper>
          }
        ></Route>
        <Route
          path="/create-course"
          element={
            <AdminProtectedWrapper>
              <CreateCourse />
            </AdminProtectedWrapper>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
