import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { useLocation } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  // Check if the current path is a signin or signup page
  const isAuthPage = [
    "/user-signin",
    "/user-signup",
    "/admin-signin",
    "/admin-signup",
  ].includes(location.pathname);

  return (
    <div className="min-h-screen">
      {!isAuthPage && <Navbar />}
      <div className={!isAuthPage ? "pt-20" : ""}>{children}</div>
    </div>
  );
};

export default Layout;
