# RecipeBook

## Overview
RecipeBook is a restaurant-focused recipe management web application. Users can browse a variety of recipes categorized into Non-Vegetarian, Vegetarian, Drinks & Snacks, and Desserts. Additionally, users can log in, suggest recipes to the restaurant, and manage their own recipe entries.

## Features
- **Browse Recipes:** View categorized restaurant recipes.
- **User Login:** Users can log in to suggest recipes.
- **Add & Delete Recipes:** Users can add new recipes and delete their own submissions.
- **MongoDB Integration:** All recipe details are stored in a MongoDB database.
- **Responsive UI:** Well-structured navigation with a user-friendly interface.

## Folder Structure
```
RecipeBook/
│── assets/                  # Contains images and assets  
│── Nonveg/                  # Non-Vegetarian recipes  
│── Veg_menus/               # Vegetarian recipes  
│── Drink_and_snacks/        # Drinks & Snacks recipes  
│── Dessert/                 # Dessert recipes  
│── About/                   # About page  
│── LoginPage/               # User authentication & recipe management  
│── index.html               # Main entry page  
│── script.js                # Main JavaScript  
│── style.css                # Main CSS  
```

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Login system for users

## Setup Instructions

1. **Install Dependencies:**
   ```sh
   npm install
   ```
2. **Start the Server:**
   ```sh
   node server.js
   ```
3. **Access the Website:** Open `http://localhost:3000` in a browser.

## Database Configuration
- MongoDB is used to store recipe details.
- Update the MongoDB connection string in `server.js`.

## Future Enhancements
- User roles for restaurant owners & customers.
- Recipe rating & review system.
- AI-based recipe recommendations.


