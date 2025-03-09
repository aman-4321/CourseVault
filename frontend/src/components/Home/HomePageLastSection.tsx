const HomePageLastSection = () => {
  return (
    <div className="bg-black text-white flex flex-row justify-between px-[15rem] h-[25rem] pt-20">
      <div className="flex flex-col space-y-6">
        <h2 className="text-2xl font-bold">Good Course</h2>
        <p className="text-gray-300 leading-relaxed">
          lorem ipsum lorem ipsumlorem <br />
          ipsumlorem ipsumlorem ipsumlorem
        </p>
      </div>

      <div className="flex flex-col space-y-3 ml-16">
        <p className="font-semibold mb-2 pb-2 border-b border-gray-700">
          Main Pages
        </p>
        <p className="hover:text-gray-300 cursor-pointer">Home (Sales)</p>
        <p className="hover:text-gray-300 cursor-pointer">HomePage</p>
        <p className="hover:text-gray-300 cursor-pointer">About</p>
        <p className="hover:text-gray-300 cursor-pointer">Courses</p>
        <p className="hover:text-gray-300 cursor-pointer">Teachers</p>
      </div>

      <div className="flex flex-col space-y-3 ml-16">
        <p className="font-semibold mb-2 pb-2 border-b border-gray-700">
          CMS Pages
        </p>
        <p className="hover:text-gray-300 cursor-pointer">Course Page</p>
        <p className="hover:text-gray-300 cursor-pointer">Course Category</p>
        <p className="hover:text-gray-300 cursor-pointer">Blog Post</p>
        <p className="hover:text-gray-300 cursor-pointer">Teacher Profile</p>
      </div>

      <div className="flex flex-col space-y-3 ml-16">
        <p className="font-semibold mb-2 pb-2 border-b border-gray-700">
          Other Pages
        </p>
        <p className="hover:text-gray-300 cursor-pointer">Blog</p>
        <p className="hover:text-gray-300 cursor-pointer">Legal</p>
        <p className="hover:text-gray-300 cursor-pointer">Contact</p>
        <p className="hover:text-gray-300 cursor-pointer">See all Pages</p>
      </div>
    </div>
  );
};

export default HomePageLastSection;
