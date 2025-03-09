import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
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

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Others", path: "/others" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

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
        </div>
      )}
    </div>
  );
};
