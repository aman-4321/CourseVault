import HomePageFifthSection from "../components/Home/HomePageFifthSection";
import HomePageFirstSection from "../components/Home/HomePageFirstSection";
import HomePageLastSection from "../components/Home/HomePageLastSection";
import HomePageSecondSection from "../components/Home/HomePageSecondSection";
import HomePageSixthSection from "../components/Home/HomePageSixthSection";
import HomePageThirdSection from "../components/Home/HomePageThirdSection";
import { Navbar } from "../components/Home/Navbar";

const Home = () => {
  return (
    <div>
      <div className="bg-[#fffdf1] min-h-[20rem]">
        <Navbar></Navbar>
        <HomePageFirstSection></HomePageFirstSection>
      </div>
      <HomePageSecondSection></HomePageSecondSection>
      <HomePageThirdSection></HomePageThirdSection>
      <HomePageFifthSection></HomePageFifthSection>
      <HomePageSixthSection></HomePageSixthSection>
      <HomePageLastSection></HomePageLastSection>
    </div>
  );
};

export default Home;
