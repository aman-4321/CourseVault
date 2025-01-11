const HomePageThirdSection = () => {
  return (
    <div className="bg-[#fffdf1] min-h-screen">
      <div className="flex flex-row pt-52">
        <div className="relative ml-[18rem]">
          <img
            src="https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64deaf71824f9393e63a883d_Combo%20Halves.jpg"
            className="w-[43rem] h-[45rem] rounded-3xl mb-52"
          ></img>
          <img
            src="https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64deafa1f546fd3aed5ac6a5_Abstract%20Combo%20Halves.svg"
            className="absolute bottom-[-2rem] left-[-2rem] w-64"
          ></img>
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
            <p>Trusted by Thousands</p>
            <p>Certificate awarded</p>
            <p>Download Available</p>
            <p className="pb-6">Made by professionals</p>
            <button className="bg-[#ffc36a] px-6 py-4 text-xl rounded-lg hover:scale-105 transition-all duration-200">
              About us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageThirdSection;
