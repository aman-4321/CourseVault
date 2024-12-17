const HomePageThirdSection = () => {
  return (
    <div>
      <div className="flex flex-row pt-40">
        <img
          src="https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64deaf71824f9393e63a883d_Combo%20Halves.jpg"
          className="w-[40rem] h-[40rem] rounded-2xl ml-[18rem]"
        ></img>
        <div className="flex flex-col pl-12">
          <h2 className="text-5xl font-medium pt-20">
            Everything you need to <br />
            make a seemless transition
          </h2>
          <p className="pt-10 text-xl">
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            <br />
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </p>
          <div className="space-y-4 pt-10">
            <p>Trusted by Thousands</p>
            <p>Certificate awarded</p>
            <p>Download Available</p>
            <p>Made by professionals</p>
            <button className="px-2 py-3 rounded-xl bg-purple-50 text-black">
              About us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageThirdSection;
