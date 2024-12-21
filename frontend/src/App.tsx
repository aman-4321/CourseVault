import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import UserSignup from "./pages/UserSignup";
import UserSignin from "./pages/UserSignin";
import AdminSignup from "./pages/AdminSignup";
import AdminSignin from "./pages/AdminSignin";
import CreateCourse from "./pages/CreateCourse";
import AdminProtectedWrapper from "./components/auth/AdminProtectedWrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/user-signup" element={<UserSignup />}></Route>
        <Route path="/user-signin" element={<UserSignin />}></Route>
        <Route path="/admin-signup" element={<AdminSignup />}></Route>
        <Route path="/admin-signin" element={<AdminSignin />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
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
