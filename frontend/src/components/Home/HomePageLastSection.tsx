const HomePageLastSection = () => {
  return (
    <div className="bg-black text-white flex flex-row justify-between px-[15rem] h-[30rem] pt-20">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">Good Course</h2>
        <p>
          lorem ipsum lorem ipsumlorem <br />
          ipsumlorem ipsumlorem ipsumlorem
        </p>
      </div>
      <div className="flex flex-col space-y-2 ml-16">
        <p className="font-semibold mb-2">Main Pages</p>
        <p>Home (Sales)</p>
        <p>HomePage</p>
        <p>About</p>
        <p>Courses</p>
        <p>Teachers</p>
      </div>

      <div className="flex flex-col space-y-2 ml-16">
        <p className="font-semibold mb-2">CMS Pages</p>
        <p>Course Page</p>
        <p>Course Category</p>
        <p>Blog Post</p>
        <p>Teacher Profile</p>
      </div>

      <div className="flex flex-col space-y-2 ml-16">
        <p className="font-semibold mb-2">Other Pages</p>
        <p>Blog</p>
        <p>Legal</p>
        <p>Contact</p>
        <p>See all Pages</p>
      </div>
    </div>
  );
};

export default HomePageLastSection;
