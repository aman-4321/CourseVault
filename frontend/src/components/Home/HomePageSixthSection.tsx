const card = [
  {
    name: "Marketing",
    icon: "https://cdn.prod.website-files.com/64ddafe690d3da8a29108483/64ddb145459a01ddf77645f8_megaphone.svg",
  },
  {
    name: "No-code",
    icon: "https://cdn.prod.website-files.com/64ddafe690d3da8a29108483/64ddb1385ddbfdf9c248c937_puzzle.svg",
  },
  {
    name: "Design",
    icon: "https://cdn.prod.website-files.com/64ddafe690d3da8a29108483/64ddb12d6d446b169f7a5ab5_design-pencil.svg",
  },
  {
    name: "Development",
    icon: "https://cdn.prod.website-files.com/64ddafe690d3da8a29108483/64ddb12182ca1efc3631e747_code.svg",
  },
];

const HomePageSixthSection = () => {
  return (
    <div className="py-20 h-[35rem] bg-[#fefdf8]">
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
              className="w-[19rem] h-[14rem] flex flex-col items-center justify-center rounded-xl border-2 border-black bg-[#fffdf1] space-y-4"
            >
              <div className="bg-black rounded-full p-4">
                <img src={item.icon} alt={item.name} className="size-6" />
              </div>
              <p className="text-center text-2xl font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageSixthSection;
