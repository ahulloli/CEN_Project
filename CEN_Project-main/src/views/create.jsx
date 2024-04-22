import { NavBar } from "../components/Navbar";
import "./create.css";
import { useState } from "react";
import { db } from "../firebase/config.js";
import { collection, addDoc } from "firebase/firestore";
import recipelogo from "../assets/recipelogo.png";
import algoliasearch from 'algoliasearch';

const recipeCollectionRef = collection(db, "Recipes");


function Create() {
  //Submitting a recipe
  const searchClient = algoliasearch('SRWABPRYT8', '81fab4560b2871b0f748495bfe193b99'); //api key
  const index = searchClient.initIndex('User recipe search');

  index.setSettings({
    attributesToIndex: ['Title', 'Ingredients'],
    attributesForFaceting: ['filterOnly(Method)', 'filterOnly(Cooking)']
  });

  const [newRecipeTitle, setRecipeTitle] = useState("");
  const [newIngredients, setIngredients] = useState([]);
  const [newMethods, setMethods] = useState([]);
  const [newCooking, setCooking] = useState("");
  const recipeCollectionRef = collection(db, "Recipes");

  const objects = [{
    firstname: 'Jimmie',
    lastname: 'Barninger',
    objectID: 'myID1'
  }, {
    firstname: 'Warren',
    lastname: 'Speach',
    objectID: 'myID2'
  }];

  const onSubmitRecipe = async () => {
    try {
      const docRef = await addDoc(recipeCollectionRef, {
        Title: newRecipeTitle,
        Ingredients: newIngredients,
        Method: newMethods,
        Cooking: newCooking,
      });
  
      setCooking("");
      setIngredients([]);
      setMethods([]);
      setRecipeTitle("");
  
      // Access the ID of the newly created document
      const recipeID = docRef.id;
      // Save the object to Algolia index
      await index.saveObject({
        objectID: recipeID,
        Title: newRecipeTitle,
        Ingredients: newIngredients,
        Method: newMethods,
        Cooking: newCooking,
      });
      
    // Any other requestOptions
  }
    catch (err) {
      console.error('Error Error:', err);
    }
  };
  //handlers added to allow for more than two ingredients and handlers
  const handleNewIngredient = () => {
    setIngredients([...newIngredients, ""]);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredientsArray = [...newIngredients]; //uses an array so multiple values can be stored
    newIngredientsArray[index] = value;
    setIngredients(newIngredientsArray);
  };

  const handleNewMethod = () => {
    setMethods([...newMethods, ""]);
  };

  const handleMethodChange = (index, value) => {
    const newMethodsArray = [...newMethods]; //uses an array so multiple values can be stored
    newMethodsArray[index] = value;
    setMethods(newMethodsArray);
  };

  //render function
  return (
    <div>
      <NavBar />
      <div className="title">
        <img src={recipelogo} className="recipelogo" alt="recipelogo" />
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
              className="recipebar"
              value={newRecipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)}
            />
          </div>

          <div className="ingredients">
            <div className="titlesearch">
              <div className="ingredienttitle">Ingredients:</div>
              {newIngredients.map((ingredient, ingredientNumber) => (
                <input
                  key={ingredientNumber}
                  type="text"
                  placeholder="Enter Ingredient"
                  className="Ingredientbar"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(ingredientNumber, e.target.value)}
                />
              ))}
              <button className="addbutton" onClick={handleNewIngredient}>+</button>
            </div>
          </div>

          <div className="preparation">
            <div className="titlesearch">
              <div className="preparationtitle">Preparation: </div>
              {newMethods.map((method, prepNumber) => (
                <input
                  key={prepNumber}
                  type="text"
                  placeholder="Enter Preparation"
                  className="Preparationbar"
                  value={method}
                  onChange={(e) => handleMethodChange(prepNumber, e.target.value)}
                />
              ))}
              <button className="addbutton" onClick={handleNewMethod}>+</button>
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
                className="cookingbar"
                value={newCooking}
                onChange={(e) => setCooking(e.target.value)}
              />
            </div>
            <div className="submit" style={{ marginLeft: '55px' }}>
            <button onClick={onSubmitRecipe} className="recipesubmit">
              Submit Recipe
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;