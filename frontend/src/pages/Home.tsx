import { Navbar } from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-[#fffdf1] min-h-screen">
      <Navbar></Navbar>
      <div className="flex flex-row">
        <div className="pt-52 pl-52">
          <div className="font-medium text-7xl">
            <p>Unlock skills.</p>
            <p>Create new life.</p>
          </div>
          <div className="text-3xl pt-12">
            <p>Good Course offers professionals tech</p>
            <p>courses from the leading teachers in</p>
            <p>their industrie</p>
          </div>
          <button className="bg-[#ffc36a] px-7 py-4 text-xl font-normal rounded-lg mt-12">
            Explore courses
          </button>
        </div>
        <div className="size-[55rem] pl-72 pt-20">
          <img
            src="/hero.png"
            className="rounded-3xl border-black border-[3px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
