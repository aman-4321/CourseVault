import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
