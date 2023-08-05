import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGetUserID } from '../hooks/useGetUserID';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userId = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const allSavedRecipes = await axios.get(`https://careful-wrap-crab.cyclic.app/recipes/saved/${userId}`);
        setSavedRecipes(allSavedRecipes.data.savedRecipes);
      } catch (err) {
        console.log("err", err);
      }
    }
    
    fetchSavedRecipes();

    fetchSavedRecipes();
  }, []);

  return (
    <div>
      <h1>Saved Recipes</h1>
      {savedRecipes?.map((recipe) => {
        return (
          <div key={recipe._id}>
            <h1>{recipe.name}</h1>
            <div><img src={recipe.imageUrl} /></div>
            <h3>{recipe.description}</h3>
            <h2>Ingredients</h2>
            <div>
              {recipe.ingredients.map((ingredient) => (
                <li>{ingredient}</li>
              ))}
            </div>
            <h2> Instructions </h2>
            <h4>{recipe.instructions}</h4>
            <h2> Cooking Time </h2>
            <h4>{recipe.cookingTime} minutes</h4>
          </div>
        );
      })}
    </div>
  )
}

export default SavedRecipes