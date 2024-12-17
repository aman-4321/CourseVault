import React from "react";

const teachers = [
  {
    image:
      "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64deb35c3870ae466619da4c_teacher%201-p-500.webp",
    skill: "Design expert",
    name: "Michael Scott",
  },
  {
    image:
      "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64deb35ca34d821435e53e2e_teacher%202-p-500.webp",
    skill: "Marketing course",
    name: "Pam Halpert",
  },
  {
    image:
      "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64deb35bc7460ad1ef8b1a2d_teacher%203-p-500.webp",
    skill: "No code expert",
    name: "Meredith Ko",
  },
];

const HomePageFifthSection: React.FC = () => {
  return (
    <section className="bg-black text-white py-20 relative overflow-hidden">
      <img
        src="https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64deb3036d3047f72fd26135_Abstract%20%3A%20Teachers%20Top.svg"
        className="absolute top-0 left-0 w-1/4 h-auto"
        alt="Top left abstract"
      />
      <img
        src="https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64deb303f3b0b6254face0ba_Abstract%20Teachers%20Bottom.svg"
        className="absolute bottom-0 right-0 w-1/4 h-auto"
        alt="Bottom right abstract"
      />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Meet your teachers
        </h2>
        <div className="flex flex-wrap justify-center items-start gap-8">
          {teachers.map((teacher, index) => (
            <div key={index} className="flex flex-col items-center w-64">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-400 text-sm">{teacher.skill}</p>
              <p className="font-semibold text-lg">{teacher.name}</p>
            </div>
          ))}
          <div className="flex items-center justify-center w-64">
            <button className="bg-transparent hover:bg-white text-white font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent rounded transition-colors duration-300">
              Meet all
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageFifthSection;
