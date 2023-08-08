import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

const StyledButton = styled.button`
  border-radius: 50px;

  @media (max-width: 480px) {
    width: 160px;
    height: 32px;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    width: 160px;
    height: 36px;
  }
  
  width: 150px;
  height: 36px;
  background-color: #090580;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const CreateRecipeHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 30px 0;
  font-weight: bold;
  color: #090580;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 50vw;

  @media (max-width: 600px) {
    width: 100vw;
    padding-left: 30px;
  }
`;

const StyledLabel = styled.label`
  color: #FF2171;
  font-size: 20px;
  margin: 10px 0;
`;

const StyledInput = styled.input`
  width: 70%;
  border: 1px solid #090580;
  outline: none;

  @media (max-width: 600px) {
    width: 80%;
  }
`;

const StyledTextArea = styled.textarea`
  width: 72%;
  border: 1px solid #090580;
  outline: none;
  border-radius: 4px;

  @media (max-width: 600px) {
    width: 84%;
  }
`;

const GifDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;

  @media (max-width: 600px) {
    display: none;
  }

`;

const CreateRecipes = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    createdBy: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://careful-wrap-crab.cyclic.app/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <CreateRecipeHeading>Create Recipe</CreateRecipeHeading>
      <Container>
        <GifDiv>
          <img src="https://i.giphy.com/media/lGbz7CsaCj4Tm/giphy.webp" />
        </GifDiv>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel htmlFor="name">Name</StyledLabel>
          <StyledInput
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
          <StyledLabel htmlFor="description">Description</StyledLabel>
          <StyledTextArea
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
          ></StyledTextArea>
          <StyledLabel htmlFor="ingredients">Ingredients</StyledLabel>
          {recipe.ingredients.map((ingredient, index) => (
            <StyledInput
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
              style={{ margin: '10px 0 '}}
            />
          ))}
          <StyledButton type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </StyledButton>
          <StyledLabel htmlFor="instructions">Instructions</StyledLabel>
          <StyledTextArea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          ></StyledTextArea>
          <StyledLabel htmlFor="imageUrl">Image URL</StyledLabel>
          <StyledInput
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
          <StyledLabel htmlFor="cookingTime">Cooking Time (minutes)</StyledLabel>
          <StyledInput
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
          <StyledButton type="submit">Create Recipe</StyledButton>
        </StyledForm>
      </Container>
    </div>
  );
};

export default CreateRecipes;