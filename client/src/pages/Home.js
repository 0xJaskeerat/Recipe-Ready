import { Button } from 'antd';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { useGetUserID } from '../hooks/useGetUserID';

const StyledSaveButton = styled(Button)`
  &.ant-btn {
    border-radius: 50px;

    @media (max-width: 480px) {
      width: 120px;
      height: 32px;
    }
  
    @media (min-width: 481px) and (max-width: 768px) {
      width: 140px;
      height: 36px;
    }
  
    width: 130px;
    height: 40px;
    background-color: #fff;
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    font-size: 16px;
    color: #FF2171;
    border: none;
    cursor: pointer;
    transition: box-shadow 0.3s ease-in-out;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #FF2171;
      color: #fff !important;
    }
  }
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

const Home = () => {
  const [recipes, setRecipes] = useState();
  const [savedRecipes, setSavedRecipes] = useState();
  const [cookies, _] = useCookies(["access_token"]);

  const userId = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const allRecipes = await axios.get("https://careful-wrap-crab.cyclic.app/recipes");
        setRecipes(allRecipes.data);
      } catch (err) {
        console.log("err", err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const allSavedRecipes = await axios.get(`https://careful-wrap-crab.cyclic.app/recipes/saved/ids/${userId}`);
        setSavedRecipes(allSavedRecipes.data.savedRecipes);
      } catch (err) {
        console.log("err", err);
      }
    }

    fetchRecipe();
    if (cookies.access_token) fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeId) => {
    try {
      const allRecipes = await axios.put("https://careful-wrap-crab.cyclic.app/recipes", {
        recipeId,
        userId,
      },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(allRecipes.data.savedRecipes)
    } catch (err) {
      console.log("err", err);
    }
  }

  return (
    <div>
      {recipes?.map((recipe) => {
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
                {
                  savedRecipes?.includes(recipe._id)
                    ? <h3 style={{ color: '#090580' }}>Already Saved</h3>
                    : <StyledSaveButton onClick={() => saveRecipe(recipe._id)}>Save Recipe</StyledSaveButton>
                }
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
  );
};

export default Home;
