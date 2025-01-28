import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 w-full bg-[#fffdf1] z-50 flex flex-row h-20 border-black border-b pt-5">
      <div
        className="font-medium pr-[40rem] text-3xl pl-44 cursor-pointer"
        onClick={() => {
          navigate("/home");
        }}
      >
        CourseVault
      </div>
      <div
        className="pr-32 pt-1 cursor-pointer font-light text-lg"
        onClick={() => {
          navigate("/home");
        }}
      >
        Home
      </div>
      <div className="pr-32 pt-1 font-light text-lg">About</div>
      <div className="pt-1 font-light text-lg">Others</div>
    </div>
  );
};
