const cardItem = [
  {
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddf089459a01ddf7c4fed6_group.svg",
    title: "Trusted by thousands",
    description:
      "Join our community of over 50,000 satisfied learners who have transformed their careers through our comprehensive courses.",
  },
  {
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddf08990d3da8a296439ab_shield-check.svg",
    title: "Certificate awarded",
    description:
      "Earn industry-recognized certificates upon course completion to showcase your newly acquired skills to potential employers.",
  },
  {
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddf08977302a0d6e5c6aad_check-circle.svg",
    title: "Made by professionals",
    description:
      "Learn from industry experts and seasoned professionals who bring real-world experience and practical insights to every lesson.",
  },
  {
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddf089b2ce60c1cf38bd6c_download.svg",
    title: "Available offline",
    description:
      "Download courses and continue learning without internet connectivity. Perfect for learning on-the-go or in areas with limited access.",
  },
  {
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddf08987950ac0907cafb4_alarm.svg",
    title: "400+ hours of class",
    description:
      "Access our extensive library of content with over 400 hours of in-depth video lectures, practical exercises, and hands-on projects.",
  },
  {
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddf089040e946dbbb8518c_chat-bubble.svg",
    title: "Chat online",
    description:
      "Get instant support through our live chat feature. Connect with instructors and fellow students to discuss course content and solve problems.",
  },
];

const HomePageSecondSection = () => {
  return (
    <div className="bg-[#fefdf8] pb-40 relative">
      <img
        src="https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddf193040e946dbbb9aaca_Bottom%20Abstract%20USP.svg"
        className="absolute bottom-0 left-0 z-0"
        alt="abstract design"
      ></img>
      <h1 className="text-5xl font-medium flex justify-center pt-32 pb-10">
        Undeniable quality in every course
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-16 p-8 px-[18rem]">
        {cardItem.map((item, index) => (
          <div
            key={index}
            className="border-2 border-black p-8 rounded-3xl w-[27rem] bg-[#fffdf1] h-[20rem] pt-10"
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
