import { NavBar } from "../components/Navbar";
import "./profile.css";
import { db, auth } from "../firebase/config.js";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

export const Profile = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [loggedout, setLoggedout] = useState(false);
  const [display, setDisplay] = useState(false);

  const logout = async () => { //logout function
    try {
      await signOut(auth);
      setLoggedout(true);
    } catch (err) {
      console.log(err);
    }
  };

  const recipeCollectionRef = collection(db, "Recipes"); //accesses recipes stored in firestore db
  useEffect(() => {
    const getRecipeList = async () => {
      //function to retrievew recent recipe list
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
  //navigates back to login if logout button is pressed
  if (loggedout) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <NavBar />
      <div className="title">
        <h1 className="titletext">Profile</h1>
      </div>
      <div className="line"></div>

      <div className="profileinfo">
        <div className="email">Email: {auth.currentUser.email}</div>

        <div className="edit">
          {display == true ? (
            <button
              onClick={() => setDisplay(!display)}
              className="displayrecipe"
            >
              Hide Recipes
            </button>
          ) : (
            <button
              onClick={() => setDisplay(!display)}
              className="displayrecipe"
            >
              Display Recipes
            </button>
          )}
        </div>

        <div className="signout">
          <button onClick={logout} className="signoutbtn">
            Sign out
          </button>
        </div>
      </div>

      {!display && (
        <div className="recent">
          <div className="recenttitle">Recent Recipes:</div>
          <div className="empty"></div>
          <div className="empty"></div>
        </div>
      )}
      <div>
        {recipeList.map((recipe) => (
          <div className="recentrecipes">
            <div className="recents">
              <div className="recipe">{recipe.Title}</div>
              {display && (
                <div className="display">
                  <div>{recipe.Cooking}</div>
                  <div>{recipe.Ingredients}</div>
                  <div>{recipe.Ingredients2}</div>
                  <div>{recipe.Method}</div>
                  <div>{recipe.Method2}</div>
                </div>
              )}
            </div>
            {!display && <div className="empty"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};
