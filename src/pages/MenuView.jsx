import { useState, useEffect } from "react";
import axios from "axios";
import MealCard from "../components/MealCard";
import { FaFilter } from "react-icons/fa";
import Pagination from "../components/Pagination";

function MenuView() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOprion] = useState("default");

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // Number of items per page
  // Get Menu Data
  const getMenuData = async () => {
    try {
      const response = await axios.get("/menu.json");
      const data = await response.data;
      setMenu(data);
      setFilteredMenu(data);
    } catch (err) {
      console.log(`Error Fetching Data ${err}`);
    }
  };
  // Filter Menu data According to Category
  const getFilterdData = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);
    setFilteredMenu(filtered);
    setSelectedCategory(category);
    setCurrentPage(1); // Reset page to 1 when category is changed
  };
  //Sort Menu According to A-z / Z-A / High to Low Price / Low to High Pric
  const handleSortMenu = (option) => {
    setSortOprion(option);

    // Logic for sorting based on the selected option
    let sortedItems = [...filteredMenu];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredMenu(sortedItems);
    setCurrentPage(1); // Reset page to 1 when sorting is done
  };
  useEffect(() => {
    getMenuData();
  }, []);

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredMenu.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);
  
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      {/* header */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        <div className="py-24 flex flex-col items-center justify-center">
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious{" "}
              <span className="text-primary-hover">Food</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
              Rellenas and more for a moderate cost
            </p>
            <button className="bg-primary-hover hover:bg-darkorange font-semibold btn text-white px-8 py-3 rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>
      {/* menu content */}
      <div className="container mx-auto ">
        {/* Filtering & Sorting */}
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* category buttons */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4  flex-wrap">
            <button
              onClick={() => getFilterdData("all")}
              className={selectedCategory === "all" ? "text-darkorange" : ""}
            >
              All
            </button>
            <button
              onClick={() => getFilterdData("salad")}
              className={selectedCategory === "salad" ? "text-darkorange" : ""}
            >
              Salad
            </button>
            <button
              onClick={() => getFilterdData("pizza")}
              className={selectedCategory === "pizza" ? "text-darkorange" : ""}
            >
              Pizza
            </button>
            <button
              onClick={() => getFilterdData("soup")}
              className={selectedCategory === "soup" ? "text-darkorange" : ""}
            >
              Soups
            </button>
            <button
              onClick={() => getFilterdData("dessert")}
              className={selectedCategory === "dessert" ? "text-darkorange" : ""}
            >
              Desserts
            </button>
            <button
              onClick={() => getFilterdData("drinks")}
              className={selectedCategory === "drinks" ? "text-darkorange" : ""}
            >
              Drinks
            </button>
          </div>

          {/* filter options */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2 ">
              <FaFilter className="text-white h-4 w-4" />
            </div>
            <select
              id="sort"
              onChange={(e) => handleSortMenu(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm"
            >
              <option value="default"> Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>
        <div className="meals-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentItems.map((item) => (
            <MealCard key={item._id} item={item} />
          ))}
        </div>

        {/* Pagination Controls in Separate Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
      </div>
    </div>
  );
}

export default MenuView;
