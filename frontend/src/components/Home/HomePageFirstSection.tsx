import { useNavigate } from "react-router-dom";

const HomePageFirstSection = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-row pt-10">
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
          <div className="flex">
            <button
              onClick={() => {
                navigate("/courses");
              }}
              className="bg-[#ffc36a] px-7 py-4 text-2xl font-light rounded-lg mt-12 
              transition-all duration-500 ease-in-out hover:scale-105 hover:bg-[#ffb347]"
            >
              Explore courses
            </button>
            <p className="mt-16 pl-5 text-lg">Trusted over 10,000 students </p>
          </div>
        </div>
        <div className="size-[55rem] pl-72 pt-20 relative">
          {/* Using relative positioning for the container and absolute for the SVG */}
          <div className="relative">
            <img
              src="https://cdn.prod.website-files.com/64dd941077302a0d6ee48f03/64ddece6b7dad0d3ddf6ee1c_Abstract%20Hero%20Home.svg"
              className="absolute top-[-2rem] right-[-1rem] z-10 w-[10rem] h-[10rem]"
              alt="Abstract decoration"
            />
            <img
              src="/hero.png"
              className="rounded-3xl border-black border-[3px] relative"
              alt="Hero"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageFirstSection;
