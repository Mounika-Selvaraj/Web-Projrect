document.addEventListener("DOMContentLoaded", function () {
    // Load recipes when page loads
    loadRecipes();

    // Apply filters when button is clicked
    document.getElementById("apply-filters").addEventListener("click", loadRecipes);

    // Reset filters
    document.getElementById("reset-filters").addEventListener("click", function() {
        document.getElementById("filter-category").value = "";
        document.getElementById("filter-rating").value = "0";
        document.getElementById("filter-search").value = "";
        loadRecipes();
    });

    // Search as you type with debounce
    let searchTimeout;
    document.getElementById("filter-search").addEventListener("input", function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(loadRecipes, 500);
    });

    // Logout button functionality
    document.getElementById("logout-btn").addEventListener("click", function() {
        // You can add any logout logic here (like clearing session/token)
        // Then redirect to index.html
        window.location.href = "index.html";
    });
});

async function loadRecipes() {
    try {
        // Get filter values
        const category = document.getElementById("filter-category").value;
        const minRating = document.getElementById("filter-rating").value;
        const searchTerm = document.getElementById("filter-search").value.toLowerCase();

        // Fetch recipes from server
        const response = await fetch("http://127.0.0.1:5000/get-recipes");
        const recipes = await response.json();

        // Filter recipes
        let filteredRecipes = recipes;
        
        if (category) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.recipeCategory === category);
        }
        
        if (minRating > 0) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.recipeRating >= parseInt(minRating));
        }
        
        if (searchTerm) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.recipeName.toLowerCase().includes(searchTerm) ||
                recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm))
            );
        }

        // Display recipes
        displayRecipes(filteredRecipes);
    } catch (error) {
        console.error("Error loading recipes:", error);
        document.getElementById("recipes-list").innerHTML = 
            '<div class="no-recipes">Error loading recipes. Please try again later.</div>';
    }
}

function displayRecipes(recipes) {
    const recipesList = document.getElementById("recipes-list");
    
    if (recipes.length === 0) {
        recipesList.innerHTML = '<div class="no-recipes">No recipes found matching your criteria.</div>';
        return;
    }

    recipesList.innerHTML = "";
    
    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";
        
        // Create recipe HTML
        recipeCard.innerHTML = `
            <div class="recipe-header">
                <div>
                    <h2 class="recipe-title">${recipe.recipeName}</h2>
                    <span class="recipe-category">${recipe.recipeCategory}</span>
                    <span class="recipe-rating">${'★'.repeat(recipe.recipeRating)}${'☆'.repeat(5 - recipe.recipeRating)}</span>
                </div>
                <div class="recipe-contributor">By ${recipe.contributorName}</div>
            </div>
            <div class="recipe-body">
                ${recipe.recipeImage ? 
                    `<div class="recipe-image" style="background-image: url('${recipe.recipeImage}')"></div>` : 
                    '<div class="recipe-image" style="background: #eee; display: flex; align-items: center; justify-content: center; color: #999;">No Image</div>'}
                <div class="recipe-details">
                    <div class="recipe-section recipe-ingredients">
                        <h3>Ingredients</h3>
                        <ul>
                            ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join("")}
                        </ul>
                    </div>
                    <div class="recipe-section recipe-steps">
                        <h3>Preparation Steps</h3>
                        <ol>
                            ${recipe.steps.map(step => `<li>${step}</li>`).join("")}
                        </ol>
                    </div>
                </div>
            </div>
            <div class="recipe-actions">
                <button class="delete-btn" data-id="${recipe._id}">Delete Recipe</button>
            </div>
        `;
        
        recipesList.appendChild(recipeCard);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function() {
            const recipeId = this.getAttribute("data-id");
            if (confirm("Are you sure you want to delete this recipe?")) {
                deleteRecipe(recipeId);
            }
        });
    });
}

async function deleteRecipe(recipeId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/delete-recipe/${recipeId}`, {
            method: "DELETE"
        });
        
        const result = await response.json();
        if (result.success) {
            loadRecipes(); // Refresh the list
        } else {
            alert("Error deleting recipe.");
        }
    } catch (error) {
        console.error("Error deleting recipe:", error);
        alert("Failed to delete recipe. Please try again.");
    }
}