import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>🍽️ Recipe Finder</h2>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
        <NavLink to="/favourites">Favourites</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;