document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const formOpenBtn = document.querySelector("#form-open"),
          home = document.querySelector(".home"),
          formContainer = document.querySelector(".form_container"),
          formClose = document.querySelector(".form_close"),
          signupBtn = document.querySelector("#signup"),
          loginBtn = document.querySelector("#login"),
          pwShowHide = document.querySelectorAll(".pw_hide"),
          loginForm = document.querySelector("#loginForm"),
          signupForm = document.querySelector("#signupForm"),
          logoutBtn = document.querySelector("#logout-btn"),
          addRecipeLink = document.querySelector("#addRecipeLink"),
          viewRecipesLink = document.querySelector("#viewRecipesLink"),
          recipesSection = document.querySelector("#recipesSection"),
          recipesContainer = document.querySelector("#recipesContainer");

    // User database (in a real app, this would be a backend database)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user is already logged in
    checkLoginStatus();

    // Form open/close toggle
    formOpenBtn.addEventListener("click", () => {
        home.classList.add("show");
        recipesSection.style.display = "none";
    });
    formClose.addEventListener("click", () => home.classList.remove("show"));

    // Add Recipe link click handler
    addRecipeLink.addEventListener("click", function(e) {
        e.preventDefault();
        if (!isLoggedIn()) {
            home.classList.add("show");
            document.getElementById("loginError").textContent = "Please login to add recipes";
            document.getElementById("loginError").style.display = "block";
            recipesSection.style.display = "none";
        } else {
            window.location.href = "addrecipe.html";
        }
    });

    // View Recipes link click handler
    viewRecipesLink.addEventListener("click", function(e) {
        e.preventDefault();
        home.classList.remove("show");
        recipesSection.style.display = "block";
        loadRecipes();
    });

    // Logout button click handler
    logoutBtn.addEventListener("click", function() {
        localStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('loggedInUser');
        checkLoginStatus();
        home.classList.remove("show");
        recipesSection.style.display = "none";
    });

    // Toggle between login and signup forms
    signupBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.add("active");
        document.getElementById("loginError").style.display = "none";
    });
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.remove("active");
        document.getElementById("signupError").style.display = "none";
    });

    // Show/hide password
    pwShowHide.forEach(icon => {
        icon.addEventListener("click", () => {
            let getPwInput = icon.parentElement.querySelector("input");
            if(getPwInput.type === "password") {
                getPwInput.type = "text";
                icon.classList.replace("uil-eye-slash", "uil-eye");
            } else {
                getPwInput.type = "password";
                icon.classList.replace("uil-eye", "uil-eye-slash");
            }
        });
    });

    // Login form submission
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const rememberMe = document.getElementById("check").checked;
        
        const user = users.find(user => user.email === email && user.password === password);
        
        if(user) {
            // Successful login
            if(rememberMe) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
            } else {
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            }
            
            checkLoginStatus();
            home.classList.remove("show");
            loginForm.reset();
        } else {
            // Failed login
            document.getElementById("loginError").textContent = "Invalid email or password. Please try again or sign up.";
            document.getElementById("loginError").style.display = "block";
        }
    });

    // Signup form submission
    signupForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        
        // Reset error messages
        document.getElementById("signupError").style.display = "none";
        document.getElementById("signupSuccess").style.display = "none";
        
        // Validation
        if(password !== confirmPassword) {
            document.getElementById("signupError").textContent = "Passwords do not match!";
            document.getElementById("signupError").style.display = "block";
            return;
        }
        
        if(users.some(user => user.email === email)) {
            document.getElementById("signupError").textContent = "Email already exists! Please login.";
            document.getElementById("signupError").style.display = "block";
            return;
        }
        
        // Create new user
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Show success message
        document.getElementById("signupSuccess").textContent = "Account created successfully! Please login.";
        document.getElementById("signupSuccess").style.display = "block";
        
        // Clear form
        signupForm.reset();
        
        // Switch to login form after 2 seconds
        setTimeout(() => {
            formContainer.classList.remove("active");
            document.getElementById("signupSuccess").style.display = "none";
        }, 2000);
    });

    // Function to load recipes
    async function loadRecipes() {
        try {
            const response = await fetch('http://localhost:5000/api/recipes');
            const recipes = await response.json();
            
            recipesContainer.innerHTML = '';
            
            if (recipes.length === 0) {
                recipesContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: white;">No recipes found. Be the first to add one!</p>';
                return;
            }
            
            recipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.className = 'recipe-card';
                recipeCard.innerHTML = `
                    <img src="${recipe.image || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${recipe.name}" class="recipe-image">
                    <div class="recipe-content">
                        <h3 class="recipe-title">${recipe.name}</h3>
                        <span class="recipe-category">${recipe.category}</span>
                        <p class="recipe-author">By ${recipe.author || 'Anonymous'}</p>
                        <div class="recipe-rating">
                            ${'★'.repeat(recipe.rating || 3)}${'☆'.repeat(5 - (recipe.rating || 3))}
                        </div>
                        <a href="#" class="view-more-btn">View Details</a>
                    </div>
                `;
                recipesContainer.appendChild(recipeCard);
            });
        } catch (error) {
            console.error('Error loading recipes:', error);
            recipesContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: white;">Error loading recipes. Please try again later.</p>';
        }
    }

    // Function to check login status
    function checkLoginStatus() {
        const loggedInUser = localStorage.getItem('loggedInUser') || sessionStorage.getItem('loggedInUser');
        if (loggedInUser) {
            formOpenBtn.style.display = "none";
            logoutBtn.style.display = "block";
        } else {
            formOpenBtn.style.display = "block";
            logoutBtn.style.display = "none";
        }
    }

    // Function to check if user is logged in
    function isLoggedIn() {
        return localStorage.getItem('loggedInUser') || sessionStorage.getItem('loggedInUser');
    }
});