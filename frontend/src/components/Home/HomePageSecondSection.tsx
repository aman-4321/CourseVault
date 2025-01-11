const cardItem = [
  {
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddf089459a01ddf7c4fed6_group.svg",
    title: "Trusted by thousands",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddf08990d3da8a296439ab_shield-check.svg",
    title: "Certificate awarded",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddf08977302a0d6e5c6aad_check-circle.svg",
    title: "Made by professionals",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddf089b2ce60c1cf38bd6c_download.svg",
    title: "Available offline",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddf08987950ac0907cafb4_alarm.svg",
    title: "400+ hours of class",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddf089040e946dbbb8518c_chat-bubble.svg",
    title: "Chat online",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const HomePageSecondSection = () => {
  return (
    <div className="bg-[#fefdf8] pb-40">
      <h1 className="text-5xl font-medium flex justify-center pt-32 pb-10">
        Undeniable quality in every course
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 px-[18rem]">
        {cardItem.map((item, index) => (
          <div
            key={index}
            className="border-2 border-black p-8 rounded-2xl w-[27rem] bg-[#fffdf1] h-[20rem] pt-10"
          >
            <img className="pb-5" src={item.icon} />
            <h2 className="text-2xl font-medium pb-4">{item.title}</h2>
            <p className="text-lg">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageSecondSection;
