import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserSignup from "./pages/UserSignup";
import UserSignin from "./pages/UserSignin";
import AdminSignup from "./pages/AdminSignup";
import AdminSignin from "./pages/AdminSignin";
import CreateCourse from "./pages/CreateCourse";
import AdminProtectedWrapper from "./components/auth/AdminProtectedWrapper";
import ExploreCourses from "./components/courses/ExploreCourses";
import CourseDetails from "./components/courses/CourseDetails";
import UserPurchasedCourses from "./pages/UserPurchasedCourses";
import UserProtectedWrapper from "./components/auth/UserProtectedWrapper";
import AdminDashboard from "./pages/AdminDashboard";

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
