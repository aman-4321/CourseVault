import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import useAdmin from "../../hooks/useAdmin";
import axios from "axios";
import { apiUrl } from "../../config";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, logout: userLogout, isLoading: userLoading } = useUser();
  const { admin, logout: adminLogout, isLoading: adminLoading } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      if (admin) {
        await axios.post(
          `${apiUrl}/admin/logout`,
          {},
          { withCredentials: true }
        );
        await adminLogout();
        navigate("/admin-signin");
      } else if (user) {
        await axios.post(
          `${apiUrl}/user/logout`,
          {},
          { withCredentials: true }
        );
        await userLogout();
        navigate("/user-signin");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Still attempt to clear local state even if API call fails
      if (admin) {
        adminLogout();
        navigate("/admin-signin");
      } else if (user) {
        userLogout();
        navigate("/user-signin");
      }
    }
  };

  // Define base navigation items that are always shown
  const baseNavItems = [
    { name: "Home", path: "/home" },
    { name: "Courses", path: "/courses" },
  ];

  // Conditional navigation items based on authentication state
  const navItems = [...baseNavItems];

  // Add auth-specific links
  if (!admin) {
    navItems.push({ name: "Admin", path: "/admin-signin" });
  }

  if (!user) {
    navItems.push({ name: "User", path: "/user-signin" });
  }

  // Add purchased courses link for logged-in users
  if (user) {
    navItems.push({ name: "My Courses", path: "/purchased" });
  }

  // Add dashboard link for logged-in admins
  if (admin) {
    navItems.push({ name: "Dashboard", path: "/admin-dashboard" });
  }

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Check if authentication check is still in progress
  const isLoading = userLoading || adminLoading;

  // Check if user is authenticated
  const isAuthenticated = !!user || !!admin;

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#fffdf1]/95 shadow-md h-16" : "bg-[#fffdf1] h-20"
      } border-black border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <div
          className="font-medium text-2xl md:text-3xl cursor-pointer transition-colors duration-300 hover:text-gray-700"
          onClick={() => navigate("/home")}
        >
          CourseVault
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`cursor-pointer font-light text-lg transition-all duration-200 hover:text-blue-600 ${
                isActive(item.path)
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </div>
          ))}

          {/* Auth-related buttons */}
          {!isLoading && isAuthenticated && (
            <div
              className="cursor-pointer font-light text-lg transition-all duration-200 hover:text-blue-600"
              onClick={handleLogout}
            >
              Logout
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#fffdf1] border-t border-gray-200">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                isActive(item.path)
                  ? "border-l-4 border-blue-600 bg-gray-50"
                  : ""
              }`}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
            >
              {item.name}
            </div>
          ))}

          {/* Logout Button for mobile */}
          {!isLoading && isAuthenticated && (
            <div
              className="px-4 py-3 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
            >
              Logout
            </div>
          )}
        </div>
      )}
    </div>
  );
};
