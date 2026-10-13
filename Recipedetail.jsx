import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Recipedetail({ favourites, addFavourite, removeFavourite }) {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        setRecipe(response.data.meals?.[0] || null);
      } catch (err) {
        setError("Unable to load recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found!</p>;
  }

  const isFavourite = favourites.some(
    (item) => item.idMeal === recipe.idMeal
  );

  const ingredients = Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;

    return {
      ingredient: recipe[`strIngredient${number}`]?.trim(),
      measure: recipe[`strMeasure${number}`]?.trim(),
    };
  }).filter((item) => item.ingredient);

  return (
    <div className="container detail-page">
      <h1>{recipe.strMeal}</h1>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="detail-image"
      />

      <p>
        <strong>Category:</strong> {recipe.strCategory}
      </p>

      <p>
        <strong>Area:</strong> {recipe.strArea}
      </p>

      <button
        className="btn"
        onClick={() =>
          isFavourite
            ? removeFavourite(recipe.idMeal)
            : addFavourite(recipe)
        }
      >
        {isFavourite ? "❤️ Remove Favourite" : "🤍 Add Favourite"}
      </button>

      <h2>Ingredients</h2>

      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>
            {item.ingredient} - {item.measure || "As needed"}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>

      <p className="instructions">
        {recipe.strInstructions}
      </p>

      {recipe.strYoutube && (
        <a
          href={recipe.strYoutube}
          target="_blank"
          rel="noreferrer"
          className="btn"
        >
          Watch Video
        </a>
      )}
    </div>
  );
}

export default Recipedetail;