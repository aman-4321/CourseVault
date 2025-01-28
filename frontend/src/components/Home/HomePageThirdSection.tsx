const features = [
  {
    title: "Trusted by Thousands",
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddf089459a01ddf7c4fed6_group.svg",
  },
  {
    title: "Certificate awarded",
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64de02a577302a0d6e714038_shield-check.svg",
  },
  {
    title: "Download Available",
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64de02a5df7d0876a997d38c_download.svg",
  },
  {
    title: "Made by professionals",
    icon: "https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64deb096c1729b2dcac8d070_check-circle.svg",
  },
];

const HomePageThirdSection = () => {
  return (
    <div className="bg-[#fffdf1] min-h-screen">
      <div className="flex flex-row pt-52">
        <div className="relative ml-[18rem]">
          <img
            src="https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64deaf71824f9393e63a883d_Combo%20Halves.jpg"
            className="w-[43rem] h-[45rem] rounded-3xl mb-28"
          />
          <img
            src="https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64deafa1f546fd3aed5ac6a5_Abstract%20Combo%20Halves.svg"
            className="absolute bottom-[-2rem] left-[-2rem] w-64"
          />
        </div>
        <div className="flex flex-col pl-16">
          <h2 className="text-5xl font-medium pt-20">
            Everything you need to <br />
            make a seemless transition
          </h2>
          <p className="pt-10 text-xl">
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            <br />
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </p>
          <div className="space-y-6 pt-10 font-medium text-xl">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <img src={feature.icon} className="w-6 h-6" />
                <p>{feature.title}</p>
              </div>
            ))}
            <button className="bg-[#ffc36a] px-6 py-4 text-xl rounded-lg hover:scale-105 transition-all duration-200">
              About us
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center space-x-32 pt-20 pb-20">
        <div className="flex flex-col items-center">
          <p className="text-4xl font-medium">2012</p>
          <p className="text-lg mt-2">Founding year</p>
        </div>

        <div className="h-16 w-[1px] bg-black"></div>

        <div className="flex flex-col items-center">
          <p className="text-4xl font-medium">100+</p>
          <p className="text-lg mt-2">Projects</p>
        </div>

        <div className="h-16 w-[1px] bg-black"></div>

        <div className="flex flex-col items-center">
          <p className="text-4xl font-medium">1</p>
          <p className="text-lg mt-2">Mission</p>
        </div>

        <div className="h-16 w-[1px] bg-black"></div>

        <div className="flex flex-col items-center">
          <p className="text-4xl font-medium">23</p>
          <p className="text-lg mt-2">Creators</p>
        </div>
      </div>
    </div>
  );
};

// in the bottom of it please add these things 2012 and below it written founding year then a vertical border and then 100+ and below it written projects and a vertical border and then 1 and below it written mission and then a vertical border and then 23 below it written creators

export default HomePageThirdSection;
