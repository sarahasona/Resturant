import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MealCard from "../components/MealCard";
import ClipLoader		 from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function MealDetail() {
  const location = useLocation();
  const { mealId } = location.state || {}; // Safely access state
  // const [mealId, setMealId] = useState(null);
  const [mealData, setMealData] = useState({});
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  // const { id } = useParams();
  const getMealData = async () => {
    try {
      setLoading(true);
      console.log(mealId)
      const response = await axios.get(
        `https://restaurant-website-dusky-one.vercel.app/menu/${mealId}	`
      );
      if (response.status == 200) {
        setMealData(response.data.menuItem);
        console.log(mealData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    // setMealId(id); // update mealId when route params change
    getMealData();
  }, [mealId, location]);
  return (
    <div className="container flex justify-center items-center mx-auto px-[24px] mt-5 min-h-[70vh]">
      {loading ? (<ClipLoader		
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        
      />):(<MealCard item={mealData} image={mealData.image?.secure_url}  showDetails={false} />)}
      
    </div>
  );
}

export default MealDetail;
