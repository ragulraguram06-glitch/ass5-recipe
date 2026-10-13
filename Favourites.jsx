import { Link } from "react-router-dom";

function Favourites({ favourites, removeFavourite }) {
  return (
    <div className="container">
      <h1>❤️ My Favourite Recipes</h1>

      {favourites.length === 0 ? (
        <p>No favourite recipes added yet!</p>
      ) : (
        <div className="recipe-grid">
          {favourites.map((recipe) => (
            <div className="recipe-card" key={recipe.idMeal}>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
              />

              <h3>{recipe.strMeal}</h3>

              <Link
                to={`/recipes/${recipe.idMeal}`}
                className="btn"
              >
                View Details
              </Link>

              <button
                className="remove-btn"
                onClick={() => removeFavourite(recipe.idMeal)}
              >
                Remove Favourite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;