const cardItem = [
  {
    title: "Trusted by thousands",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Certificate awarded",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Made by professionals",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Available offline",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "400+ hours of class",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Chat online",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const HomePageSecondSection = () => {
  return (
    <div className="bg-[#fefdf8]">
      <h1 className="text-5xl font-medium flex justify-center pt-32 pb-10">
        Undeniable quality in every course
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 px-[18rem]">
        {cardItem.map((item, index) => (
          <div
            key={index}
            className="border-2 border-black p-8 rounded-2xl w-[27rem] bg-[#fffdf1] h-[20rem] pt-28"
          >
            <h2 className="text-2xl font-medium pb-4">{item.title}</h2>
            <p className="text-lg">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageSecondSection;
