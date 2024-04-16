import { NavBar } from "../components/Navbar";
import "./create.css";
import { useState } from "react";
import { db } from "../firebase/config.js";
import { collection, addDoc } from "firebase/firestore";

function Create() {
  //Submitting a recipe
  const [newRecipeTitle, setRecipeTitle] = useState("");
  const [newIngredients, setIngredients] = useState("");
  const [newMethods, setMethods] = useState("");
  const [newCooking, setCooking] = useState("");

  const recipeCollectionRef = collection(db, "Recipes");

  const onSubmitRecipe = async () => {
    try {
      await addDoc(recipeCollectionRef, {
        Title: newRecipeTitle,
        Ingredients: newIngredients,
        Method: newMethods,
        Cooking: newCooking,
      });

      setCooking("");
      setIngredients("");
      setMethods("");
      setRecipeTitle("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="title">
        <h1 className="titletext">Recipe Creation</h1>
      </div>
      <div className="line"></div>

      <div className="recentbelowtitle">
        <div className="left">
          <div className="subtitles">
            <div className="recipetitle">Recipe Name:</div>
          </div>

          <div className="searchbar">
            <input
              type="text"
              placeholder="Name..."
              classname="recipebar"
              value={newRecipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)}
            />
          </div>

          <div className="ingredients">
            <div className="titlesearch">
              <div className="ingredienttitle">Ingredients:</div>
              <input
                type="text"
                placeholder="Ingredient..."
                classname="Ingredientbar"
                value={newIngredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
              <input
                type="text"
                placeholder="Ingredient..."
                classname="Ingredientbar"
              />
              <div className="addingredient">Add Ingredient</div>
              <button className="addbutton">+</button>
            </div>
          </div>

          <div className="preparation">
            <div className="titlesearch">
              <div className="preparationtitle">Preparation: </div>
              <input
                type="text"
                placeholder="Preparation..."
                classname="Preparationbar"
                value={newMethods}
                onChange={(e) => setMethods(e.target.value)}
              />
              <input
                type="text"
                placeholder="Preparation..."
                classname="Preparationbar"
              />
              <div className="addmethod">Add Method</div>
              <button className="addbutton">+</button>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="cooking">
            <div className="subtitles">
              <div className="cookingtitle">Cooking:</div>
            </div>
            <div className="searchbar">
              <input
                type="text"
                placeholder="Cooking..."
                classname="cookingbar"
                value={newCooking}
                onChange={(e) => setCooking(e.target.value)}
              />
            </div>
          </div>

          <div className="submit">
            <button onClick={onSubmitRecipe} className="recipesubmit">
              Submit Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Create