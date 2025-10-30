// import React, { useState } from 'react';
// import './App.css'; // Make sure you have your CSS file for styling

// function App() {
//   const [ingredient, setIngredient] = useState('');
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const appId = 'your_app_id_here'; // Replace 'your_app_id_here' with your actual Edamam API App ID
//   const appKey = 'your_app_key_here'; // Replace 'your_app_key_here' with your actual Edamam API App Key

//   const handleSearch = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`https://api.edamam.com/api/recipes/v2?q=${ingredient}&app_id=${appId}&app_key=${appKey}`);
//       const data = await response.json();
//       setRecipes(data.hits || []); // Ensure that data.hits is initialized correctly
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="background">
//       <div className="content">
//         <h1>Search for Recipes by Ingredient</h1>
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Enter ingredient..."
//             value={ingredient}
//             onChange={(e) => setIngredient(e.target.value)}
//           />
//           <button onClick={handleSearch} disabled={loading}>
//             {loading ? 'Searching...' : 'Search'}
//           </button>
//         </div>
//         <div id="recipeDetails">
//           {recipes.map((recipe, index) => (
//             <div key={index} className="recipe">
//               <h2>{recipe.recipe.label}</h2>
//               <p>Ingredients: {recipe.recipe.ingredientLines.join(', ')}</p>
//               <p>Process: Fetch process details from Edamam Recipe API</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   const [ingredient, setIngredient] = useState("");
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSearch = async () => {
//     if (!ingredient.trim()) {
//       setError("Please enter at least one ingredient.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setRecipes([]);

//     try {
//       // Split multiple ingredients (e.g., "chicken, tomato")
//       const ingredientsArray = ingredient
//         .split(",")
//         .map((item) => item.trim().toLowerCase())
//         .filter((i) => i);

//       // Fetch all recipes (ThemealDB allows blank 's=' for all)
//       const res = await fetch(
//         "https://www.themealdb.com/api/json/v1/1/search.php?s="
//       );
//       const data = await res.json();

//       if (!data.meals) {
//         setError("No recipes found.");
//         setLoading(false);
//         return;
//       }

//       // Filter recipes locally by checking all ingredient fields
//       const filtered = data.meals.filter((meal) =>
//         ingredientsArray.every((ing) =>
//           Object.keys(meal)
//             .filter((key) => key.startsWith("strIngredient") && meal[key])
//             .some((key) => meal[key].toLowerCase().includes(ing))
//         )
//       );

//       setRecipes(filtered);

//       if (filtered.length === 0) {
//         setError("No recipes found with all those ingredients.");
//       }
//     } catch (err) {
//       console.error("Error fetching recipes:", err);
//       setError("Failed to fetch recipes. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="background">
//       <div className="content">
//         <h1>🍲 Recipe Finder by Ingredient</h1>
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Enter ingredient(s), e.g. chicken, tomato"
//             value={ingredient}
//             onChange={(e) => setIngredient(e.target.value)}
//           />
//           <button onClick={handleSearch} disabled={loading}>
//             {loading ? "Searching..." : "Search"}
//           </button>
//         </div>

//         {error && <p className="error">{error}</p>}

//         <div id="recipeDetails" className="recipe-grid">
//           {loading && <p>Loading recipes...</p>}
//           {!loading && recipes.length === 0 && !error && (
//             <p>Type ingredients and click search!</p>
//           )}

//           {recipes.map((recipe, index) => (
//             <div key={index} className="recipe-card">
//               <img
//                 src={recipe.strMealThumb}
//                 alt={recipe.strMeal}
//                 className="recipe-image"
//               />
//               <div className="recipe-info">
//                 <h2>{recipe.strMeal}</h2>
//                 <a
//                   href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Recipe →
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   const [ingredient, setIngredient] = useState("");
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSearch = async () => {
//     if (!ingredient.trim()) {
//       setError("Please enter at least one ingredient.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setRecipes([]);

//     try {
//       // Split and clean up ingredients (e.g., "chicken, tomato")
//       const ingredientsArray = ingredient
//         .split(",")
//         .map((item) => item.trim().toLowerCase())
//         .filter((i) => i);

//       // Fetch a list of all meals (using search.php?s= to get everything)
//       const res = await fetch(
//         "https://www.themealdb.com/api/json/v1/1/search.php?s="
//       );
//       const data = await res.json();

//       if (!data.meals) {
//         setError("No recipes found.");
//         setLoading(false);
//         return;
//       }

//       // ✅ Filter locally — only recipes that have ALL requested ingredients
//       const filtered = data.meals.filter((meal) => {
//         // Extract ingredient list from the meal (1-20 possible)
//         const ingredientsList = Object.keys(meal)
//           .filter((key) => key.startsWith("strIngredient") && meal[key])
//           .map((key) => meal[key].toLowerCase());

//         // Must include *all* input ingredients
//         return ingredientsArray.every((ing) =>
//           ingredientsList.some((item) => item.includes(ing))
//         );
//       });

//       setRecipes(filtered);

//       if (filtered.length === 0) {
//         setError("No recipes found with all those ingredients.");
//       }
//     } catch (err) {
//       console.error("Error fetching recipes:", err);
//       setError("Failed to fetch recipes. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="background">
//       <div className="content">
//         <h1>🍲 Recipe Finder by Ingredient</h1>
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Enter ingredient(s), e.g. chicken, tomato"
//             value={ingredient}
//             onChange={(e) => setIngredient(e.target.value)}
//           />
//           <button onClick={handleSearch} disabled={loading}>
//             {loading ? "Searching..." : "Search"}
//           </button>
//         </div>

//         {error && <p className="error">{error}</p>}

//         <div id="recipeDetails" className="recipe-grid">
//           {loading && <p>Loading recipes...</p>}
//           {!loading && recipes.length === 0 && !error && (
//             <p>Type ingredients and click search!</p>
//           )}

//           {recipes.map((recipe) => (
//             <div key={recipe.idMeal} className="recipe-card">
//               <img
//                 src={recipe.strMealThumb}
//                 alt={recipe.strMeal}
//                 className="recipe-image"
//               />
//               <div className="recipe-info">
//                 <h2>{recipe.strMeal}</h2>
//                 <a
//                   href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Recipe →
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import "./App.css";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [visible, setVisible] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!ingredient.trim()) {
      setError("Please enter at least one ingredient.");
      return;
    }

    setLoading(true);
    setError("");
    setRecipes([]);
    setVisible(6);

    try {
      const ingredientsArray = ingredient
        .split(",")
        .map((item) => item.trim().toLowerCase())
        .filter((i) => i);

      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      const data = await res.json();

      if (!data.meals) {
        setError("No recipes found.");
        setLoading(false);
        return;
      }

      const filtered = data.meals.filter((meal) => {
        const ingredientsList = Object.keys(meal)
          .filter((key) => key.startsWith("strIngredient") && meal[key])
          .map((key) => meal[key].toLowerCase());

        return ingredientsArray.every((ing) =>
          ingredientsList.some((item) => item.includes(ing))
        );
      });

      setRecipes(filtered);
      if (filtered.length === 0) {
        setError("No recipes found with all those ingredients.");
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background">
      <div className="content">
        <h1>🍲 Recipe Finder by Ingredient</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Enter ingredient(s), e.g. chicken, tomato"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        <div id="recipeDetails" className="recipe-grid">
          {loading && <p>Loading recipes...</p>}
          {!loading && recipes.length === 0 && !error && (
            <p>Type ingredients and click search!</p>
          )}

          {recipes.slice(0, visible).map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="recipe-image"
              />
              <div className="recipe-info">
                <h2>{recipe.strMeal}</h2>
                <a
                  href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Recipe →
                </a>
              </div>
            </div>
          ))}
        </div>

        {recipes.length > visible && (
          <div className="load-more-container">
            <button
              className="load-more-btn"
              onClick={() => setVisible(visible + 6)}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
