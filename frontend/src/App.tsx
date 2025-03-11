import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminProtectedWrapper from "./components/auth/AdminProtectedWrapper";
import UserProtectedWrapper from "./components/auth/UserProtectedWrapper";
import UserAuthRedirect from "./components/auth/UserAuthRedirect";
import AdminAuthRedirect from "./components/auth/AdminAuthRedirect";
import CourseDetails from "./components/courses/CourseDetails";
import ExploreCourses from "./components/courses/ExploreCourses";
import Layout from "./components/Layout/Layout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSignin from "./pages/AdminSignin";
import AdminSignup from "./pages/AdminSignup";
import CreateCourse from "./pages/CreateCourse";
import Home from "./pages/Home";
import UserPurchasedCourses from "./pages/UserPurchasedCourses";
import UserSignin from "./pages/UserSignin";
import UserSignup from "./pages/UserSignup";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/user-signup"
            element={
              <UserAuthRedirect>
                <UserSignup />
              </UserAuthRedirect>
            }
          ></Route>
          <Route
            path="/user-signin"
            element={
              <UserAuthRedirect>
                <UserSignin />
              </UserAuthRedirect>
            }
          ></Route>
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
          <Route
            path="/admin-signup"
            element={
              <AdminAuthRedirect>
                <AdminSignup />
              </AdminAuthRedirect>
            }
          ></Route>
          <Route
            path="/admin-signin"
            element={
              <AdminAuthRedirect>
                <AdminSignin />
              </AdminAuthRedirect>
            }
          ></Route>
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

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
