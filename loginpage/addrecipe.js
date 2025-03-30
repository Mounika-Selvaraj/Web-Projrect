document.addEventListener("DOMContentLoaded", function () {
    // Logout button functionality
    document.getElementById("logout-btn").addEventListener("click", function() {
        window.location.href = "index.html";
    });

    document.getElementById("recipeForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Collect form data
        const contributorName = document.getElementById("contributorName").value.trim();
        const contributorEmail = document.getElementById("contributorEmail").value.trim();
        const recipeName = document.getElementById("recipeName").value.trim();
        const recipeCategory = document.getElementById("recipeCategory").value;
        const recipeImage = document.getElementById("recipeImage").value.trim();
        const recipeRating = parseInt(document.getElementById("recipeRating").value);

        // Collect ingredients
        const ingredients = [];
        document.querySelectorAll(".ingredient-item span").forEach(item => {
            ingredients.push(item.textContent);
        });

        // Collect steps
        const steps = [];
        document.querySelectorAll(".step-item span").forEach(item => {
            steps.push(item.textContent);
        });

        // Validate required fields
        if (!contributorName || !contributorEmail || !recipeName || !recipeCategory || ingredients.length === 0 || steps.length === 0) {
            alert("Please fill in all required fields.");
            return;
        }

        // Prepare data
        const recipeData = {
            contributorName,
            contributorEmail,
            recipeName,
            recipeCategory,
            recipeImage,
            ingredients,
            steps,
            recipeRating
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/add-recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(recipeData),
            });

            const result = await response.json();
            if (result.success) {
                // Redirect to view recipes page after successful submission
                window.location.href = "viewrecipe.html";
            } else {
                alert("Error saving recipe.");
            }
        } catch (error) {
            alert("Failed to connect to the server.");
        }
    });

    // Handle ingredient addition
    document.getElementById("addIngredient").addEventListener("click", function () {
        const ingredientInput = document.getElementById("ingredientInput");
        const ingredient = ingredientInput.value.trim();
        if (ingredient) {
            const listItem = document.createElement("div");
            listItem.classList.add("ingredient-item");
            listItem.innerHTML = `<span>${ingredient}</span> <button class="remove-btn">X</button>`;
            document.getElementById("ingredients-list").appendChild(listItem);
            ingredientInput.value = "";
        }
    });

    // Handle step addition
    document.getElementById("addStep").addEventListener("click", function () {
        const stepInput = document.getElementById("stepInput");
        const step = stepInput.value.trim();
        if (step) {
            const listItem = document.createElement("div");
            listItem.classList.add("step-item");
            listItem.innerHTML = `<span>${step}</span> <button class="remove-btn">X</button>`;
            document.getElementById("steps-list").appendChild(listItem);
            stepInput.value = "";
        }
    });

    // Handle ingredient and step removal
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-btn")) {
            event.target.parentElement.remove();
        }
    });
});