import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGetUserID } from '../hooks/useGetUserID';
import styled from "styled-components";

const SavedRecipeHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 30px 0;
  font-weight: bold;
  color: #090580;
`;

const EachRecipe = styled.div`
  @media (min-width: 768px) {
    display: flex;
    width: 100vw;
  }
  margin: 20px 0;
`;

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const InfoDiv = styled.div`
  display: flex;
  align-content: center;
  flex-direction: column;
  padding: 10px;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const RecipeHeader = styled.div`
  display: flex;
  align-items: center;
`;

const RecipeName = styled.p`
  @media (min-width: 768px) {
    font-size: 28px;
  }
  font-size: 20px;
  font-weight: bold;
  margin:0;
  margin-right: 20px;
  color: #FF2171;
`;

const RecipeBulletPoints = styled.p`
  @media (min-width: 768px) {
    font-size: 18px;
  }
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
`;

const RecipeBulletPointsContext = styled.p`
  @media (min-width: 768px) {
    font-size: 18px;
  }
  font-size: 16px;
  margin: 10px 0;
`;

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
  }, []);

  return (
    <div>
      <SavedRecipeHeading>Saved Recipes</SavedRecipeHeading>
      {savedRecipes?.map((recipe) => {
        return (
          <EachRecipe key={recipe._id}>

            {/* recipe image div */}
            <ImageDiv>
              <img src={recipe.imageUrl} />
            </ImageDiv>

            {/* recipe info div */}
            <InfoDiv>

              {/* name and save button */}
              <RecipeHeader>
                <RecipeName>{recipe.name}</RecipeName>
              </RecipeHeader>

              {/* recipe description */}
              {
                recipe?.description &&
                <>
                  <RecipeBulletPoints>Description : </RecipeBulletPoints>
                  <RecipeBulletPointsContext>{recipe.description}</RecipeBulletPointsContext>
                </>
              }

              {/* recipe ingredients */}
              <RecipeBulletPoints>Ingredients : </RecipeBulletPoints>
              <RecipeBulletPointsContext>
                {recipe.ingredients.map((ingredient, index) => (
                  <span key={index}>
                    {ingredient}
                    {index < recipe.ingredients.length - 1 && ', '} 
                  </span>
                ))}
              </RecipeBulletPointsContext>

              {/*  recipe instructions */}
              <RecipeBulletPoints>Instructions : </RecipeBulletPoints>
              <RecipeBulletPointsContext>{recipe.instructions}</RecipeBulletPointsContext>

               {/*  recipe cooking time */}
              <RecipeBulletPoints>Cooking Time : </RecipeBulletPoints>
              <RecipeBulletPointsContext>{recipe.cookingTime} minutes</RecipeBulletPointsContext>
            </InfoDiv>
          </EachRecipe>
        );
      })}
    </div>
  )
}

export default SavedRecipes