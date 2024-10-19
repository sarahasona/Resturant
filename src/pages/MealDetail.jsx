import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MealCard from "../components/MealCard";
function MealDetail() {
  const location = useLocation();
  const { mealId } = location.state || {}; // Safely access state
  // const [mealId, setMealId] = useState(null);
  const [mealData, setMealData] = useState({});
  // const { id } = useParams();
  const getMealData = async () => {
    try {
      console.log(mealId)
      const response = await axios.get(
        `https://restaurant-website-dusky-one.vercel.app/menu/${mealId}	`
      );
      if (response.status == 200) {
        setMealData(response.data.menuItem);
        console.log(mealData)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // setMealId(id); // update mealId when route params change
    getMealData();
  }, [mealId, location]);
  return (
    <div className="container flex justify-center items-center mx-auto px-[24px] mt-10">
      <MealCard item={mealData} image={mealData.image?.secure_url}  showDetails={false} />
    </div>
  );
}

export default MealDetail;
