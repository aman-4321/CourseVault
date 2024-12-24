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
      <div className="mb-8">
        <div className="flex flex-row">
          <h1 className="text-4xl pb-10">Explore Courses by Category</h1>
          <button className="border-black border">see all</button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        {card.map((item, index) => (
          <div
            key={index}
            className="w-[19rem] h-[14rem] flex items-center justify-center rounded-xl border-2 border-black bg-[#fffdf1]"
          >
            <p className="text-center text-2xl font-medium">{item.name}</p>
          </div>
        ))}
      </div>
      <div className="pt-40 flex justify-center">
        <div className="w-3/4 h-40 flex rounded-xl border-2 border-black">
          <div className="flex flex-col">
            <h1>Get started Today</h1>
            <p>lorem ipsum </p>
            <span>Explore courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageSixthSection;
