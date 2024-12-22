import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../context/CourseContext";
import axios from "axios";
import { apiUrl } from "../config";

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

    setTitle("");
    setDescription("");
    setImageUrl("");
    setPrice(0);
  };

  return (
    <div className="flex pl-10 pt-10">
      <div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3>Title</h3>
          <input
            required
            type="text"
            placeholder="Marketing Course"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <h3>description</h3>
          <input
            required
            type="text"
            placeholder="A brief description about Marketing course"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <h3>price</h3>
          <input
            required
            type="number"
            placeholder="4999"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <h3>imageUrl</h3>
          <input
            required
            type="text"
            placeholder="https://image.com"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <button
            disabled={loading}
            type="submit"
            className={`${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            } text-white px-4 py-2 rounded transition-colors `}
          >
            {loading ? "Creating Course..." : "Create Course"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
