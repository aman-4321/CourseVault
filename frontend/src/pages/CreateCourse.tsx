import {
  AlertCircle,
  Book,
  DollarSign,
  Image,
  Loader,
  Upload,
} from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../context/CourseContext";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

const CreateCourse = () => {
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
      const response = await axiosInstance.post(`/admin/course`, newCourse);

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
    <div className="min-h-screen bg-[#fffdf1]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="flex items-center space-x-3 mb-8">
                <Upload className="text-[#ffc36a]" size={24} />
                <h2 className="text-3xl font-bold text-gray-900">
                  Create New Course
                </h2>
              </div>

              <form onSubmit={submitHandler} className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Course Title
                    </label>
                    <div className="relative">
                      <Book
                        className="absolute top-3 left-3 text-[#ffc36a]"
                        size={20}
                      />
                      <input
                        id="title"
                        type="text"
                        required
                        placeholder="e.g., Advanced Marketing Strategies"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffc36a] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Course Description
                    </label>
                    <textarea
                      id="description"
                      required
                      placeholder="Provide a detailed description of your course content and learning outcomes..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffc36a] focus:border-transparent transition-all"
                      rows={6}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Course Price (USD)
                    </label>
                    <div className="relative">
                      <DollarSign
                        className="absolute top-3 left-3 text-[#ffc36a]"
                        size={20}
                      />
                      <input
                        id="price"
                        type="number"
                        required
                        placeholder="49.99"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffc36a] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="imageUrl"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Course Image URL
                    </label>
                    <div className="relative">
                      <Image
                        className="absolute top-3 left-3 text-[#ffc36a]"
                        size={20}
                      />
                      <input
                        id="imageUrl"
                        type="text"
                        required
                        placeholder="https://example.com/course-image.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffc36a] focus:border-transparent transition-all"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Provide a URL to your course cover image (recommended
                      size: 1200x800px)
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 rounded-xl flex items-center space-x-2 text-red-600">
                    <AlertCircle size={20} />
                    <p className="font-medium">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#ffc36a] hover:bg-[#ffb347] hover:shadow-lg"
                  } text-white font-semibold px-6 py-3 rounded-xl transition-all transform hover:scale-[1.02]`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader className="animate-spin" size={20} />
                      <span>Creating Course...</span>
                    </div>
                  ) : (
                    "Create Course"
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Course Preview
                </h3>
                <div className="space-y-6">
                  <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={
                        imageUrl ||
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop"
                      }
                      alt="Course Preview"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900">
                      {title || "Course Title"}
                    </h4>
                    <p className="text-gray-600 line-clamp-3">
                      {description ||
                        "Your course description will appear here. Make it compelling and clear to attract potential students."}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#ffc36a]">
                        ${price?.toFixed(2) || "0.00"}
                      </span>
                      <span className="text-sm text-gray-500">Preview</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
