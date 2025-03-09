import { Award, Clock, DollarSign, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105 max-w-[35rem]"
      onClick={() => navigate(`/course/${_id}`)}
    >
      <div className="flex flex-col">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-[200px] object-cover"
        />
        <div className="flex flex-col p-6">
          <h2 className="text-2xl font-semibold mb-3">{title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center gap-6 mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">By John Doe</span>
            </div>
            <div className="flex items-center gap-2 text-[#ffc36a]">
              <DollarSign size={18} />
              <span className="font-bold">{price}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>8 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={18} className="text-[#ffc36a]" />
              <span>Certificate</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-gray-600">
            <Download size={18} />
            <span>Available Offline</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
