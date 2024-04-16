import { NavBar } from "../components/Navbar";
import "./profile.css";
import { db } from "../firebase/config.js";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";

export const Profile = () => {
  const [recipeList, setRecipeList] = useState([]);

  const recipeCollectionRef = collection(db, "Recipes");
  useEffect(() => {
    const getRecipeList = async () => {
      //Read the date
      //Set the movie list
      try {
        const data = await getDocs(recipeCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRecipeList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getRecipeList();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="title">
        <h1 className="titletext">Profile</h1>
      </div>
      <div className="line"></div>

      <div className="profileinfo">
        <div className="email">Email:</div>

        <div className="edit">
          <button className="editbtn">Edit Profile</button>
        </div>

        <div className="signout">
          <button className="signoutbtn">Sign out</button>
        </div>
      </div>

      <div className="recent">
        <div className="recenttitle">Recent Recipes:</div>
        <div className="empty"></div>
        <div className="empty"></div>
      </div>
      <div>
        {recipeList.map((recipe) => (
          <div className="recentrecipes">
            <div className="recipe">{recipe.Title}</div>
            <div className="empty"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
