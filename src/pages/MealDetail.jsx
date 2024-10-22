import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MealCard from "../components/MealCard";
import ClipLoader from "react-spinners/ClipLoader";
import Rating from "@mui/material/Rating";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function MealDetail() {
  const location = useLocation();
  const { mealId } = location.state || {};
  const [mealData, setMealData] = useState({});
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ffffff");
  const [reviews, setReviews] = useState([]); 

  const getMealData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://restaurant-website-dusky-one.vercel.app/menu/${mealId}`
      );
      console.log(response.data); 
      if (response.status === 200) {
        setMealData(response.data.menuItem); 
        setReviews(response.data.reviews); 
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMealData(); 
  }, [mealId, location]);

  return (
    <div className="container flex flex-col justify-center items-center mx-auto px-[24px] mt-5 min-h-[70vh]">
      {loading ? (
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <MealCard item={mealData} image={mealData.image?.secure_url} showDetails={false} />

          <div className="mt-8 w-full flex flex-col items-center max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
            {reviews.length > 0 ? (
              <ul className="space-y-4">
                {reviews.map((review, index) => (
                  <li key={index} className="p-4 border rounded-lg shadow-lg">
                    <h3 className="font-semibold">{`${review.userId.firstName} ${review.userId.lastName}`}</h3>
                    <Rating name="read-only" value={review.reviewRating} readOnly />
                    <h4 className="font-bold">{review.reviewTitle}</h4>
                    <p>{review.reviewText}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews available for this meal.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MealDetail;
