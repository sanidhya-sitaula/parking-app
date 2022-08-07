import React from "react";
import { Link } from "react-router-dom";
import { handleLogin, handleLogout } from "../functions";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const { userDetails } = props;
  const navigate = useNavigate();
  const handleLogOutClick = async () => {
    await handleLogout();
    window.location.reload();
  };

  return (
    <div className="navbar">
      <ul className="navbar-ul">
        <li className="menu-item">
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/about" className="link">
            About
          </Link>
        </li>
      </ul>
      <ul className="navbar-user-info">
        {userDetails ? (
          <>
          <li className = "menu-item2">
            <Link to = "/add_spot" className = "link">Add Spot</Link>
          </li>
          <li className="menu-item2">
            <a className="link" onClick={() => handleLogOutClick()}>
              Logout
            </a>
          </li>
          </>
        ) : (
          <>
            <li className="menu-item2">
              <Link to="/login" className="link">
                Login
              </Link>
            </li>
            <li className="menu-item2">
              <Link to="/signup" className="link">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
