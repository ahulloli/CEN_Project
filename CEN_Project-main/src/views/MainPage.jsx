import React, { useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { NavBar } from "../components/Navbar";
import "./MainPage.css";
import logo from "../assets/logo.png";

function MainPage() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to hold the selected recipe details
  //accesses algolia search api to enable search functionality, its OK for this key to be public
  const searchClient = algoliasearch('SRWABPRYT8', 'b6495dafb0d8d8bdce7ce243e64a04fb');
  const index = searchClient.initIndex('User recipe search');

  useEffect(() => { 
    const getRecipes = async () => {
      if (query.trim() === '') {
        setRecipes([]);
        return;
      }
      const { hits } = await index.search(query); //searches algolia
      setRecipes(hits);
    };

    getRecipes();
  }, [query]);

  // Function to handle click on a recipe hit
  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div>
      <NavBar />
      <div className="maintitle">
        <img src={logo} alt="Hat" className="mainlogo" />
      </div>
      <div className="mainline"></div>
      <div className="mainsearchtitle">
        <div className="empty"></div>
        <div className="searchtext">Search</div>
        <div className="empty"></div>
      </div>
      <div className="belowtitle">
        <div className="search">
          <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>
      <div className="recipe-results" style={{ marginLeft: '150px' }}>
        <ul> 
          {recipes.map(recipe => (
            <li key={recipe.objectID} onClick={() => handleRecipeSelect(recipe)}>
              <h2>{recipe.Title}</h2>
              <p>Ingredients: {recipe.Ingredients.join(", ")}</p>
              <p>Method: {recipe.Method.join(", ")}</p>
              <p>Cooking: {recipe.Cooking}</p>
            </li>
          ))}
        </ul>
      </div>
      {selectedRecipe && (
        <div className="selected-recipe-details" style={{ marginLeft: '25px'}}>
          <h2>{selectedRecipe.Title}</h2>
          <p>Ingredients: {selectedRecipe.Ingredients.join(", ")}</p>
          <p>Method: {selectedRecipe.Method.join(", ")}</p>
          <p>Cooking: {selectedRecipe.Cooking}</p>
        </div>
      )}
    </div>
  );
}

export default MainPage;
