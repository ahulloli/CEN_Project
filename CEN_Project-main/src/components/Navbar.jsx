import { Link } from "react-router-dom";
import "./Navbar.css";

export const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-item"></div>
      <div className="navbar-item">
        <Link to="/main">Main</Link>
      </div>
      <div className="navbar-item">
        <Link to="/create">Create</Link>
      </div>
      <div className="navbar-item">
        <Link to="/profile">Profile</Link>
      </div>
      <div className="navbar-item"></div>
    </div>
  );
};
