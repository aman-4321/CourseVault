const card = [
  {
    name: "Marketing",
  },
  {
    name: "No-code",
  },
  {
    name: "Design",
  },
  {
    name: "Development",
  },
];

const HomePageSixthSection = () => {
  return (
    <div className="py-20">
      <div className="text-center mb-8">
        <h1 className="text-4xl">Explore Courses by Category</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {card.map((item, index) => (
          <div
            key={index}
            className="w-40 h-40 flex items-center justify-center rounded-xl border-2 border-black"
          >
            <p className="text-center">{item.name}</p>
          </div>
        ))}
      </div>
      <div className="pt-40 flex justify-center">
        <div className="w-3/4 h-40 flex rounded-xl border-2 border-black">
          <div className="flex flex-col">
            <h1>Get started Today</h1>
            <p>lorem ipsum </p>
            <button>Explore courses</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageSixthSection;
