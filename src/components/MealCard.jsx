import { useState } from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cards = ({ item, image, showDetails, category }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  return (
    <div className="card shadow-xl relative md:my-5 rounded-xl">
      <div
        className={`rounded-full cursor-pointer z-10 rating gap-1 absolute right-0 top-0 p-4 heartStar bg-primary-hover ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <figure className="flex justify-center items-center">
        <img
          src={image}
          alt="Shoes"
          className="hover:scale-105 transition-all duration-300 md:h-72"
        />
      </figure>
      <div className="card-body px-3">
        <h2 className="card-title">{item.name}!</h2>
        <p>{item.description}</p>
        <div className="flex justify-start items-center gap-2">
          {!showDetails && item.ingredients && (
            <>
              <span className="text-label">Ingredients: </span>{" "}
              {/* Text before the map */}
              {item.ingredients.map((ele, i) => (
                <span
                  key={i}
                  className="rounded p-2 bg-darkorange text-white mr-1"
                >
                  {ele}
                </span>
              ))}
            </>
          )}
        </div>
        <div className="card-actions flex justify-between items-center mt-2 mb-4">
          <h5 className="font-semibold">
            <span className="text-sm text-red-500">LE </span> {item.price}
          </h5>

          <div className="flex gap-2 justify-center items-center">
            {showDetails ? (
              <Link
                to={`/menu/${category}/${item.name}`}
                state={{ mealId: item._id }}
              >
                <FaEye className="w-5 h-5 text-primary-hover cursor-pointer hover:text-darkorange" />
              </Link>
            ) : (
              ""
            )}

            <button className="btn bg-primary-hover text-white">
              Add to Cart{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
