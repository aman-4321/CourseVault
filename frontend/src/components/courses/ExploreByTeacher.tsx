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

const TeacherCard = ({ teacher }) => (
  <div className="border-2 border-black rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
    <div className="p-4">
      <div className="relative h-80 w-full mb-4">
        <img
          src={teacher.image}
          alt={teacher.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{teacher.skill}</h3>
        <p className="text-gray-600">{teacher.name}</p>
      </div>
    </div>
  </div>
);

const ExploreByTeacher = () => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Explore by teacher</h1>
          <button className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300">
            Meet all
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <TeacherCard key={index} teacher={teacher} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreByTeacher;
