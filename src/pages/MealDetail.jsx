import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MealCard from "../components/MealCard";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { LoginContext } from "../context/Login/Login";
function MealDetail() {
  const location = useLocation();
  const { mealId } = location.state || {}; // Safely access state
  const [mealData, setMealData] = useState({});
  let [loading, setLoading] = useState(true);
  const { favouritList, setFavouriteList, getAllFavourit } =
    useContext(LoginContext);
  const getMealData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://restaurant-website-dusky-one.vercel.app/menu/${mealId}	`
      );
      if (response.status == 200) {
        setMealData(response.data.menuItem);
        setLoading(false);
      }
    } catch (error) {
      toast.error("error fetching meal", error);
      setMealData({});
      setLoading(false);
    }
  };
  useEffect(() => {
    getMealData();
  }, [mealId, location]);
  // favourite
  useEffect(() => {
    getAllFavourit();
  }, []);
  return (
    <div className="container flex justify-center items-center mx-auto px-[24px] mt-5 min-h-[70vh]">
      {loading ? (
        <Spinner />
      ) : (
        <MealCard
          item={mealData}
          image={mealData.image.secure_url}
          showDetails={false}
          favourite={favouritList}
          setFavourite={setFavouriteList}
        />
      )}
    </div>
  );
}

export default MealDetail;
