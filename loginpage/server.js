const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/recipeDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define Schema
const recipeSchema = new mongoose.Schema({
  contributorName: String,
  contributorEmail: String,
  recipeName: String,
  recipeCategory: String,
  recipeImage: String,
  ingredients: [String],
  steps: [String],
  recipeRating: Number
});

// Create Model
const Recipe = mongoose.model("Recipe", recipeSchema);

// API Route to Save Recipe
app.post("/add-recipe", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.json({ success: true, message: "Recipe saved successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving recipe." });
  }
});

// API Route to Get All Recipes
app.get("/get-recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ _id: -1 }); // Sort by newest first
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching recipes." });
  }
});

// API Route to Delete Recipe
app.delete("/delete-recipe/:id", async (req, res) => {
  try {
    const result = await Recipe.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ success: true, message: "Recipe deleted successfully." });
    } else {
      res.status(404).json({ success: false, message: "Recipe not found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting recipe." });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));