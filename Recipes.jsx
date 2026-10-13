import { useState } from "react";
import { Link } from "react-router-dom";
import useRecipes from "../hooks/useRecipe";

function Recipes() {
  const [search, setSearch] = useState("chicken");

  const { data, loading, error } = useRecipes(search);
  console .log ("Recipes data:",data)
  return (
    <div className="container">
      <h1>Explore Recipes 🍲</h1>

      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {loading && <div className="spinner"></div>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p>No recipes found!</p>
      )}

      <div className="recipe-grid">
        {!loading &&
          data.map((recipe) => (
            <div className="recipe-card" key={recipe.idMeal}>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
              />

              <h3>{recipe.strMeal}</h3>

              <p>{recipe.strCategory}</p>

              <Link
                to={`/recipes/${recipe.idMeal}`}
                className="btn"
              >
                View Details
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Recipes;