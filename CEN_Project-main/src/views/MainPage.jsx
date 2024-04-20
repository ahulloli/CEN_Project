import { NavBar } from "../components/Navbar";
import "./MainPage.css";
import React, { useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import logo from "../assets/logo.png";

function MainPage() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const searchClient = algoliasearch('SRWABPRYT8', 'b6495dafb0d8d8bdce7ce243e64a04fb'); //api key 
    const index = searchClient.initIndex('User recipe search');

    const getRecipes = async () => {
      const { hits } = await index.search(query);
      setRecipes(hits);
    };

    getRecipes();
  }, [query]);
  return (
    <div>
      <NavBar />
      <div className="maintitle">
        <img src={logo} alt="Hat" className="mainlogo" />
      </div>
        <div className = "mainline">
      </div>

      <div className="mainsearchtitle">
        <div className="empty"></div>
        <div className="searchtext">Search</div>
        <div className="empty"></div>
      </div>

      <div className="belowtitle">
        <div className="search">
        <input type="text" placeholder="Search..." value = {query} onChange={(e) => setQuery(e.target.value)}/>
        </div>
      </div>
      <div className="recipe-results">
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.objectID}>
              <h2>{recipe.Title}</h2>
              {/* Display other recipe details as needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainPage;