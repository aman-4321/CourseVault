import { Award, Clock, DollarSign, Download, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface CourseCardProps {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
}

const CourseCard = ({
  _id,
  imageUrl,
  title,
  description,
  price,
}: CourseCardProps) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const defaultImageUrl =
    "https://bairesdev.mo.cloudinary.net/blog/2022/01/programming-languages-1.jpg?tx=w_1920,q_auto";

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] w-full"
      onClick={() => navigate(`/course/${_id}`)}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5">
          <img
            src={imgError || !imageUrl ? defaultImageUrl : imageUrl}
            alt={title}
            className="h-[250px] md:h-full w-full object-cover"
            onError={handleImageError}
          />
        </div>
        <div className="flex flex-col p-6 md:p-8 md:w-3/5">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
            {title}
          </h2>
          <p className="text-gray-700 mb-6 line-clamp-3 text-base">
            {description}
          </p>

          <div className="mt-auto space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User size={18} className="text-gray-500" />
                <span className="text-gray-700 font-medium">John Doe</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-gray-500" />
                <span className="text-gray-700 font-medium">8 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={18} className="text-[#ffc36a]" />
                <span className="text-gray-700 font-medium">Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <Download size={18} className="text-gray-500" />
                <span className="text-gray-700 font-medium">
                  Offline Access
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-[#ffc36a]">
                <DollarSign size={20} />
                <span className="font-bold text-xl">${price}</span>
              </div>
              <button className="bg-[#ffc36a] text-white px-6 py-2 rounded-md font-medium hover:bg-[#ffb347] transition-colors duration-200">
                View Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
