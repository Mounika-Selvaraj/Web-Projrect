document.addEventListener("DOMContentLoaded", () => {
    fetchRecipes();
    
    // Filter Functionality
    document.getElementById("category").addEventListener("change", filterRecipes);
});

// Fetch Recipes from JSON
async function fetchRecipes() {
    const response = await fetch("dessert.json");
    const recipes = await response.json();
    displayRecipes(recipes);
}

// Display Recipes in Grid
function displayRecipes(recipes) {
    const recipeGrid = document.getElementById("recipeGrid");
    recipeGrid.innerHTML = "";
    
    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p>⭐ ${recipe.rating}</p>
        `;
        recipeCard.addEventListener("click", () => openRecipeDetails(recipe));
        recipeGrid.appendChild(recipeCard);
    });
}

// Filter Recipes by Category
async function filterRecipes() {
    const category = document.getElementById("category").value;
    const response = await fetch("dessert.json");
    let recipes = await response.json();

    if (category !== "all") {
        recipes = recipes.filter(recipe => recipe.category === category);
    }

    displayRecipes(recipes);
}

// Open Recipe Details
function openRecipeDetails(recipe) {
    document.getElementById("recipeTitle").textContent = recipe.name;
    document.getElementById("recipeImage").src = recipe.image;
    document.getElementById("recipeIngredients").textContent = recipe.ingredients.join(", ");
    document.getElementById("recipeRating").textContent = recipe.rating;
    document.getElementById("recipePreparation").textContent = recipe.preparation;

    const detailsSection = document.getElementById("recipeDetails");
    detailsSection.style.display = "block"; // Show Details
}

// Close Recipe Details
function closeRecipeDetails() {
    document.getElementById("recipeDetails").style.display = "none";
}
