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
    <div className="py-20 h-[35rem]">
      <div className="container mx-auto px-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl">Explore Courses by Category</h1>
          <button className="border-2 border-black px-6 py-2 rounded-lg hover:bg-black hover:text-white transition-colors">
            see all
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-10 pt-10">
          {card.map((item, index) => (
            <div
              key={index}
              className="w-[19rem] h-[14rem] flex items-center justify-center rounded-xl border-2 border-black bg-[#fffdf1]"
            >
              <p className="text-center text-2xl font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageSixthSection;
