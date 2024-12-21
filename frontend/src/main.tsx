import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./context/UserContext.tsx";
import { AdminProvider } from "./context/AdminContext.tsx";
import { CourseProvider } from "./context/CourseContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <AdminProvider>
        <CourseProvider>
          <App />
        </CourseProvider>
      </AdminProvider>
    </UserProvider>
  </StrictMode>
);
