import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import { useState, useContext } from "react";
import { LoginContext } from "../context/Login/Login";
function TableRow({ mealData, quantity, totalPrice, updateCart }) {
  const { removeMealFromCart,addToCart } = useContext(LoginContext);
  //   const [loading, setLoading] = useState(false);
  // remove meal from cart
  const deleteItem = () => {
    console.log(mealData._id);
    removeMealFromCart(mealData._id);
  };
  const handleDecrease = () => {
    addToCart(mealData._id,-1);

    // if (quantity > 1) {
    //   setQuantity((prevQuantity) => {
    //     const newQuantity = prevQuantity - 1;
    //     updateCart(data.id, newQuantity);
    //     return newQuantity;
    //   });
    // }
  };

  //   Increase Meal quantity in cart
  const handleIncrease = () => {
    addToCart(mealData._id,1);

    // setQuantity((prevQuantity) => {
    //   const newQuantity = prevQuantity + 1;
    //   updateCart(data.id, newQuantity);
    //   return newQuantity;
    // });
  };

  return (
    <>
      {/* <td className="border border-gray-300">{data._id}</td> */}
      <td className="border border-gray-300">{mealData.name}</td>

      <td className="border border-gray-300">
        <img
          src={mealData.image.secure_url}
          alt=""
          className="w-[100px] mx-auto rounded"
        />
      </td>
      {/* <td className="border border-gray-300">{data.id}</td> */}
      <td className="align-middle">
        <div className="flex justify-center items-center">
          <CiCircleMinus
            size={20}
            className="cursor-pointer"
            onClick={handleDecrease}
          />
          {quantity}
          <CiCirclePlus
            size={20}
            className="cursor-pointer"
            onClick={handleIncrease}
          />
        </div>
      </td>
      <td className="border border-gray-300">{totalPrice} LE</td>
      <td className="border border-gray-300">
        <MdDelete
          onClick={deleteItem}
          className="text-red-500 cursor-pointer mx-auto"
        />
      </td>
    </>
  );
}

export default TableRow;
