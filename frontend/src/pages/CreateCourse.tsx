import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../context/CourseContext";
import axios from "axios";
import { apiUrl } from "../config";
import { Book, DollarSign, Image, AlertCircle } from "lucide-react";

const CreateCourseSplitScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>();
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const context = useContext(CourseContext);

  if (!context) {
    throw new Error("Course Context not provided");
  }

  const { setCourses } = context;

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const newCourse = {
      title: title,
      description: description,
      price: price,
      imageUrl: imageUrl,
    };

    try {
      const response = await axios.post(`${apiUrl}/admin/course`, newCourse, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setCourses(response.data.course);
        navigate("/home");
      }
    } catch (error: unknown) {
      setError(
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Failed to create course"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf1] flex">
      <div className="w-1/2 p-8">
        <h2 className="text-3xl font-bold mb-6">Create New Course</h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Title
            </label>
            <div className="relative">
              <Book className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                id="title"
                type="text"
                required
                placeholder="e.g., Marketing Fundamentals"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc36a]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Description
            </label>
            <textarea
              id="description"
              required
              placeholder="A brief description about the course"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc36a]"
              rows={4}
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Price
            </label>
            <div className="relative">
              <DollarSign
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
              <input
                id="price"
                type="number"
                required
                placeholder="e.g., 4999"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc36a]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Image URL
            </label>
            <div className="relative">
              <Image
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
              <input
                id="imageUrl"
                type="text"
                required
                placeholder="https://example.com/course-image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc36a]"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-500">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#ffc36a] hover:bg-[#ffb347]"
            } text-black font-semibold px-4 py-2 rounded transition-colors`}
          >
            {loading ? "Creating Course..." : "Create Course"}
          </button>
        </form>
      </div>
      <div className="w-1/2 bg-white p-8 flex flex-col justify-center items-center">
        <h3 className="text-2xl font-bold mb-4">Course Preview</h3>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg?height=200&width=400"}
            alt="Course Preview"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h4 className="text-xl font-semibold mb-2">
              {title || "Course Title"}
            </h4>
            <p className="text-gray-600 mb-4">
              {description || "Course description will appear here"}
            </p>
            <p className="text-2xl font-bold text-[#ffc36a]">${price || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseSplitScreen;
