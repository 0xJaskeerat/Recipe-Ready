import { Button } from 'antd';
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetUserID } from '../hooks/useGetUserID';

const StyledSaveButton = styled(Button)`
  background-color: #000;
  color: #fff;
  margin: 5px 0;
`;

const Home = () => {
  const [recipes, setRecipes] = useState();
  const [savedRecipes , setSavedRecipes] = useState();

  const userId = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const allRecipes = await axios.get("http://localhost:4000/recipes");
        setRecipes(allRecipes.data);
      } catch (err) {
        console.log("err", err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const allSavedRecipes = await axios.get(`http://localhost:4000/recipes/saved/ids/${userId}`);
        setSavedRecipes(allSavedRecipes.data.savedRecipes);
      } catch (err) {
        console.log("err", err);
      }
    }
    
    fetchRecipe();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeId) => {
    try {
      const allRecipes = await axios.put("http://localhost:4000/recipes", { recipeId, userId });
      setSavedRecipes(allRecipes.data.savedRecipes)
    } catch (err) {
      console.log("err", err);
    }
  }

  return (
    <div>
      {recipes?.map((recipe) => {
        return (
          <div key={recipe._id}>
            <h1>{recipe.name}</h1>
            {
              savedRecipes?.includes(recipe._id)
              ? <h3 style={{ color: 'red'}}>Already Saved</h3>
              : <StyledSaveButton onClick={() => saveRecipe(recipe._id)}>Save Recipe</StyledSaveButton>
            }
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
  );
};

export default Home;
