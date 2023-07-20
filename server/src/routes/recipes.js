import express from "express";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// to get all recipes
router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// to post a new recipe
router.post("/", async (req, res) => {
  // creating a new instance of the model
  const newRecipe = new RecipeModel(req.body);
  try {
    const response = await newRecipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// to save a recipe
router.put("/", async (req, res) => {
  // creating a new instance of the model

  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);

    user.savedRecipes.push(recipe);
    await user.save();

    res.json({ savedRecipes: user.savedRecipes});
  } catch (err) {
    res.json(err);
  }
});

router.get("/saved/ids", async (req, res) => {
    try{
        const user = await UserModel.findById(req.body.userID);
        res.json({ savedRecipes: user?.savedRecipes })
    }catch(err){
        res.json(err);
    }
})

// gettting all saved recipes
router.get("/saved", async (req, res) => {
    try{
        const user = await UserModel.findById(req.body.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $id: user.savedRecipes}
        })
        res.json({ savedRecipes })
    }catch(err){
        res.json(err);
    }
})


export { router as RecipesRouter };
