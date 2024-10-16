import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MealCard from "../components/MealCard";
function MealDetail() {
  const [mealId, setMealId] = useState(null);
  const [mealData, setMealData] = useState({});
  const { id } = useParams();
  const getMealData = async () => {
    const response = await axios.get(`/menu.json`);
    const item = response.data.find((item) => item._id === id);
    // const data = await response.data;
    setMealData(item);
  };
  useEffect(() => {
    setMealId(id); // update mealId when route params change
    getMealData();
  }, [mealId]);
  return (
    <div className="container flex justify-center items-center mx-auto px-[24px] mt-10">
      <MealCard item={mealData} showDetails="false" />
    </div>
  );
}

export default MealDetail;
