import React from "react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../context/Login/Login";
import ShowItem from "./CahngeItem";
import ChangeItems from "./ChangeItems";

function Manue() {
  const [addCt, setAddCat] = useState(true);
  const { token } = useContext(LoginContext);
  const [categories, setCategories] = useState([]);
  const [item, setCatchng] = useState([]);
  const [catC, setCatC] = useState(false);
  const [refresh, setSrefresh] = useState(false);
  console.log(item);

  const allCato = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/menu
`,
        {
          headers: {
            token: `resApp ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    allCato().then((data) => {
      if (data && Array.isArray(data.allMenu)) {
        setCategories(data.allMenu);
      } else {
      }
    });
  }, []);

  return (
    <>
      {addCt ? (
        <div className="container grid grid-cols-2 justify-between items-center gap-[30px] w-[80%] h-fit m-auto relative">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <ShowItem
                key={index}
                category={category}
                setShowCay={setAddCat}
                setCatchng={setCatchng}
              />
            ))
          ) : (
            <p>Loading</p>
          )}
          <div
            className="flex justify-center flex-col self-center text-center w-[100%] h-[90%] relative"
            onClick={() => setAddCat(false)}
          >
            <h2>
              <i className="fa-solid fa-plus text-[200px] self-center"></i>
            </h2>
          </div>
        </div>
      ) : (
        <ChangeItems
          setShowCay={setAddCat}
          catC={catC}
          item={item}
          setCatC={setCatC}
          setSrefresh={setSrefresh}
          refresh={refresh}
          setCatchng={setCatchng}
        />
      )}
    </>
  );
}

export default Manue;
