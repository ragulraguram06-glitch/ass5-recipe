import { useEffect, useState } from "react";
import axios from "axios";

function useRecipes(query = "chicken") {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
        );
      console.log("full api response:", response.data)
        setData(response.data.meals || []);
      } catch (err) {
        setError("Failed to fetch recipes. Please try again.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [query]);

  return { data, loading, error };
}

export default useRecipes;