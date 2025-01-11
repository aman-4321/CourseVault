const cards = [
  {
    title: "Figma Basics",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Jess Newman",
    money: "$290",
    hours: "8 hours",
  },
  {
    title: "UX Research",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    name: "Alex Johnson",
    money: "$350",
    hours: "10 hours",
  },
  {
    title: "UI Design Principles",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    name: "Emma Williams",
    money: "$320",
    hours: "9 hours",
  },
];

const HomePageFourthSection = () => {
  return (
    <section className="py-20 w-full bg-[#fefdf8] min-h-screen mb-52">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-medium text-center mb-12">
          Leave 9-5 by joining one of our courses
        </h1>
        <div className="space-y-8 w-[90rem] px-[16rem] h-10">
          {cards.map((item, index) => (
            <div
              key={index}
              className="h-[22rem] border-2 border-black rounded-3xl p-6 grid grid-cols-1 md:grid-cols-[2fr,1px,1fr] gap-6 bg-[#fffdf1] ml-20"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <div className="hidden md:block w-px bg-gray-300 my-4"></div>
              <div className="space-y-4">
                <p className="font-medium">{item.name}</p>
                <p className="text-xl font-bold">{item.money}</p>
                <p className="text-gray-600">{item.hours}</p>
                <div className="pt-4">
                  <p className="font-medium">Certificate</p>
                  <button className="mt-2 w-full">
                    <p className="mr-2 h-4 w-4" /> Download Offline
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <button className="bg-[#ffc36a] px-6 py-4 text-lg rounded-lg hover:scale-105 transition-all duration-200">
              See all Courses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageFourthSection;
