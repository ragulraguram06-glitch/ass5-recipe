import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/Recipedetail";
import Favourites from "./pages/Favourites";

import "./App.css";

function App() {
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem("favourites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "favourites",
      JSON.stringify(favourites)
    );
  }, [favourites]);

  const addFavourite = (recipe) => {
    setFavourites((previous) => {
      const exists = previous.some(
        (item) => item.idMeal === recipe.idMeal
      );

      if (exists) {
        return previous;
      }

      return [...previous, recipe];
    });
  };

  const removeFavourite = (id) => {
    setFavourites((previous) =>
      previous.filter((item) => item.idMeal !== id)
    );
  };

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/recipes" element={<Recipes />} />

        <Route
          path="/recipes/:id"
          element={
            <RecipeDetail
              favourites={favourites}
              addFavourite={addFavourite}
              removeFavourite={removeFavourite}
            />
          }
        />

        <Route
          path="/favourites"
          element={
            <Favourites
              favourites={favourites}
              removeFavourite={removeFavourite}
            />
          }
        />

        <Route
          path="*"
          element={<h2 className="not-found">404 - Page Not Found</h2>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;