const categoryItems = [
  {
    id: 1,
    title: "Main Dish",
    despriction: "(86 dishes)",
    image: "../src/assets/images/home/category/img1.png",
  },
  {
    id: 2,
    title: "Break Fast",
    despriction: "(12 break fast)",
    image: "../src/assets/images/home/category/img2.png",
  },
  {
    id: 3,
    title: "Dessert",
    despriction: "(48 dessert)",
    image: "../src/assets/images/home/category/img3.png",
  },
  {
    id: 4,
    title: "Browse All",
    despriction: "(255 Items)",
    image: "../src/assets/images/home/category/img4.png",
  },
];

const Catagories = () => {
  return (
    <div className="max-w-screen-xl container mx-auto xl:px-24 px-16 py-8">
      <div className="text-center">
        <p className="subtitle">Discover</p>
        <h2 className="title h2">Our Catagories</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 ">
        {categoryItems.map((item, i) => (
          <div
            key={i}
            className="shadow-lg rounded-md bg-white py-6 px-5 w-[250px] mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 z-10"
          >
            <div className="w-full mx-auto flex items-center justify-center">
              <img
                src={item.image}
                alt=""
                className="bg-[#C1F1C6] p-5 rounded-full w-28 h-28"
              />
            </div>
            <div className="mt-5 space-y-1">
              <h5 className="text-[#1E1E1E] font-semibold">{item.title}</h5>
              <p className="text-secondary text-sm">{item.despriction}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catagories;
