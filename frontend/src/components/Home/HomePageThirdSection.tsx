const HomePageThirdSection = () => {
  return (
    <div className="bg-[#fffdf1] pb-44">
      <div className="flex flex-row pt-40">
        <img
          src="https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64deaf71824f9393e63a883d_Combo%20Halves.jpg"
          className="w-[40rem] h-[42rem] rounded-2xl ml-[18rem]"
        ></img>
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
            <button className="bg-[#ffc36a] px-6 py-4 text-lg rounded-lg hover:scale-105 transition-all duration-200">
              About us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageThirdSection;
