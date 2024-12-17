const HomePageFirstSection = () => {
  return (
    <div>
      <div className="flex flex-row">
        <div className="pt-52 pl-60">
          <div className="font-medium text-7xl">
            <p className="mb-2">Unlock skills.</p>
            <p>Create new life.</p>
          </div>
          <div className="text-3xl pt-12 space-y-2 font-light">
            <p>Good Course offers professionals tech</p>
            <p>courses from the leading teachers in</p>
            <p>their industries</p>
          </div>
          <button className="bg-[#ffc36a] px-7 py-4 text-2xl font-light rounded-lg mt-12 hover:scale-105 transition-all duration-200">
            Explore courses
          </button>
        </div>
        <div className="size-[55rem] pl-72 pt-20">
          <img
            src="https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddece6b7dad0d3ddf6ee1c_Abstract%20Hero%20Home.svg"
            className="absolute top-[7rem] right-[15rem] "
          />
          <img
            src="/hero.png"
            className="rounded-3xl border-black border-[3px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageFirstSection;
