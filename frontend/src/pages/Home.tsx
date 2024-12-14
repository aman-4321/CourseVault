import HomePageFifthSection from "../components/HomePageFifthSection";
import HomePageFirstSection from "../components/HomePageFirstSection";
import HomePageFourthSection from "../components/HomePageFourthSection";
import HomePageLastSection from "../components/HomePageLastSection";
import HomePageSecondSection from "../components/HomePageSecondSection";
import HomePageSixthSection from "../components/HomePageSixthSection";
import HomePageThirdSection from "../components/HomePageThirdSection";
import { Navbar } from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <div className="bg-[#fffdf1] min-h-[20rem]">
        <Navbar></Navbar>
        <HomePageFirstSection></HomePageFirstSection>
      </div>
      <HomePageSecondSection></HomePageSecondSection>
      <HomePageThirdSection></HomePageThirdSection>
      <HomePageFourthSection></HomePageFourthSection>
      <HomePageFifthSection></HomePageFifthSection>
      <HomePageSixthSection></HomePageSixthSection>
      <HomePageLastSection></HomePageLastSection>
    </div>
  );
};

export default Home;
